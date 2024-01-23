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
    #cursor.execute("Delete FROM cars where id > 25")
    #cursor.execute("SELECT * FROM cars")
    cursor.execute("SELECT * FROM search_parameters ORDER BY id ASC")
    #cursor.execute("SELECT * FROM users")
    
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

