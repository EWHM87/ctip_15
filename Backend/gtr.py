import os
import json
import mysql.connector

def connect_to_db():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="sarawakparks"
        )
    except mysql.connector.Error as err:
        print(f"[DB ERROR] {err}")
        exit(1)

def get_training_modules():
    return {
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

def fetch_feedback(cursor):
    try:
        cursor.execute("""
            SELECT fs.guide_id, fs.summary_text, GROUP_CONCAT(gf.feedback_text SEPARATOR ' ') AS all_feedback
            FROM feedback_summary fs
            JOIN guide_feedback gf ON fs.guide_id = gf.guide_id
            GROUP BY fs.guide_id
        """)
        return cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"[QUERY ERROR] {err}")
        return []

def generate_recommendations(feedbacks, modules):
    results = []
    for row in feedbacks:
        guide_id = row["guide_id"]
        combined_text = ((row["summary_text"] or "") + " " + (row["all_feedback"] or "")).lower()

        for topic, details in modules.items():
            if any(keyword in combined_text for keyword in details["keywords"]):
                results.append({
                    "guide_id": guide_id,
                    "topic": topic,
                    "youtube": details["youtube"],
                    "steps": details["steps"]
                })
                break  # only 1 match per guide
    return results

def save_to_json(data, filename="ai_training_output.json"):
    output_path = os.path.join(os.path.dirname(__file__), filename)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"[DONE] AI training recommendations saved to {output_path} ({len(data)} guides)")

def main():
    db = connect_to_db()
    cursor = db.cursor(dictionary=True)

    modules = get_training_modules()
    feedbacks = fetch_feedback(cursor)
    recommendations = generate_recommendations(feedbacks, modules)
    save_to_json(recommendations)

    cursor.close()
    db.close()

if __name__ == "__main__":
    main()
