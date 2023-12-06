import os
import pandas as pd

# Get the current working directory
current_dir = os.getcwd()

# Combine the current directory with the file name
file_path = os.path.join(current_dir, "Brands.xlsx")

# Read the Excel file
brand_model_translation = pd.read_excel(file_path)

print(brand_model_translation)
