#base url, where the search is performed
base_url = "https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse?sfId=aaa81249-4bc8-4ac5-97f3-a5bd21b1229c&isNavigation=true"

#the search parameters
search_params = {
    "CAR_MODEL/MAKE": "1005", #make: 1005 = BMW
    "CAR_MODEL/MODEL": "1042", #model: 1042 = 1er
    "MILEAGE_TO": "10000", #mileage: 10000 = 10.000km
    "YEAR_MODEL_FROM": "2023", #year of manufacture: 2023 = 2023
    "PRICE_TO": "45000" #price: 45000 = 45.000€
}

#function to build the url
def build_url(base_url, search_params):
    #create a list of strings with the search parameters
    search_params_list = [f"{k}={v}" for k, v in search_params.items()]

    #join the list of strings with the base url
    search_params_string = "&".join(search_params_list)

    #return the complete url
    return f"{base_url}&{search_params_string}"
