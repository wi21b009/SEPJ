#In this file, a connection to the database is established and the cursor is created.

# First usage: install the psycopg2 library with 'pip install psycopg2-binary'

# Import the psycopg2 module
import psycopg2

def create_connection():
    try:
        # Connect to the database
        conn = psycopg2.connect(
            dbname="cardatabase",
            user="caruser",
            password="carpassword",
            host="localhost",
            port="30004"
        )
        print("Connected to the database!")
        return conn

    except Exception as e:
        print(f"Error: {e}")
        return None

# Optional: You can also define a function to close the connection
def close_connection(conn):
    if conn is not None:
        conn.close()
        print("Connection closed.")