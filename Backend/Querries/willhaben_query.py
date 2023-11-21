# Import necessary libraries
from bs4 import BeautifulSoup;
import sys;
import urllib.request
import re

# Import the Car class from the cars.py file
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend")
from cars import Car;

# Import the upload_data function from the dbConnect.py file
sys.path.append("c:\\Users\\Tobias\\OneDrive - FH Technikum Wien\\Dokumente\\FH\\5. Semester\\SEPJ\\SEPJ\\Backend\\DB")
from dbUpload import upload_data;



# Print a message to indicate the start of the script
print("Willhaben Query")

# Define a function to scrape data from a Willhaben query URL
def get_willhaben_query(url):
    print("Willhaben_query URL:", url)
    try:
        # Open the URL and read the HTML content
        fp = urllib.request.urlopen(url)
        mybytes = fp.read()
        mystr = mybytes.decode("utf8")
        fp.close()

        # Create a BeautifulSoup object to parse the HTML
        soup = BeautifulSoup(mystr, 'html.parser')

        # ------------ EXTRACTION ------------
        #               CAR NAME
        # Find the <h1> element with name of the car
        target_h1 = soup.find('h1')

        # Extract all the text from the found <h1> element
        if target_h1:
            all_text = target_h1.get_text(separator= '\n')

            # Find the position of the space after "BMW"
            space_index = all_text.find(' ')

            # Extract "BMW" and the rest of the string
            brand = all_text[:space_index]
            model = all_text[space_index+1:]

            # Print the extracted strings
            print("Brand:", brand)
            print("Model:", model)  
        else:
            print("H1 element not found with the specified class.")


        #               CAR PRICE
        # Find the <span> element with the specific class
        #target_span = soup.find('span', class_='Text-sc-10o2fdq-0 fvWhFV')
        target_span = soup.find('span', {'data-testid': 'contact-box-price-box-price-value-0'})


        # Extract all the text from the found <span> element
        if target_span:
            all_text = target_span.get_text(separator= '\n')

            # Remove the currency symbol and any non-numeric characters
            numeric_string = ''.join(char for char in all_text if char.isdigit())

            # Convert the numeric string to a float
            price = int(numeric_string)

            # Print the extracted price
            print("Price:", price)
        else:
            print("Span element not found with the specified class.")


        #               CAR LOCATION
        # Find the <div> element with the specific class
        target_div = soup.find('div', {'data-testid': 'top-contact-box-address-box'})

        # Extract all the text from the found <div> element
        if target_div:
            all_text = target_div.get_text(separator='\n')

            # Split the text into lines
            lines = all_text.split('\n')

            # Extract the second line as the region (assuming it exists)
            region = lines[1].strip() if len(lines) > 1 else None

            # Extract the last line as the country (assuming it exists)
            country = lines[-1].strip() if lines else None
            
            # Print the extracted strings
            print("Region:", region)
            print("Country:", country)
        else:
            print("Div element not found with the specified class.")


        #               CAR DATA
        # Find the <ul> element with the specific class
        target_div = soup.find('ul', class_='PropertyList-sc-e2zq14-0 dptFLl')

        # Extract all the text from the found <div> element
        if target_div:
            all_text = target_div.get_text(separator= '\n')

            # Split the text into lines
            lines = all_text.strip().split('\n')

            # Initialize variables
            year_of_manufacture = None
            mileage = None
            engine = None

            # Iterate through the lines and extract the relevant information
            for i in range(0, len(lines), 2):
                label = lines[i]
                value = lines[i + 1]

                if label == 'Erstzulassung':
                    # Extract numeric part and convert to integer
                    value = value.split('/')[-1]
                    year_of_manufacture = int(''.join(char for char in value if char.isdigit()))
                elif label == 'Kilometerstand':
                    # Extract numeric part and convert to integer
                    mileage = int(''.join(char for char in value if char.isdigit()))
                elif label == 'Treibstoff':
                    engine = value

            # Print the extracted values
            print("Year of Manufacture:", year_of_manufacture)
            print("Mileage:", mileage)
            print("Engine:", engine)
        else:
            print("Div element not found with the specified class.")

        #           CAR DESCRIPTION
        # Find all <li> elements with the specified data-testid attribute
        equipment_items = soup.find_all('li', {'data-testid': 'equipment-item'})

        # Initialize the features variable
        features = ""

        # Iterate through each <li> element and concatenate the text
        for item in equipment_items:
            features += item.get_text(separator='\n') + ', '

        print("Features:", features.strip())


        # ------------ CREATING CAR INSTANCE ------------
        car_instance = Car(
            brand=brand,
            model=model,
            mileage=mileage,
            year_of_manufacture=year_of_manufacture,
            country=country,
            region=region,
            price=price,
            engine=engine,
            features=features
        )

        return car_instance


    except Exception as e:
        # Handle exceptions and print an error message
        print("Error:", str(e))



        

# Create an empty list to store car URLs
carsUrl = []

# Open the main Willhaben query URL
fp = urllib.request.urlopen("https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse?sfId=aaa81249-4bc8-4ac5-97f3-a5bd21b1229c&isNavigation=true&CAR_MODEL/MAKE=1005&CAR_MODEL/MODEL=1042&MILEAGE_TO=10000&YEAR_MODEL_FROM=2023&PRICE_TO=45000")
mybytes = fp.read()
mystr = mybytes.decode("utf8")
fp.close()

# Create a BeautifulSoup object to parse the main page
soup = BeautifulSoup(mystr, 'html.parser')

# Find all <a> elements with an 'id' attribute that starts with 'search-result-entry'
entry_links = soup.find_all('a', id=re.compile(r'^search-result-entry'))

# Loop through the entry links
for link in entry_links:
    url = link.get('href')
    if url:
        print("Found URL:", url)
        carsUrl.append("https://www.willhaben.at" + url)

# Loop through the list of car URLs and scrape data for each car
for car in carsUrl:
    print("Scraping URL:", car)
    car_instance = get_willhaben_query(car)
    upload_data(car_instance)

