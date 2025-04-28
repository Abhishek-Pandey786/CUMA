import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
import os
import PyPDF2
import io
from langdetect import detect
import time
import webbrowser
import pytesseract
from pdf2image import convert_from_bytes
import tempfile
from PIL import Image
import numpy as np
from typing import List, Dict, Optional
import backoff
import concurrent.futures

# Load environment variables
load_dotenv()

# Configure Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Define available languages with their codes and native names
SUPPORTED_LANGUAGES = {
    # Indian Languages
    "Hindi": {"code": "hi", "native": "हिन्दी"},
    "Kannada": {"code": "kn", "native": "ಕನ್ನಡ"},
    "Malayalam": {"code": "ml", "native": "മലയാളം"},
    "Tamil": {"code": "ta", "native": "தமிழ்"},
    "Telugu": {"code": "te", "native": "తెలుగు"},
    # International Languages
    "French": {"code": "fr", "native": "Français"},
    "Spanish": {"code": "es", "native": "Español"},
    "German": {"code": "de", "native": "Deutsch"},
    "Chinese": {"code": "zh", "native": "中文"},
    "Japanese": {"code": "ja", "native": "日本語"},
    "Korean": {"code": "ko", "native": "한국어"},
    "Russian": {"code": "ru", "native": "Русский"},
    "Arabic": {"code": "ar", "native": "العربية"}
}

# Constants
CHUNK_SIZE = 1000  # characters per chunk
MAX_RETRIES = 3
TIMEOUT = 30  # seconds

def extract_text_from_pdf(pdf_file, use_ocr=False):
    """Extract text from uploaded PDF file with optional OCR support"""
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        
        # First try normal text extraction
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            page_text = page.extract_text()
            
            # If text is empty or very short, try OCR
            if use_ocr and (not page_text or len(page_text.strip()) < 50):
                # Convert PDF page to image
                images = convert_from_bytes(pdf_file.getvalue(), first_page=page_num+1, last_page=page_num+1)
                if images:
                    # Perform OCR on the image
                    page_text = pytesseract.image_to_string(images[0])
            
            text += page_text + "\n"
        
        return text.strip()
    except Exception as e:
        st.error(f"Error extracting text from PDF: {str(e)}")
        return None

@backoff.on_exception(backoff.expo, Exception, max_tries=MAX_RETRIES)
def translate_chunk(chunk: str, target_language: str) -> str:
    """Translate a single chunk of text with retry mechanism"""
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        prompt = f"""Translate the following text to {target_language}. 
        Preserve the formatting and structure of the text.
        Only provide the translated text without any explanations or notes.
        
        Text to translate:
        {chunk}
        """
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        st.error(f"Translation error for chunk: {str(e)}")
        raise

def translate_text(text: str, target_language: str) -> Optional[str]:
    """Translate text to the target language using chunked processing"""
    try:
        # Split text into chunks
        chunks = [text[i:i+CHUNK_SIZE] for i in range(0, len(text), CHUNK_SIZE)]
        total_chunks = len(chunks)
        
        # Create progress bar
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        translated_chunks = []
        
        # Use ThreadPoolExecutor for parallel processing
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            future_to_chunk = {
                executor.submit(translate_chunk, chunk, target_language): i 
                for i, chunk in enumerate(chunks)
            }
            
            for future in concurrent.futures.as_completed(future_to_chunk):
                chunk_index = future_to_chunk[future]
                try:
                    translated_chunk = future.result()
                    translated_chunks.append(translated_chunk)
                    
                    # Update progress
                    progress = (chunk_index + 1) / total_chunks
                    progress_bar.progress(progress)
                    status_text.text(f"Translating... {int(progress * 100)}%")
                    
                except Exception as e:
                    st.error(f"Error translating chunk {chunk_index + 1}: {str(e)}")
                    return None
        
        # Combine translated chunks
        return "".join(translated_chunks)
        
    except Exception as e:
        st.error(f"Translation error: {str(e)}")
        return None

def detect_language(text: str) -> str:
    """Detect the language of the text with improved error handling"""
    try:
        # Try multiple times with different text samples
        samples = [text[:1000], text[-1000:], text[len(text)//2-500:len(text)//2+500]]
        detected_langs = []
        
        for sample in samples:
            if sample.strip():
                try:
                    lang = detect(sample)
                    detected_langs.append(lang)
                except:
                    continue
        
        # Return most common detected language or default to English
        if detected_langs:
            from collections import Counter
            return Counter(detected_langs).most_common(1)[0][0]
        return "en"
    except:
        return "en"  # Default to English if detection fails

def go_back():
    """Navigate back to the React frontend"""
    webbrowser.open('http://localhost:3000/student-page', new=0)
    st.stop()

def main():
    st.set_page_config(
        page_title="CUMA PDF Translator",
        page_icon="📚",
        layout="wide",
        initial_sidebar_state="collapsed"
    )
    
    # Custom CSS for both light and dark mode
    st.markdown("""
        <style>
        /* Common styles */
        .stApp {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        /* Title container */
        .title-container {
            text-align: center;
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        
        /* Dark mode styles */
        [data-theme="dark"] .title-container {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }
        [data-theme="dark"] .content-container {
            background-color: #1e1e1e;
            border: 1px solid #333;
        }
        [data-theme="dark"] .stTextArea > div > div {
            background-color: #2d2d2d !important;
            color: #ffffff !important;
        }
        
        /* Light mode styles */
        [data-theme="light"] .title-container {
            background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
        }
        [data-theme="light"] .content-container {
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
        }
        
        /* Common container styles */
        .content-container {
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        /* Button styles */
        .stButton>button {
            padding: 0.75rem !important;
            border-radius: 0.5rem !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
        }
        
        /* Back button styles */
        div[data-testid="stHorizontalBlock"] > div:first-child .stButton>button {
            background-color: transparent !important;
            border: 2px solid #1e3c72 !important;
            color: #1e3c72 !important;
            padding: 0.5rem 1rem !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            width: auto !important;
        }
        
        [data-theme="dark"] div[data-testid="stHorizontalBlock"] > div:first-child .stButton>button {
            border-color: #ffffff !important;
            color: #ffffff !important;
        }
        
        /* Language selection */
        .language-name {
            font-size: 1.1em;
            font-weight: 500;
        }
        .native-name {
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        /* Progress indicators */
        .stProgress > div > div > div {
            background-color: #1e3c72 !important;
        }
        </style>
    """, unsafe_allow_html=True)
    
    # Back button in a narrow column
    col1, col2, col3 = st.columns([1, 8, 1])
    with col1:
        if st.button("← Back"):
            go_back()
    
    # Title
    st.markdown("""
        <div class="title-container">
            <h1 style="color: white; margin-bottom: 0.5rem;">📚 CUMA PDF Translator</h1>
            <p style="color: white; font-size: 1.2rem;">Transform Your Study Materials into Your Preferred Language</p>
        </div>
    """, unsafe_allow_html=True)
    
    # Main content in two columns
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("""
            <div class="content-container">
                <h3>1. Select Your Target Language</h3>
            </div>
        """, unsafe_allow_html=True)
        
        # Language selection with native names
        selected_language = st.selectbox(
            "Choose translation language:",
            list(SUPPORTED_LANGUAGES.keys()),
            format_func=lambda x: f"{x} ({SUPPORTED_LANGUAGES[x]['native']})"
        )
        
        st.markdown("""
            <div class="content-container">
                <h3>2. Upload Your Document</h3>
            </div>
        """, unsafe_allow_html=True)
        
        # File upload with OCR option
        uploaded_file = st.file_uploader("Upload a PDF file", type=["pdf"])
        use_ocr = st.checkbox("Use OCR for scanned documents", 
                            help="Enable this if your PDF contains scanned pages or images")
    
    if uploaded_file is not None:
        with col2:
            st.markdown("""
                <div class="content-container">
                    <h3>3. Preview and Translate</h3>
                </div>
            """, unsafe_allow_html=True)
            
            # Extract and show original text
            with st.spinner("📄 Extracting text from PDF..."):
                extracted_text = extract_text_from_pdf(uploaded_file, use_ocr=use_ocr)
                
                if extracted_text:
                    st.markdown("**Original Text:**")
                    st.text_area("", extracted_text, height=200, disabled=True)
                    
                    # Detect and show language
                    detected_lang = detect_language(extracted_text)
                    st.info(f"📝 Detected language: {detected_lang.upper()}")
                    
                    # Translate button
                    if st.button("🔄 Translate Document", key="translate_button"):
                        with st.spinner(f"🌐 Translating to {selected_language}..."):
                            translated_text = translate_text(extracted_text, selected_language)
                            
                            if translated_text:
                                st.success("✅ Translation completed!")
                                st.markdown("**Translated Text:**")
                                st.text_area("", translated_text, height=300)
                                
                                # Download button
                                timestamp = int(time.time())
                                filename = f"translated_{selected_language.lower()}_{timestamp}.txt"
                                
                                st.download_button(
                                    label="📥 Download Translation",
                                    data=translated_text,
                                    file_name=filename,
                                    mime="text/plain",
                                    key="download_button"
                                )
    else:
        with col2:
            st.markdown("""
                <div class="content-container" style="text-align: center;">
                    <h3>👆 Upload a PDF to get started</h3>
                    <p>Your document will appear here for translation</p>
                </div>
            """, unsafe_allow_html=True)

if __name__ == "__main__":
    main() 