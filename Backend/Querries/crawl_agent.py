# This agent fethches all the data from the 'search_parameters' table and then starts the crawling process.
import sys;

# Import necessary modules
from willhaben_url_builder import get_dynamic_url;
from willhaben_query import querry_willhaben;

# Import the dbConnect module
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\DB")
from dbConnect import create_connection, close_connection


# Function to fetch all user ids from active searches from the database
def fetch_search_users():
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Fetch all user_id from users with search queries
        cursor.execute("""
            SELECT DISTINCT user_id FROM search_parameters
            WHERE is_active = TRUE;
        """)

        search_params = cursor.fetchall()  

        cursor.close()
        close_connection(conn)
        print(search_params)
        return search_params

    else:
        return None
    

# Start the url building process for each user_id
def start_crawling():
    # Fetch all user ids from active searches
    user_ids = fetch_search_users()

    # Iterate over all user ids
    for user_id in user_ids:
        print("User id:", user_id[0])
        willhaben_url = get_dynamic_url(user_id[0])
        print(willhaben_url)
        querry_willhaben(willhaben_url)


start_crawling()