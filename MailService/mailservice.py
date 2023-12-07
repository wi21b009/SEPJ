import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
import config

def send_mail(user_id):
    # Email configuration
    sender_email = config.sender_email
    password = config.password

    # Database connection
    conn = psycopg2.connect(
        host="localhost",
        database="cardatabase",
        user="caruser",
        port="30004",
        password="carpassword"
    )

    # Select the email address of the user
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT email FROM users WHERE id = %s", (user_id,))
        receiver_email = cursor.fetchone()[0]

        # Select the search parameters of the user
        cursor.execute("SELECT * FROM search_parameters WHERE user_id = %s", (user_id,))
        search_parameters = cursor.fetchall()

        # Select the cars and offers based on the search parameters
        cursor.execute("""
            SELECT c.*, o.offer_link FROM cars c
            JOIN offers o ON c.id = o.car_id
            WHERE o.user_id = %s
        """, (user_id,))
        car_offers = cursor.fetchall()
        cursor.close()

    # Close the database connection
    conn.close()

    # Create the email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "Your crawled offers"

    # Erstellen des HTML-Bodies für die E-Mail
    html = "<html><body>"
    html += f"<h2>Suchparameter für Benutzer ID: {user_id}</h2>"
    html += "<table border='1'><tr><th>ID</th><th>Marke</th><th>Modell</th><th>Kilometerstand</th><th>Baujahr</th><th>Land</th><th>Region</th><th>Preis</th><th>Motor</th><th>Merkmale</th><th>Aktiv</th></tr>"

    for row in search_parameters:
        html += "<tr>" + "".join([f"<td>{str(item)}</td>" for item in row]) + "</tr>"
    html += "</table>"

    html += "<h2>Passende Autos und Angebote</h2>"
    html += "<table border='1'><tr><th>ID</th><th>Marke</th><th>Modell</th><th>Kilometerstand</th><th>Baujahr</th><th>Land</th><th>Region</th><th>Preis</th><th>Motor</th><th>Merkmale</th><th>Angebotslink</th></tr>"

    for row in car_offers:
        html += "<tr>" + "".join([f"<td>{str(item)}</td>" for item in row[:-1]]) + f"<td><a href='{row[-1]}'>{row[-1]}</a></td></tr>"
    html += "</table></body></html>"

    message.attach(MIMEText(html, "html"))

    # SMTP-Serverconfiguration
    smtp_server = "smtp.technikum-wien.at"
    smtp_port = 587

    # connect to SMTP server and send email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # activate TLS encryption
        server.login(sender_email, password)  # login with email and password
        server.send_message(message)  # send the email
        print("Email sent successfully")

send_mail(1)  # testing with user_id = 1