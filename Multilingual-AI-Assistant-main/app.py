import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
import os
from src.helper import voice_input, text_to_speech, llm_model_object
import base64
import glob
import time

# Load environment variables
load_dotenv()

# Configure Google API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def cleanup_old_audio_files():
    """Delete old speech files to prevent clutter"""
    current_time = time.time()
    audio_files = glob.glob("speech_*.mp3")
    
    # Keep only files from the last hour
    for file in audio_files:
        try:
            file_creation_time = os.path.getctime(file)
            if current_time - file_creation_time > 3600:  # 1 hour in seconds
                os.remove(file)
                print(f"Removed old file: {file}")
        except Exception as e:
            print(f"Error cleaning up file {file}: {e}")

def download_button(audio_path, button_text="Download Audio"):
    with open(audio_path, "rb") as file:
        btn = st.download_button(
            label=button_text,
            data=file,
            file_name=os.path.basename(audio_path),
            mime="audio/mp3"
        )

def main():
    # Page config
    st.set_page_config(
        page_title="Christ University AI Assistant",
        page_icon="🎓",
        layout="wide"
    )

    # Run cleanup at startup
    cleanup_old_audio_files()

    # Custom CSS with better dark mode support
    st.markdown("""
        <style>
        /* General styles */
        .main {
            background-color: var(--background-color);
        }
        .stApp {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        /* Card styling */
        .st-emotion-cache-1v0mbdj {
            border-radius: 10px;
            border: 1px solid rgba(128, 128, 128, 0.2);
            padding: 20px;
            margin: 10px 0;
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        /* Text colors */
        h1, h2, h3, h4, h5, h6 {
            color: var(--text-color);
            text-align: center;
            padding: 20px 0;
        }
        
        p, li, label {
            color: var(--text-color);
        }
        
        /* Button styling */
        .stButton>button {
            background-color: #1f4287;
            color: white !important;
            border-radius: 5px;
            padding: 10px 20px;
            border: none;
            transition: all 0.3s ease;
        }
        
        .stButton>button:hover {
            background-color: #162955;
            transform: translateY(-2px);
        }
        
        /* Input fields */
        .stTextInput>div>div>input {
            color: var(--text-color);
            background-color: var(--background-color);
        }
        
        /* Radio buttons */
        .stRadio>div {
            color: var(--text-color);
        }
        
        /* Expander */
        .streamlit-expanderHeader {
            color: var(--text-color);
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        /* Sidebar */
        .css-1d391kg {
            background-color: var(--background-color);
        }
        
        /* Success/Info messages */
        .stSuccess, .stInfo {
            color: var(--text-color);
        }
        
        /* Spinner */
        .stSpinner>div {
            border-color: var(--text-color);
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            color: var(--text-color);
            opacity: 0.7;
        }

        /* Go Back Button styling */
        .go-back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 10px 20px;
            background-color: #1f4287;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .go-back-btn:hover {
            background-color: #162955;
            transform: translateY(-2px);
        }
        </style>
    """, unsafe_allow_html=True)

    # Get the correct path to christ.png
    current_dir = os.path.dirname(os.path.abspath(__file__))
    logo_path = os.path.join(current_dir, "christ.png")

    # Header with Christ University logo
    col1, col2, col3 = st.columns([1,2,1])
    with col2:
        if os.path.exists(logo_path):
            st.image(logo_path, width=200)
        else:
            st.write("Christ University")  # Fallback if image not found
        st.title("🎓 Christ University Multilingual AI Assistant")
        st.markdown("---")

    # Sidebar for settings
    with st.sidebar:
        st.header("⚙️ Settings")
        
        st.markdown("---")
        st.markdown("### ℹ️ About")
        st.markdown("""
        This AI Assistant helps with:
        - 🌍 Multi-language support
        - 🎤 Voice & Text input
        - 🔊 Text-to-Speech output
        """)
        
        st.markdown("---")
        st.markdown("### 💡 Help")
        with st.expander("How to Use"):
            st.markdown("""
                1. ⌨️ Select input method (Text/Voice)
                2. 💭 Enter your query or speak
                3. 🤖 Get AI response with audio
                4. ⬇️ Download audio if needed
            """)

    # Main content
    st.markdown("### 📝 Choose Your Input Method")
    input_method = st.radio("", ["Text Input 📝", "Voice Input 🎤"], horizontal=True)

    # Initialize session state for responses
    if "responses" not in st.session_state:
        st.session_state.responses = []

    if input_method == "Text Input 📝":
        user_input = st.text_area(
            "💬 Enter your text here:",
            height=150,
            placeholder="Type your question or message here..."
        )
        
        if st.button("Submit 🚀"):
            if user_input:
                with st.spinner("🔄 Processing your request..."):
                    # Get AI response
                    response = llm_model_object(user_input)
                    
                    # Generate unique audio file
                    audio_file = text_to_speech(response)
                    
                    # Add to session state
                    st.session_state.responses.append({
                        "text": response,
                        "audio": audio_file,
                        "query": user_input,
                        "timestamp": time.time()
                    })

    else:  # Voice Input
        if st.button("Start Voice Recording 🎤"):
            with st.spinner("🎤 Listening..."):
                voice_text = voice_input()
                if voice_text:
                    st.success("✅ Voice captured successfully!")
                    
                    with st.spinner("🤖 Getting AI response..."):
                        # Get AI response
                        response = llm_model_object(voice_text)
                        
                        # Generate unique audio file
                        audio_file = text_to_speech(response)
                        
                        # Add to session state
                        st.session_state.responses.append({
                            "text": response,
                            "audio": audio_file,
                            "query": voice_text,
                            "timestamp": time.time()
                        })

    # Display all responses (most recent first)
    if st.session_state.responses:
        st.markdown("## 📚 Conversation History")
        
        for i, response_data in enumerate(reversed(st.session_state.responses)):
            with st.container():
                st.markdown(f"### 🗣️ You asked:")
                st.info(response_data["query"])
                
                st.markdown(f"### 🤖 AI Response:")
                st.success(response_data["text"])
                
                # Audio player
                st.markdown(f"### 🔊 Listen to Response:")
                st.audio(response_data["audio"])
                
                # Download button
                download_button(response_data["audio"], "Download Response 📥")
                
                st.markdown("---")

    # Footer
    st.markdown("---")
    st.markdown(
        """
        <div class="footer">
            <p>Christ University Multilingual AI Assistant</p>
            <p>© 2024 Christ University. All rights reserved.</p>
        </div>
        """, 
        unsafe_allow_html=True
    )

if __name__ == "__main__":
    main()
