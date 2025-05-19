import serial
import mysql.connector
import time

# ---------- Connect to Arduino via Serial Port ----------
arduino = serial.Serial('COM4', 9600, timeout=1)  # Change COM port if needed
time.sleep(2)

# ---------- Connect to MySQL (XAMPP/phpMyAdmin) ----------
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # Use your DB password if set
    database="sarawakparks"
)
cursor = db.cursor()

# ---------- Start Reading Loop ----------
while True:
    try:
        line = arduino.readline().decode('utf-8').strip()
        if not line or "Temp:" not in line:
            continue

        print(f"Received: {line}")

        # Split and parse the labeled values
        parts = line.split(",")
        temperature = float(parts[0].split(":")[1].replace("C", "").strip())
        humidity = float(parts[1].split(":")[1].replace("%", "").strip())
        soil_condition = parts[2].split(":")[1].strip()
        solar_status = parts[3].split(":")[1].strip()
        motion_status = parts[4].split(":")[1].strip()

        # Convert motion to binary (1 for Detected, 0 otherwise)
        motion_detected = 1 if motion_status.lower() == "detected" else 0

        # SQL insert (adapt as needed if you later want soil/solar info stored too)
        # SQL insert with updated SpeciesType label
        insert_query = """
            INSERT INTO sensor_data (SensorID, SpeciesType, Temperature, Humidity, MotionDetected, ReadingTime)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """
        values = ("S01", "Flora and Fauna", temperature, humidity, motion_detected)

        cursor.execute(insert_query, values)
        db.commit()
        print("✅ Data inserted into sarawakparks.sensor_data")

        if motion_detected == 1:
            print("🚨 ALERT: Motion detected! Possible unauthorized activity!")

    except Exception as e:
        print("❌ Error during insert:", e)
