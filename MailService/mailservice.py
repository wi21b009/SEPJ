import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

# Email configuration
sender_email = "wi21b0..@technikum-wien.at"  # Change with your own email address from university
receiver_email = "wi21b0..@technikum-wien.at"  # Change to the email address you want to send the email to
password = "YOURPASSWORD"  # The password for your own email address

# Create a multipart message
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = "Test Email from Python"  # Change the subject of the email

# Add body to the email
body = "This is the body of the email sent through Python" # Change the body of the email
message.attach(MIMEText(body, "plain"))

# Add the image file to be attached
with open('Testpicture.jpg', 'rb') as image_file:
    image = MIMEImage(image_file.read())
    message.attach(image)  # Attach the image after attaching the text


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
