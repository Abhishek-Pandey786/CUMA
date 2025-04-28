import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use API key from environment variable
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("Error: GOOGLE_API_KEY environment variable not found.")
    print("Please create a .env file with your API key.")
    exit(1)

genai.configure(api_key=api_key)

models = genai.list_models()
for model in models:
    print(model.name)
