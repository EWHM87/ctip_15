import mysql.connector
from transformers import pipeline
from textblob import TextBlob
import requests

# === Connect to MySQL ===
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sarawakparks"
)

cursor = db.cursor()
cursor.execute("SELECT feedback_text FROM guide_feedback WHERE feedback_text IS NOT NULL AND feedback_text != ''")
rows = cursor.fetchall()

# === Combine Feedback into One Text ===
feedbacks = [row[0].strip().replace("\n", " ") for row in rows if row[0].strip()]
all_feedback = " ".join(feedbacks)

if not all_feedback:
    print("⚠️ No feedback found.")
    exit()

# Optional: limit to avoid token cutoff
if len(all_feedback) > 2000:
    all_feedback = all_feedback[:2000]

# === Summarization (using BART) ===
print("\n🔄 Generating summary...")
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
summary = summarizer(all_feedback, max_length=120, min_length=30, do_sample=False)

# === Sentiment Analysis ===
sentiment_score = TextBlob(all_feedback).sentiment.polarity
if sentiment_score > 0.2:
    sentiment = "😊 Positive"
elif sentiment_score < -0.2:
    sentiment = "😠 Negative"
else:
    sentiment = "😐 Neutral"

# === Output to terminal ===
print("\n📝 AI Summary:\n", summary[0]['summary_text'])
print("📊 Overall Sentiment:", sentiment)

# === Save to backend ===
try:
    response = requests.post("http://localhost:5000/api/save-feedback-summary", json={
        "summary_text": summary[0]['summary_text'],
        "sentiment": sentiment
    })

    if response.status_code == 201:
        print("✅ Summary saved to backend.")
    else:
        print(f"⚠️ Failed to save summary (status {response.status_code}) - {response.text}")

except Exception as e:
    print("❌ Error posting to backend:", str(e))