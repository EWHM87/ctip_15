import cv2
import time
import os
import mysql.connector
import requests

# 📂 Create directory for snapshots
if not os.path.exists("snapshots"):
    os.makedirs("snapshots")

# 🎥 Open webcam
cam = cv2.VideoCapture(0)
time.sleep(2)
ret, frame1 = cam.read()
ret, frame2 = cam.read()

# 🗢️ Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sarawakparks"
)
cursor = db.cursor()

# 🧱 Ensure the camera_alerts table exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS camera_alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_path VARCHAR(255),
        detection_time DATETIME DEFAULT CURRENT_TIMESTAMP
    )
""")
db.commit()

print("📱 Camera trap system running...")

while cam.isOpened():
    diff = cv2.absdiff(frame1, frame2)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    for c in contours:
        if cv2.contourArea(c) < 1000:
            continue

        timestamp = time.strftime("%Y%m%d-%H%M%S")
        filename = f"snapshots/motion_{timestamp}.jpg"
        cv2.imwrite(filename, frame1)
        print(f"📸 Motion Detected! Snapshot saved: {filename}")

        # 🗢️ Insert into DB
        insert_query = "INSERT INTO camera_alerts (image_path) VALUES (%s)"
        cursor.execute(insert_query, (filename.replace("\\", "/"),))
        db.commit()
        print("✅ Alert logged in database")

        # 📤 Send alert to backend server via HTTP POST
        try:
            response = requests.post('http://localhost:5000/api/send-alert', json={
                "image_path": os.path.basename(filename)
            })
            if response.status_code == 200:
                print("📱 Real-time alert sent to frontend.")
            else:
                print(f"⚠️ Alert send failed with status code {response.status_code}")
        except Exception as e:
            print("❌ Failed to send alert to backend:", e)

        time.sleep(2)

    frame1 = frame2
    ret, frame2 = cam.read()
    if not ret:
        break

cam.release()
cv2.destroyAllWindows()
