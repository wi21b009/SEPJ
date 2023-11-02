from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager

# Set up a new Firefox browser
webdriver_service = Service(GeckoDriverManager().install())
driver = webdriver.Firefox(service=webdriver_service)

# The URL of the AutoScout24 page with car listings
url = 'https://www.autoscout24.at/lst?atype=C&cy=A&desc=0&sort=standard&source=homepage_search-mask&ustate=N%2CU'

# Open the specified URL in the browser
driver.get(url)

# Wait for some time to allow the dynamic content to load
import time
time.sleep(5)

# Get the page source of the loaded webpage
page_source = driver.page_source

# Print the page source
print(page_source)

# Quit the browser, closing all windows and ending the WebDriver session
driver.quit()
