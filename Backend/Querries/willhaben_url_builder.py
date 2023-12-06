import sys
import pandas as pd  # Assuming you have pandas installed

# Import the dbConnect module
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\DB")
from dbConnect import create_connection, close_connection

# Function to fetch search parameters from the database
def fetch_search_parameters(user_id):
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Assuming you want to fetch the latest active search parameters for a specific user
        cursor.execute("""
            SELECT * FROM search_parameters
            WHERE user_id = %s AND is_active = TRUE
            ORDER BY id DESC
            LIMIT 1;
        """, (user_id,))

        search_params = cursor.fetchone()

        cursor.close()
        close_connection(conn)

        return search_params

    else:
        return None

# Function to build the URL using dynamic search parameters
def build_url_from_database(base_url, user_id):
    # Fetch search parameters from the database
    search_params = fetch_search_parameters(user_id)

    if search_params:
        # Convert the fetched search parameters into a dictionary
        search_params_dict = {
            "CAR_MODEL/MAKE": search_params[2],
            "CAR_MODEL/MODEL": search_params[3],
            "MILEAGE_TO": str(search_params[4]),
            "YEAR_MODEL_FROM": str(search_params[5]),
            "PRICE_TO": str(search_params[8])
        }

        # Translate brand and model text to codes using an Excel file (Brands.xlsx)
        brand_model_translation = pd.read_excel("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\Brands.xlsx")
        brand_code = brand_model_translation.loc[brand_model_translation['Brand'] == search_params_dict['CAR_MODEL/MAKE'], 'Code'].iloc[0]
        model_code = brand_model_translation.loc[brand_model_translation['Model'] == search_params_dict['CAR_MODEL/MODEL'], 'Code'].iloc[0]

        search_params_dict['CAR_MODEL/MAKE'] = brand_code
        search_params_dict['CAR_MODEL/MODEL'] = model_code

        # Build and return the complete URL
        return build_url(base_url, search_params_dict)

    else:
        print("No active search parameters found for the user.")
        return None
    
# Function to build the URL using dynamic search parameters
def build_url(base_url, search_params):
    #create a list of strings with the search parameters
    search_params_list = [f"{k}={v}" for k, v in search_params.items()]

    #join the list of strings with the base url
    search_params_string = "&".join(search_params_list)

    #return the complete url
    return f"{base_url}&rows=30&page=1&{search_params_string}"

# Example usage
user_id = 1  # Replace with the actual user ID
#base url, where the search is performed
base_url = "https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse?sfId=cab39f81-0a0c-4e5d-84b8-b19aad22a2ed&isNavigation=true"

# Build the dynamic URL
dynamic_url = build_url_from_database(base_url, user_id)

if dynamic_url:
    print("Dynamic URL:", dynamic_url)
    # Now you can use this dynamic URL for your scraping logic
    # For example: car_instance = get_willhaben_query(dynamic_url)
    # upload_data(car_instance)
