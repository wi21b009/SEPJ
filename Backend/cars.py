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

# Example usage:
car_data = {
    "brand": "Toyota",
    "model": "Corolla",
    "mileage": 30000,
    "year_of_manufacture": 2021,
    "country": "Japan",
    "region": "Tokyo",
    "price": 21000.00,
    "engine": "1.8L 4-Cylinder",
    "features": "Lane Departure Warning, Toyota Safety Sense, Bluetooth"
}

# Create a Car object
car_instance = Car(**car_data)

# Accessing attributes
print(car_instance.brand)  # Output: Toyota
print(car_instance.model)  # Output: Corolla

# Print the car details using __str__ method
print(car_instance)
