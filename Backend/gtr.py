import mysql.connector
import json
import os
# import requests  # Uncomment if you want to send to backend

# === 1. Connect to MySQL ===
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="sarawakparks"
    )
    cursor = db.cursor(dictionary=True)
except mysql.connector.Error as err:
    print(f"❌ Database connection failed: {err}")
    exit(1)

# === 2. Define AI Training Modules ===
training_modules = {
    "Communication & Empathy": {
        "youtube": "https://www.youtube.com/watch?v=1Evwgu369Jw",
        "steps": [
            "Practice active listening",
            "Use positive, open body language",
            "Show empathy through facial expressions and tone"
        ],
        "keywords": ["rude", "ignored", "unclear", "cold", "didn't listen", "robotic", "not friendly"]
    },
    "Time Management for Tours": {
        "youtube": "https://www.youtube.com/watch?v=IAvf-rkzNck",
        "steps": [
            "Plan estimated time per stop",
            "Leave buffer time for questions",
            "Avoid overloading with too much info"
        ],
        "keywords": ["rushed", "late", "not enough time", "too fast", "disorganized"]
    },
    "Enhancing Biodiversity Knowledge": {
        "youtube": "https://www.youtube.com/watch?v=6Oe_jYohTzA",
        "steps": [
            "Learn key flora/fauna in the park",
            "Prepare fun facts or analogies",
            "Stay up to date with park changes"
        ],
        "keywords": ["not informative", "didn’t know plants", "unsure", "basic explanation"]
    },
    "Managing Visitor Groups Effectively": {
        "youtube": "https://www.youtube.com/watch?v=xZblmJIAf4I",
        "steps": [
            "Assign roles for big groups",
            "Establish group norms early",
            "Use signals/gestures for transitions"
        ],
        "keywords": ["unorganized", "messy", "crowd", "noisy", "didn’t control group"]
    },
    "Engaging Storytelling & Speaking": {
        "youtube": "https://www.youtube.com/watch?v=V1gUnlT5K64",
        "steps": [
            "Use storytelling to connect facts",
            "Practice vocal variety and pace",
            "Include interactive moments"
        ],
        "keywords": ["boring", "monotone", "unengaging", "not confident"]
    },
    "Visitor Safety Awareness": {
        "youtube": "https://www.youtube.com/watch?v=Irf8hHkVjFw",
        "steps": [
            "Always state safety instructions first",
            "Know emergency procedures",
            "Ensure guests follow guidelines"
        ],
        "keywords": ["unsafe", "no safety instructions", "unclear emergency plan"]
    }
}

# === 3. Fetch summaries + original feedbacks ===
try:
    cursor.execute("""
        SELECT fs.guide_id, fs.summary_text, GROUP_CONCAT(gf.feedback_text SEPARATOR ' ') AS all_feedback
        FROM feedback_summary fs
        JOIN guide_feedback gf ON fs.guide_id = gf.guide_id
        GROUP BY fs.guide_id
    """)
    summaries = cursor.fetchall()
except mysql.connector.Error as err:
    print(f"❌ Error fetching summaries: {err}")
    cursor.close()
    db.close()
    exit(1)

# === 4. Match keywords to training modules ===
recommendations = []
for row in summaries:
    guide_id = row["guide_id"]
    combined_text = (row["summary_text"] or "") + " " + (row["all_feedback"] or "")
    combined_text = combined_text.lower()

    for topic, meta in training_modules.items():
        if any(keyword in combined_text for keyword in meta["keywords"]):
            recommendation = {
                "guide_id": guide_id,
                "topic": topic,
                "youtube": meta["youtube"],
                "steps": meta["steps"]
            }
            recommendations.append(recommendation)

            # Optional: Save to backend API
            # try:
            #     res = requests.post("http://localhost:5000/api/save-training-recommendation", json=recommendation)
            #     if res.status_code == 201:
            #         print(f"✅ Sent recommendation to backend for Guide {guide_id}")
            #     else:
            #         print(f"❌ Failed backend save for Guide {guide_id}: {res.text}")
            # except Exception as e:
            #     print(f"❌ Error sending to backend for Guide {guide_id}: {str(e)}")

            break  # Only one recommendation per guide

# === 5. Save to JSON file ===
output_path = os.path.join(os.path.dirname(__file__), "ai_training_output.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(recommendations, f, indent=2)

print(f"✅ AI training recommendations saved to {output_path} ({len(recommendations)} guides)")

# === 6. Close DB connection ===
cursor.close()
db.close()
