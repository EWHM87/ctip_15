import serial
import mysql.connector
import time

arduino = serial.Serial('COM4', 9600, timeout=1)  # Adjust COM port if needed
time.sleep(2)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sarawakparks"
)
cursor = db.cursor()

while True:
    try:
        line = arduino.readline().decode('utf-8').strip()
        if not line or "Temp:" not in line:
            continue

        print(f"Received: {line}")

        parts = line.split(",")
        temperature = float(parts[0].split(":")[1].replace("C", "").strip())
        humidity = float(parts[1].split(":")[1].replace("%", "").strip())
        soil_condition = parts[2].split(":")[1].strip()
        solar_status = parts[3].split(":")[1].strip()
        motion_status = parts[4].split(":")[1].strip()
        motion_detected = 1 if motion_status.lower() == "detected" else 0

        insert_query = """
            INSERT INTO sensor_data (
                SensorID, SpeciesType, Temperature, Humidity,
                MotionDetected, SoilMoisture, SolarStatus, ReadingTime
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        """
        values = (
            "S01", "Flora and Fauna", temperature, humidity,
            motion_detected, soil_condition, solar_status
        )

        cursor.execute(insert_query, values)
        db.commit()
        print("✅ Data inserted successfully")

        if motion_detected == 1:
            print("🚨 ALERT: Motion detected!")

    except Exception as e:
        print("❌ Error:", e)
