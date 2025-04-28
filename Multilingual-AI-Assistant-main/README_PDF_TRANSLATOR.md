# CUMA PDF Translator

This feature allows students to translate their study materials from PDF files into their preferred Indian language.

## Features

- Upload PDF files containing study materials
- Select from 5 Indian languages (Hindi, Kannada, Malayalam, Tamil, Telugu)
- Extract text from PDF files
- Translate the extracted text to the selected language
- Download the translated text as a text file

## How to Use

1. **Start the API Server**:

   ```
   python api_server.py
   ```

   This will start the Flask API server on port 5000.

2. **Access the PDF Translator**:

   - Log in to the CUMA application as a student
   - Navigate to the Student Dashboard
   - Click on the "Translate Notes" button in the PDF Translation card
   - This will launch the PDF Translator Streamlit app in a new window

3. **Translate Your PDF**:
   - Select your target language from the dropdown menu
   - Upload your PDF file
   - Click the "Translate PDF" button
   - The translated text will be displayed on the screen
   - You can download the translated text as a text file

## Technical Details

The PDF Translator consists of the following components:

1. **Frontend Integration**:

   - A button in the StudentPage.js that calls the API to launch the Streamlit app
   - The API call is made to `http://localhost:5000/launch-translator`

2. **API Server**:

   - A Flask server that provides an endpoint to launch the Streamlit app
   - Located in `api_server.py`

3. **Streamlit App**:

   - A standalone Streamlit application for PDF translation
   - Located in `pdf_translator_app.py`

4. **Helper Functions**:
   - Functions for launching the Streamlit app
   - Located in `launch_translator.py`

## Dependencies

The following dependencies are required for the PDF Translator:

- Flask
- Flask-CORS
- Streamlit
- PyPDF2
- langdetect
- google-generativeai

## Troubleshooting

If you encounter any issues:

1. **Streamlit app doesn't launch**:

   - Make sure the API server is running
   - Check if the port 5000 is available
   - Verify that all dependencies are installed

2. **PDF upload fails**:

   - Ensure the PDF file is not corrupted
   - Check if the PDF contains text (not just images)
   - Verify that the file size is not too large

3. **Translation fails**:
   - Check your internet connection
   - Verify that your Google API key is valid
   - Ensure the text in the PDF is in a language that can be detected

## Future Enhancements

- Support for more languages
- OCR for scanned PDFs
- Translation of images in PDFs
- Batch translation of multiple PDFs
- Integration with the main CUMA application
