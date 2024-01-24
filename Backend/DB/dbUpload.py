import sys;
import os;
from dbConnect import create_connection, close_connection

# Calculate the relative path to mailservice.py
current_dir = os.path.dirname(os.path.abspath(__file__))
sepj_dir = os.path.dirname(os.path.dirname(current_dir))  # Go up two levels to SEPJ
mailservice_path = os.path.join(sepj_dir, 'MailService')

# Add mailservice_path to the system path
sys.path.append(mailservice_path)
from mailservice import send_mail


# Import the Car class from the cars.py file
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend")
from cars import Car;

# Function to upload data to the database
def upload_data(car):
    # Establish a connection
    conn = create_connection()

    if conn:
        try:
            # Create a cursor object to execute SQL queries
            cursor = conn.cursor()

            # Example: Insert data into the cars table
            cursor.execute("""
                INSERT INTO cars 
                (brand, model, mileage, year_of_manufacture, country, region, price, engine, features, offer_link) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                car.brand,
                car.model,
                car.mileage,
                car.year_of_manufacture,
                car.country,
                car.region,
                car.price,
                car.engine,
                car.features,
                car.offer_link
            ))

            # Commit the transaction
            conn.commit()
            print("Data uploaded successfully!")
            # After successful upload, call send_mail
            send_mail()

        except Exception as e:
            print(f"Error uploading data: {e}")
            # Rollback in case of an error
            conn.rollback()

        finally:
            # Close the cursor and connection
            cursor.close()
            close_connection(conn)
