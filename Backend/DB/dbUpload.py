from dbConnect import create_connection, close_connection

# Function to upload data to the database
def upload_data():
    # Establish a connection
    conn = create_connection()

    if conn:
        try:
            # Create a cursor object to execute SQL queries
            cursor = conn.cursor()

            # Example: Insert data into the cars table
            cursor.execute("INSERT INTO cars (brand, model, mileage, year_of_manufacture) VALUES (%s, %s, %s, %s)",
                           ("Toyota", "Corolla", 30000, 2021))

            # Commit the transaction
            conn.commit()
            print("Data uploaded successfully!")

        except Exception as e:
            print(f"Error uploading data: {e}")
            # Rollback in case of an error
            conn.rollback()

        finally:
            # Close the cursor and connection
            cursor.close()
            close_connection(conn)

# Call the upload_data function
upload_data()
