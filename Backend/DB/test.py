import psycopg2

# Connect to the database
conn = psycopg2.connect(
    dbname="cardatabase",
    user="caruser",
    password="carpassword",
    host="localhost",
    port="30004"
)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

try:
    # Example: Execute a simple query
    cursor.execute("SELECT * FROM cars")
    rows = cursor.fetchall()

    # Print the fetched data
    for row in rows:
        print(row)

except Exception as e:
    print(f"Error fetching data: {e}")

finally:
    # Close the cursor and connection
    cursor.close()
    conn.close()

