-- drop table cars if already exists
DROP TABLE IF EXISTS cars;

-- create tabel cars
CREATE TABLE cars (
  id serial PRIMARY KEY,
  brand VARCHAR (255),
  model VARCHAR (255),
  mileage INT,
  year_of_manufacture INT,
  country VARCHAR (255),
  region VARCHAR (255),
  price INT,
  engine VARCHAR (255),
  features TEXT
);

-- User table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255) UNIQUE NOT NULL,
  email VARCHAR (255) UNIQUE NOT NULL,
  password VARCHAR (255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Search Parameters table
CREATE TABLE search_parameters (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  brand VARCHAR (255),
  model VARCHAR (255),
  mileage INT,
  year_of_manufacture INT,
  country VARCHAR (255),
  region VARCHAR (255),
  price INT,
  engine VARCHAR (255),
  features TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Offers table
CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  car_id INT REFERENCES cars(id),
  user_id INT REFERENCES users(id),
  price INT,
  offer_link TEXT
);

CREATE EXTENSION IF NOT EXISTS pgcrypto; --has to be installed on the server to use the pgcrypto module

SELECT * FROM pg_extension; --check if pgcrypto is installed

-- Users test data
INSERT INTO users (username, email, password, is_active) VALUES
('john_doe', 'john.doe@example.com', crypt('12345', gen_salt('bf')), TRUE), --#gen_salt('bf') is used to generate a random salt (for hasing the password)
('jane_smith', 'jane.smith@example.com', crypt('54321', gen_salt('bf')), TRUE),
('alex_brown', 'alex.brown@example.com', crypt('09876', gen_salt('bf')), FALSE);


-- Search Parameters test data
INSERT INTO search_parameters (user_id, brand, model, mileage, year_of_manufacture, country, region, price, engine, is_active) VALUES
(1, 'Volkswagen', 'Golf', 50000, 2015, 'Österreich', 'Wien', 15000, 'Diesel', TRUE),
(1, 'Toyota', 'Camry', 20000, 2020, 'Österreich', 'St. Pölten', 20000, 'Diesel', FALSE),
(2, 'Ford', 'Mustang', 50000, 1990, 'Österreich', 'Graz', 50000, 'Benzin', TRUE);


-- Testdata
INSERT INTO cars (brand, model, mileage, year_of_manufacture, country, region, price, engine, features) VALUES
  ('Volkswagen', 'Golf', 50000, 2019, 'Germany', 'North', 20000, '1.4L Turbo', 'Air Conditioning, Power Windows, Navigation'),
  ('Toyota', 'Camry', 40000, 2020, 'Japan', 'Tokyo', 25000, '2.5L Hybrid', 'Leather Seats, Sunroof, Backup Camera'),
  ('Ford', 'F-150', 60000, 2018, 'USA', 'California', 35000, '5.0L V8', 'Towing Package, Bed Liner, Bluetooth'),
  ('Honda', 'Civic', 30000, 2021, 'Japan', 'Osaka', 18000, '1.5L Turbo', 'Apple CarPlay, Lane Keeping Assist, Keyless Entry'),
  ('Chevrolet', 'Malibu', 40000, 2020, 'USA', 'New York', 22000, '2.0L Turbo', 'Heated Seats, Remote Start, Android Auto'),
  ('BMW', '3 Series', 25000, 2022, 'Germany', 'Bavaria', 35000, '2.0L TwinPower Turbo', 'Premium Sound System, Adaptive Cruise Control, Wireless Charging'),
  ('Mercedes-Benz', 'C-Class', 35000, 2019, 'Germany', 'Baden-Württemberg', 40000, '2.0L Turbo', 'Sunroof, Leather Upholstery, Blind Spot Monitoring'),
  ('Audi', 'A4', 28000, 2021, 'Germany', 'Bavaria', 30000, '2.0L Turbo', 'Virtual Cockpit, Quattro All-Wheel Drive, Parking Sensors'),
  ('Nissan', 'Altima', 32000, 2020, 'Japan', 'Tokyo', 22000, '2.5L 4-Cylinder', 'Rearview Camera, Push Button Start, NissanConnect'),
  ('Hyundai', 'Elantra', 29000, 2021, 'South Korea', 'Seoul', 18000, '2.0L 4-Cylinder', 'Android Auto, Apple CarPlay, Forward Collision Warning'),
  ('Ford', 'Mustang', 35000, 2022, 'USA', 'Texas', 45000, '5.0L V8', 'Convertible, Performance Package, SYNC 3'),
  ('Toyota', 'Corolla', 25000, 2021, 'Japan', 'Tokyo', 21000, '1.8L 4-Cylinder', 'Lane Departure Warning, Toyota Safety Sense, Bluetooth'),
  ('Volkswagen', 'Passat', 42000, 2020, 'Germany', 'North', 26000, '2.0L Turbo', 'Navigation, Sunroof, Apple CarPlay'),
  ('Mercedes-Benz', 'E-Class', 40000, 2021, 'Germany', 'Baden-Württemberg', 48000, '3.0L Turbo', 'Leather Seats, Distronic, Burmester Sound System'),
  ('Kia', 'Optima', 32000, 2019, 'South Korea', 'Seoul', 19000, '2.4L 4-Cylinder', 'Blind Spot Detection, Panoramic Sunroof, Android Auto'),
  ('Mazda', 'Mazda6', 34000, 2020, 'Japan', 'Tokyo', 23000, '2.5L 4-Cylinder', 'Dual-Zone Climate Control, Advanced Safety Features, Mazda Connect'),
  ('Subaru', 'Impreza', 28000, 2022, 'Japan', 'Osaka', 21000, '2.0L 4-Cylinder', 'Symmetrical All-Wheel Drive, EyeSight Driver Assist, Apple CarPlay'),
  ('Lexus', 'ES', 30000, 2021, 'Japan', 'Tokyo', 45000, '3.5L V6', 'Mark Levinson Audio, Navigation, Adaptive Cruise Control'),
  ('Jeep', 'Grand Cherokee', 40000, 2021, 'USA', 'Colorado', 40000, '3.6L V6', '4x4, Uconnect Infotainment, Quadra-Trac II'),
  ('Tesla', 'Model 3', 15000, 2023, 'USA', 'California', 50000, 'Electric', 'Autopilot, Full Self-Driving, Premium Interior'),
  ('Porsche', '911', 25000, 2022, 'Germany', 'Baden-Württemberg', 90000, '3.0L Twin-Turbo Flat-6', 'PDK Transmission, Sport Chrono Package, PASM'),
  ('Ferrari', '488 GTB', 10000, 2022, 'Italy', 'Maranello', 250000, '3.9L Twin-Turbo V8', 'Carbon Fiber Interior, Scuderia Shields, Racing Seats');


-- Offers test data
INSERT INTO offers (car_id, user_id, price, offer_link) VALUES
(1, 1, 19500, 'http://example.com/offers/1'),
(2, 1, 24500, 'http://example.com/offers/2'),
(15, 2, 18500, 'http://example.com/offers/3');