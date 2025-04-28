import subprocess
import sys
import os

def install_dependencies():
    """Install the required dependencies for the PDF translator app"""
    print("Installing dependencies for the PDF translator app...")
    
    # Get the path to the Python executable in the current environment
    python_executable = sys.executable
    
    # Install the required packages
    packages = [
        "SpeechRecognition",
        "pipwin",
        "pyaudio",
        "gTTS",
        "google-generativeai",
        "python-dotenv",
        "streamlit",
        "PyPDF2",
        "langdetect",
        "flask",
        "flask-cors",
        "pdf2image",
        "pytesseract",
        "Pillow",
        "backoff"
    ]
    
    for package in packages:
        print(f"Installing {package}...")
        subprocess.check_call([python_executable, "-m", "pip", "install", package])
    
    print("All dependencies installed successfully!")

if __name__ == "__main__":
    install_dependencies() 