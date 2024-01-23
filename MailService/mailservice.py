import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
import config

def send_mail():
    # Database connection
    conn = psycopg2.connect(
        host="localhost",
        database="cardatabase",
        user="caruser",
        port="30004",
        password="carpassword"
    )

    if conn:
        # Fetch all user IDs
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users")
        all_user_ids = cursor.fetchall()

        for user_id in all_user_ids:
            user_id = user_id[0]  # Extract the user ID from the tuple

            # Select the email address of the user
            cursor.execute("SELECT email FROM users WHERE id = %s", (user_id,))
            receiver_email = cursor.fetchone()[0]

            # Select the search parameters of the user
            cursor.execute("SELECT * FROM search_parameters WHERE user_id = %s", (user_id,))
            search_parameters = cursor.fetchall()

            # Fetch only new offers that have not been sent to the user
            cursor.execute("""
            SELECT c.*, o.offer_link FROM cars c
            JOIN offers o ON c.id = o.car_id
            WHERE o.user_id = %s AND NOT EXISTS (
                SELECT 1 FROM sent_offers so 
                WHERE so.offer_id = o.id AND so.user_id = %s
            )
            """, (user_id, user_id))
            new_offers = cursor.fetchall()

            if new_offers:

                # Create the email message
                message = MIMEMultipart()
                message["From"] = config.sender_email
                message["To"] = receiver_email
                message["Subject"] = "Your crawled offers"

                # Constructing the HTML body for the email
                html = "<html><body>"
                html += f"<h2>Suchparameter für Benutzer ID: {user_id}</h2>"
                html += "<table border='1'><tr><th>ID</th><th>Marke</th><th>Modell</th><th>Kilometerstand</th><th>Baujahr</th><th>Land</th><th>Region</th><th>Preis</th><th>Motor</th><th>Merkmale</th><th>Aktiv</th></tr>"
                
                for row in search_parameters:
                    html += "<tr>" + "".join([f"<td>{str(item)}</td>" for item in row]) + "</tr>"
                html += "</table>"

                html += "<h2>Passende Autos und Angebote</h2>"
                html += "<table border='1'><tr><th>ID</th><th>Marke</th><th>Modell</th><th>Kilometerstand</th><th>Baujahr</th><th>Land</th><th>Region</th><th>Preis</th><th>Motor</th><th>Merkmale</th><th>Angebotslink</th></tr>"

                for row in new_offers:
                    html += "<tr>" + "".join([f"<td>{str(item)}</td>" for item in row[:-1]]) + f"<td><a href='{row[-1]}'>{row[-1]}</a></td></tr>"
                html += "</table></body></html>"

                message.attach(MIMEText(html, "html"))

                # SMTP server configuration and email sending
                with smtplib.SMTP(config.smtp_server, config.smtp_port) as server:
                    server.starttls()  # activate TLS encryption
                    server.login(config.sender_email, config.password)
                    server.send_message(message)
                    print(f"Email sent successfully to {receiver_email}")

                # Update the tracking table with new offers sent
                for offer in new_offers:
                    # Extract the offer_id from the offer tuple, assuming it's the first element
                    offer_id = offer[0]
                    cursor.execute("""
                        INSERT INTO sent_offers (user_id, offer_id, sent_timestamp)
                        VALUES (%s, %s, CURRENT_TIMESTAMP)
                        ON CONFLICT (user_id, offer_id) 
                        DO NOTHING  -- This will ignore the insert if it would cause a duplicate violation
                    """, (user_id, offer_id))

                # Commit the transaction to save the changes
                conn.commit()
                
            else:
                    # Print message if there are no new offers
                    print(f"No new offers for user ID: {user_id}")

        cursor.close()
    conn.close()

send_mail()  # Call the function to send emails to all users
