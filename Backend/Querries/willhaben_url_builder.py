import sys
import pandas as pd
import os

# Import the dbConnect module
current_directory = os.path.dirname(os.path.abspath(__file__))
db_directory = os.path.join(current_directory, "..\\DB")

# Add the relative path to sys.path
sys.path.append(db_directory)

#sys.path.append("c:\\XAMPP\\htdocs\\SEPJ\\Backend\\DB")
from dbConnect import create_connection, close_connection

# ------------ FUNCTIONS ------------

# Function to fetch search parameters from the database
def fetch_search_parameters(id):
    conn = create_connection()

    if conn:
        cursor = conn.cursor()

        # Fetch the latest active search parameters for a specific user
        cursor.execute("""
            SELECT * FROM search_parameters
            WHERE id = %s AND is_active = TRUE
            ORDER BY id DESC
            LIMIT 1;
        """, (id,))

        search_params = cursor.fetchone()

        cursor.close()
        close_connection(conn)

        return search_params

    else:
        return None


# Function to translate brand and model text to codes using an Excel file (Brands.xlsx)
def translate_brand_model(search_params_dict, brand_translation, model_translation):
    brand_name = search_params_dict['CAR_MODEL/MAKE']
    model_name = search_params_dict['CAR_MODEL/MODEL']

    print(f"Translating brand: {brand_name}, model: {model_name}")

    # Check if the brand_name and model_name are present in the DataFrame
    brand_matches = brand_translation[brand_translation['Marke'] == brand_name]
    
    # Adjust the column name here to match the actual case in your Excel file
    model_matches = model_translation[model_translation['Model'] == model_name]

    print("Brand matches:", brand_matches)
    print("Model matches:", model_matches)

    if not brand_matches.empty and not model_matches.empty:
        brand_code = brand_matches['ID'].iloc[0]
        
        # Adjust the column name here to match the actual case in your Excel file
        model_code = model_matches['ID'].iloc[0]

        search_params_dict['CAR_MODEL/MAKE'] = brand_code
        search_params_dict['CAR_MODEL/MODEL'] = model_code

        print(f"Translation successful. Brand code: {brand_code}, Model code: {model_code}")

    else:
        print("Translation failed. No matches found.")


# Function to build the URL using dynamic search parameters
def build_url_from_database(base_url, id):
    # Fetch search parameters from the database
    search_params = fetch_search_parameters(id)

    if search_params:
        # Convert the fetched search parameters into a dictionary
        search_params_dict = {
            "CAR_MODEL/MAKE": search_params[2],
            "CAR_MODEL/MODEL": search_params[3],
            "MILEAGE_TO": str(search_params[4]),
            "YEAR_MODEL_FROM": str(search_params[5]),
            "areaId": str(search_params[7]),
            "PRICE_TO": str(search_params[8]),
            "ENGINE/FUEL": str(search_params[9])
        }

        # Translate Benzin to 100001, Diesel to 100003, Elektro to 100004, Gas to 100011, ...
        if search_params_dict['ENGINE/FUEL'] == 'Benzin':
            search_params_dict['ENGINE/FUEL'] = '100001'
        elif search_params_dict['ENGINE/FUEL'] == 'Diesel':
            search_params_dict['ENGINE/FUEL'] = '100003'
        elif search_params_dict['ENGINE/FUEL'] == 'Elektro':
            search_params_dict['ENGINE/FUEL'] = '100004'
        elif search_params_dict['ENGINE/FUEL'] == 'Gas':
            search_params_dict['ENGINE/FUEL'] = '100011'
        elif search_params_dict['ENGINE/FUEL'] == 'Hybrid Elektro/Benzin':
            search_params_dict['ENGINE/FUEL'] = '100013'
        elif search_params_dict['ENGINE/FUEL'] == 'Hybrid Elektro/Diesel':
            search_params_dict['ENGINE/FUEL'] = '100022'
        elif search_params_dict['ENGINE/FUEL'] == 'Wasserstoff':
            search_params_dict['ENGINE/FUEL'] = '110000'

        # Translate Wien to 900, Niederösterreich to 1000, Oberösterreich to 2000, ...
        if search_params_dict['areaId'] == 'Wien':
            search_params_dict['areaId'] = '900'
        elif search_params_dict['areaId'] == 'Niederösterreich':
            search_params_dict['areaId'] = '3'
        elif search_params_dict['areaId'] == 'Oberösterreich':
            search_params_dict['areaId'] = '4'
        elif search_params_dict['areaId'] == 'Steiermark':
            search_params_dict['areaId'] = '6'
        elif search_params_dict['areaId'] == 'Kärnten':
            search_params_dict['areaId'] = '2'
        elif search_params_dict['areaId'] == 'Salzburg':
            search_params_dict['areaId'] = '5'
        elif search_params_dict['areaId'] == 'Tirol':
            search_params_dict['areaId'] = '7'
        elif search_params_dict['areaId'] == 'Vorarlberg':
            search_params_dict['areaId'] = '8'
        elif search_params_dict['areaId'] == 'Burgenland':
            search_params_dict['areaId'] = '1'
        elif search_params_dict['areaId'] == 'andere Länder':
            search_params_dict['areaId'] = '22000'

        # Translate brand and model text to codes using an Excel file (Brands.xlsx)
        brand_translation = pd.read_excel("C:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\Querries\\Brands.xlsx", sheet_name="Brands")
        model_translation = pd.read_excel("C:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\Querries\\Brands.xlsx", sheet_name="Model")
        translate_brand_model(search_params_dict, brand_translation, model_translation)

        # Build and return the complete URL
        return build_url(base_url, search_params_dict)

    else:
        print("No active search parameters found for the user.")
        return None


# Function to build the URL using dynamic search parameters
def build_url(base_url, search_params):
    # Create a list of strings with the search parameters
    search_params_list = [f"{k}={v}" for k, v in search_params.items()]

    # Join the list of strings with the base url
    search_params_string = "&".join(search_params_list)

    # Return the complete URL
    return f"{base_url}&rows=30&page=1&{search_params_string}"


# Function to get the dynamic URL for a given user ID
def get_dynamic_url(id):
    # Example usage
    # Base URL, where the search is performed
    base_url = "https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse?sfId=cab39f81-0a0c-4e5d-84b8-b19aad22a2ed&isNavigation=true"

    # Build the dynamic URL
    return build_url_from_database(base_url, id)