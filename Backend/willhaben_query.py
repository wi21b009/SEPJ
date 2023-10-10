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
        # Find the <h1> element with the specific class
        target_h1 = soup.find('h1', class_='Text-sc-10o2fdq-0 hKdsfS')

        # Extract all the text from the found <h1> element
        if target_h1:
            all_text = target_h1.get_text(separator= '\n')
            print(all_text)
        else:
            print("H1 element not found with the specified class.")


        # CAR PRICE
        # Find the <span> element with the specific class
        target_span = soup.find('span', class_='Text-sc-10o2fdq-0 fvWhFV')

        # Extract all the text from the found <span> element
        if target_span:
            all_text = target_span.get_text(separator= '\n')
            print(all_text)
        else:
            print("Span element not found with the specified class.")

        # CAR DATA
        # Find the <ul> element with the specific class
        target_div = soup.find('ul', class_='PropertyList-sc-e2zq14-0 dAGxTc')

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
cars = []

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
        cars.append("https://www.willhaben.at" + url)

# Loop through the list of car URLs and scrape data for each car
for car in cars:
    print("Scraping URL:", car)
    get_willhaben_query(car)
