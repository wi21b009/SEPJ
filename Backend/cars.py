class Car:
    def __init__(self, brand, model, mileage, year_of_manufacture, country, region, price, engine, features, offer_link, user_id):
        self.brand = brand
        self.model = model
        self.mileage = mileage
        self.year_of_manufacture = year_of_manufacture
        self.country = country
        self.region = region
        self.price = price
        self.engine = engine
        self.features = features
        self.offer_link = offer_link
        self.user_id = user_id

    def __str__(self):
        return f"{self.year_of_manufacture} {self.brand} {self.model} in {self.country}, {self.region}"
