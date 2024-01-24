# This agent fethches all the data from the 'search_parameters' table and then starts the crawling process.
import sys;
import time
import os


# Import necessary modules
from willhaben_url_builder import get_dynamic_url;
from willhaben_query import querry_willhaben;

# Import the dbConnect module
current_directory = os.path.dirname(os.path.abspath(__file__))
db_directory = os.path.join(current_directory, "..\\DB")

# Add the relative path to sys.path
sys.path.append(db_directory)

from dbConnect import create_connection, close_connection


# Function to fetch all user ids from active searches from the database
def fetch_search_ids():
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Fetch all id from search requests with search queries
        cursor.execute("""
            SELECT DISTINCT id, user_id FROM search_parameters
            WHERE is_active = TRUE
            ORDER BY id ASC;
        """)

        search_params = cursor.fetchall()  

        cursor.close()
        close_connection(conn)
        print(search_params)
        return search_params

    else:
        return None
    

def start_crawling():
    # Fetch all ids from active searches
    rows = fetch_search_ids()

    # Iterate over all user ids
    for row in rows:
        id, user_id = row
        print("Id of search:", id)
        willhaben_url = get_dynamic_url(id)
        print(willhaben_url)
        
        # Perform the crawling
        results = querry_willhaben(willhaben_url, user_id)
        
        # Set is_active to FALSE after crawling, if results were found
        if results > 0:
            set_search_parameters_inactive(id)

        # Add a delay between crawls if needed
        time.sleep(2)  # Adjust the delay as needed

# Function to set is_active to FALSE for a specific user_id
def set_search_parameters_inactive(id):
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Update is_active to FALSE for the specified user_id
        cursor.execute("""
            UPDATE search_parameters
            SET is_active = FALSE
            WHERE id = %s;
        """, (id,))

        # Commit the changes
        conn.commit()

        cursor.close()
        close_connection(conn)

        print(f"Set is_active to FALSE for id {id}")
    else:
        print("Error: Unable to connect to the database.")


start_crawling()