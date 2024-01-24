import time
import os
import sys
from subprocess import run


# Calculate the relative path to mailservice.py
current_dir = os.path.dirname(os.path.abspath(__file__))
sepj_dir = os.path.dirname(os.path.dirname(current_dir))  # Go up two levels to SEPJ
mailservice_path = os.path.join(sepj_dir, 'MailService')

# Add mailservice_path to the system path
sys.path.append(mailservice_path)
from mailservice import send_mail


class CrawlScheduler:
    def __init__(self):
        # Set the working directory to the directory containing the script
        script_directory = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_directory)

        self.run_crawl_agent()

    def run_crawl_agent(self):
        while True:
            # Run the crawl_agent.py script
            run(["python", "crawl_agent.py"])

             # After successful upload, call send_mail
            send_mail()


            # Wait for two minutes before running again
            time.sleep(120)

if __name__ == "__main__":
    scheduler = CrawlScheduler()
