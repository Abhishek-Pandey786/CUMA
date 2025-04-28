import sys
import subprocess

def check_package(package_name):
    try:
        __import__(package_name)
        print(f"✅ {package_name} is installed.")
        return True
    except ImportError:
        print(f"❌ {package_name} is NOT installed.")
        return False

# Check Python version and path
print(f"Python version: {sys.version}")
print(f"Python executable: {sys.executable}")
print(f"Python path: {sys.path}")
print("\nChecking packages:")

# Check required packages
packages = ["PyPDF2", "langdetect", "flask", "flask_cors", "streamlit", "google.generativeai"]
for package in packages:
    check_package(package)

# Try to install missing packages
print("\nAttempting to install missing packages...")
for package in packages:
    if not check_package(package):
        print(f"Installing {package}...")
        subprocess.call([sys.executable, "-m", "pip", "install", package])
        print(f"After installation, {package} is {'installed' if check_package(package) else 'still not installed'}.") 