import mysql.connector
from transformers import pipeline
from textblob import TextBlob
import requests
import sys

# UTF-8 support for Windows console
try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

# Keyword mapping based on low scores
rating_keywords = {
    "wildlife_rating": ["not informative", "didn’t know plants", "unsure", "basic explanation"],
    "communication_rating": ["rude", "ignored", "unclear", "cold", "didn't listen", "robotic", "not friendly"],
    "friendliness_rating": ["rude", "not friendly", "unapproachable", "cold"],
    "storytelling_rating": ["boring", "monotone", "unengaging", "not confident"],
    "safety_rating": ["unsafe", "no safety instructions", "unclear emergency plan"],
    "respect_rating": ["disrespectful to animals", "disturbing wildlife", "not careful"]
}

# Connect to DB
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sarawakparks"
)
cursor = db.cursor(dictionary=True)

# Get guides with feedback
cursor.execute("""
    SELECT DISTINCT guide_id 
    FROM guide_feedback 
    WHERE feedback_text IS NOT NULL AND feedback_text != ''
""")
guide_ids = [row["guide_id"] for row in cursor.fetchall()]
if not guide_ids:
    print("No feedback found.")
    exit()

print("Loading summarization model...")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

for guide_id in guide_ids:
    cursor.execute("""
        SELECT feedback_text, wildlife_rating, communication_rating, friendliness_rating,
               storytelling_rating, safety_rating, respect_rating
        FROM guide_feedback 
        WHERE guide_id = %s AND feedback_text IS NOT NULL AND feedback_text != ''
    """, (guide_id,))
    rows = cursor.fetchall()

    if not rows:
        continue

    feedback_texts = []
    keyword_tags = []

    for row in rows:
        feedback_texts.append(row["feedback_text"].strip().replace("\n", " "))

        # Append keywords based on low ratings
        for field, keywords in rating_keywords.items():
            if row.get(field) is not None and int(row[field]) <= 2:
                keyword_tags.extend(keywords)

    combined_text = " ".join(feedback_texts)
    tagged_text = combined_text + " " + " ".join(set(keyword_tags))  # Unique keywords

    input_text = tagged_text[:2000]
    print(f"Generating summary for Guide ID: {guide_id}...")

    try:
        summary = summarizer(input_text, max_length=120, min_length=30, do_sample=False)
        summary_text = summary[0]['summary_text']
    except Exception as e:
        print(f"Summarization failed for {guide_id}: {str(e)}")
        continue

    sentiment_score = TextBlob(combined_text).sentiment.polarity
    sentiment = "Positive" if sentiment_score > 0.2 else "Negative" if sentiment_score < -0.2 else "Neutral"

    print("Summary:", summary_text)
    print("Sentiment:", sentiment)

    try:
        response = requests.post("http://localhost:5000/api/save-feedback-summary", json={
            "guide_id": guide_id,
            "summary_text": summary_text,
            "sentiment": sentiment
        })
        if response.status_code == 201:
            print(f"Summary saved for Guide {guide_id}")
        else:
            print(f"Failed to save summary: {response.text}")
    except Exception as e:
        print(f"Error posting to backend: {str(e)}")

cursor.close()
db.close()
