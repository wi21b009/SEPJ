# Import necessary libraries
from bs4 import BeautifulSoup
import urllib.request
import re

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
        # CAR NAME
        # Find the <h1> element with name of the car
        target_h1 = soup.find('h1')

        # Extract all the text from the found <h1> element
        if target_h1:
            all_text = target_h1.get_text(separator= '\n')
            print(all_text)
        else:
            print("H1 element not found with the specified class.")


        # CAR PRICE
        # Find the <span> element with the specific class
        #target_span = soup.find('span', class_='Text-sc-10o2fdq-0 fvWhFV')
        target_span = soup.find('span', {'data-testid': 'contact-box-price-box-price-value-0'})


        # Extract all the text from the found <span> element
        if target_span:
            all_text = target_span.get_text(separator= '\n')
            print(all_text)
        else:
            print("Span element not found with the specified class.")


        # CAR LOCATION
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

            print("Region:", region)
            print("Country:", country)
        else:
            print("Div element not found with the specified class.")


        # CAR DATA
        # Find the <ul> element with the specific class
        target_div = soup.find('ul', class_='PropertyList-sc-e2zq14-0 dptFLl')

        # Extract all the text from the found <div> element
        if target_div:
            all_text = target_div.get_text(separator= '\n')
            print(all_text)
        else:
            print("Div element not found with the specified class.")

        # CAR DESCRIPTION
        # Find the <div> element with the specific class
        target_div = soup.find('div', {'data-testid': 'ad-description-Beschreibung'})

        # Extract all the text from the found <div> element
        if target_div:
            all_text = target_div.get_text(separator= '\n')
            print(all_text)
        else:
            print("Div element not found with the specified class.")



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
    get_willhaben_query(car)
