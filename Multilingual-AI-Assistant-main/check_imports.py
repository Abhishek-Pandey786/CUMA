"""
This script checks if the required packages for the PDF translator app are installed correctly.
"""

import sys
import importlib

def check_package(package_name):
    try:
        module = importlib.import_module(package_name)
        version = getattr(module, '__version__', 'version not available')
        print(f"✅ {package_name} is installed correctly.")
        print(f"   Version: {version}")
        return True
    except ImportError as e:
        print(f"❌ {package_name} is NOT installed.")
        print(f"   Error: {str(e)}")
        return False

# List of packages to check
packages = [
    'PyPDF2',
    'langdetect',
    'flask',
    'flask_cors',
    'streamlit',
    'google.generativeai'
]

print("\nChecking Python environment:")
print(f"Python version: {sys.version}")
print(f"Python path: {sys.executable}\n")

print("Checking required packages:")
all_installed = True
for package in packages:
    if not check_package(package):
        all_installed = False

if all_installed:
    print("\n✅ All required packages are installed correctly!")
else:
    print("\n❌ Some packages are missing. Please install them using pip.") 