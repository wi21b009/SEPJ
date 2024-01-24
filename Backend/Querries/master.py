import time
import os
from subprocess import run

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

            # Wait for two minutes before running again
            time.sleep(120)

if __name__ == "__main__":
    scheduler = CrawlScheduler()
