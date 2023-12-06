import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import psycopg2  # Import the psycopg2 library for PostgreSQL database access
import config  # Import the config.py file to access the email address and password

# Email configuration
sender_email = config.sender_email # Email address from the config.py file
receiver_email = "wi21b029@technikum-wien.at"  # Change to the email address you want to send the email to
password = config.password # The password for your own email address from the config.py file

# Create a multipart message
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = "Database Data" # Change the subject of the email



# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    database="cardatabase",
    user="caruser",
    port="30004",
    password="carpassword"
)

# Retrieve data from the database (modify the SQL query as needed)
cursor = conn.cursor()
cursor.execute("SELECT * FROM cars")
data = cursor.fetchall()

# Close the database connection
conn.close()


# Add body to the email
body = "\n".join([str(row) for row in data])  # Convert data to string and join with newlines
message.attach(MIMEText(body, "plain"))

# Add the image file to be attached
with open(r'C:\Users\Lukas\OneDrive\FH\5_Semester_WS2023\SEPJ\SEPJ\MailService\Testpicture.jpg', 'rb') as image_file: # Change the path to the image file, currently it is the path to the image file on my computer
    image = MIMEImage(image_file.read())
    message.attach(image) # Attach the image after attaching the text


# Fetch data from the database and format the email body
#email_body = email_template.format(
    #brand=car_data['brand'],
    #model=car_data['model'],
    #mileage=car_data['mileage'],
    #year_of_manufacture=car_data['year_of_manufacture'],
    #price=car_data['price'],
    #features=car_data['features']
#)

# SMTP server configuration
smtp_server = "smtp.technikum-wien.at"
smtp_port = 587  

# Create a secure connection with the SMTP server
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()  # Start TLS encryption
    server.login(sender_email, password)  # Log in to the SMTP server
    server.send_message(message)  # Send the email
    print("Email sent successfully!")
