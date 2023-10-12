class Auto:
    def __init__(self, name, model, hersteller, baujahr, kilometer, preis):
        self.name = name
        self.model = model
        self.hersteller = hersteller
        self.baujahr = baujahr
        self.kilometer = kilometer
        self.preis = preis

    def __str__(self):
        return f"{self.name} {self.model} ({self.baujahr}) von {self.hersteller} - {self.kilometer} km - {self.preis} EUR"

# Test
mein_auto = Auto("Civic", "2022", "Honda", 2022, 15000, 20000)
print(mein_auto)
