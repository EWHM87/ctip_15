import mysql.connector
from transformers import pipeline
from textblob import TextBlob
import requests

# Connect to DB
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sarawakparks"
)
cursor = db.cursor()

# Get guides with feedback
cursor.execute("""
    SELECT DISTINCT guide_id 
    FROM guide_feedback 
    WHERE feedback_text IS NOT NULL AND feedback_text != ''
""")
guide_ids = [row[0] for row in cursor.fetchall()]
if not guide_ids:
    print("No feedback found for any guide.")
    exit()

print("Loading summarization model...")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

for guide_id in guide_ids:
    cursor.execute("""
        SELECT feedback_text 
        FROM guide_feedback 
        WHERE guide_id = %s AND feedback_text IS NOT NULL AND feedback_text != ''
    """, (guide_id,))
    feedbacks = [row[0].strip().replace("\n", " ") for row in cursor.fetchall() if row[0].strip()]

    if not feedbacks:
        continue

    combined_text = " ".join(feedbacks)[:2000]
    print(f"Generating summary for Guide ID: {guide_id}...")

    try:
        summary = summarizer(combined_text, max_length=120, min_length=30, do_sample=False)
        summary_text = summary[0]['summary_text']
    except Exception as e:
        print(f"Summarization failed for {guide_id}: {str(e)}")
        continue

    sentiment_score = TextBlob(combined_text).sentiment.polarity
    if sentiment_score > 0.2:
        sentiment = "Positive"
    elif sentiment_score < -0.2:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    print("Summary:", summary_text)
    print("Sentiment:", sentiment)

    try:
        response = requests.post("http://localhost:5000/api/save-feedback-summary", json={
            "guide_id": guide_id,
            "summary_text": summary_text,
            "sentiment": sentiment
        })
        if response.status_code == 201:
            print(f"Summary saved to backend for Guide {guide_id}")
        else:
            print(f"Failed to save summary (status {response.status_code}) - {response.text}")
    except Exception as e:
        print(f"Error posting to backend for Guide {guide_id}: {str(e)}")

cursor.close()
db.close()
