class Car:
    def __init__(self, brand, model, mileage, year_of_manufacture, country, region, price, engine, features):
        self.brand = brand
        self.model = model
        self.mileage = mileage
        self.year_of_manufacture = year_of_manufacture
        self.country = country
        self.region = region
        self.price = price
        self.engine = engine
        self.features = features

    def __str__(self):
        return f"{self.year_of_manufacture} {self.brand} {self.model} in {self.country}, {self.region}"
