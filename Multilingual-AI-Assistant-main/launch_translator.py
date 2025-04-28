import subprocess
import sys
import os

def launch_translator():
    """Launch the PDF translator Streamlit app"""
    try:
        # Get the directory of this script
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Path to the PDF translator app
        translator_app = os.path.join(current_dir, "pdf_translator_app.py")
        
        # Launch the Streamlit app
        subprocess.Popen([sys.executable, "-m", "streamlit", "run", translator_app])
        
        print("PDF Translator app launched successfully!")
        return True
    except Exception as e:
        print(f"Error launching PDF Translator app: {str(e)}")
        return False

if __name__ == "__main__":
    launch_translator() 