# This agent fethches all the data from the 'search_parameters' table and then starts the crawling process.
import sys;
import time


# Import necessary modules
from willhaben_url_builder import get_dynamic_url;
from willhaben_query import querry_willhaben;

# Import the dbConnect module
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\DB")
from dbConnect import create_connection, close_connection


# Function to fetch all user ids from active searches from the database
def fetch_search_ids():
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Fetch all id from search requests with search queries
        cursor.execute("""
            SELECT DISTINCT id FROM search_parameters
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
    ids = fetch_search_ids()

    # Iterate over all user ids
    for id in ids:
        print("Id of search:", id[0])
        willhaben_url = get_dynamic_url(id[0])
        print(willhaben_url)
        
        # Perform the crawling
        results = querry_willhaben(willhaben_url)
        
        # Set is_active to FALSE after crawling, if results were found
        if results > 0:
            set_search_parameters_inactive(id[0])

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