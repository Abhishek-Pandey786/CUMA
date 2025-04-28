from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import sys
import os
import venv

app = Flask(__name__)
CORS(app)

@app.route('/launch-translator', methods=['GET'])
def start_translator():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        translator_app = os.path.join(current_dir, "app.py")
        
        print(f"Attempting to launch translator app at: {translator_app}")
        
        if not os.path.exists(translator_app):
            return jsonify({
                "status": "error",
                "message": f"Translator app not found at {translator_app}"
            }), 404
        
        # Get the path to the Python executable in the current environment
        python_executable = sys.executable
        
        # Get the path to the site-packages directory
        site_packages = os.path.join(os.path.dirname(python_executable), 'Lib', 'site-packages')
        
        # Set the PYTHONPATH environment variable to include the site-packages directory
        env = os.environ.copy()
        env['PYTHONPATH'] = f"{site_packages};{env.get('PYTHONPATH', '')}"
        
        # Launch the Streamlit app with the correct environment
        subprocess.Popen([python_executable, "-m", "streamlit", "run", translator_app], env=env)
        
        return jsonify({
            "status": "success",
            "message": "Translator app launched successfully"
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/launch-pdf-translator', methods=['GET'])
def start_pdf_translator():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        pdf_translator_app = os.path.join(current_dir, "pdf_translator_app.py")
        
        print(f"Attempting to launch PDF translator app at: {pdf_translator_app}")
        
        if not os.path.exists(pdf_translator_app):
            return jsonify({
                "status": "error",
                "message": f"PDF Translator app not found at {pdf_translator_app}"
            }), 404
        
        # Get the path to the Python executable in the current environment
        python_executable = sys.executable
        
        # Get the path to the site-packages directory
        site_packages = os.path.join(os.path.dirname(python_executable), 'Lib', 'site-packages')
        
        # Set the PYTHONPATH environment variable to include the site-packages directory
        env = os.environ.copy()
        env['PYTHONPATH'] = f"{site_packages};{env.get('PYTHONPATH', '')}"
        
        # Launch the Streamlit app with the correct environment
        subprocess.Popen([python_executable, "-m", "streamlit", "run", pdf_translator_app], env=env)
        
        return jsonify({
            "status": "success",
            "message": "PDF Translator app launched successfully"
        }), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    port = 5001  # Using port 5001 since 5000 is used by Node.js
    print(f"Starting Flask server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True) 