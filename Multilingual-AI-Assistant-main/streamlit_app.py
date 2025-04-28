import streamlit as st
from src.helper import voice_input, text_to_speech, llm_model_object
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def main():
    st.set_page_config(
        page_title="Christ University Multilingual AI Assistant",
        page_icon="🎓",
        layout="wide"
    )

    st.title("Christ University Multilingual AI Assistant")

    # Input method selection
    input_method = st.radio("Choose input method:", ["Text", "Voice"])

    if input_method == "Text":
        user_input = st.text_area("Enter your text:", height=150)
        if st.button("Submit"):
            if user_input:
                with st.spinner("Processing..."):
                    response = llm_model_object(user_input)
                    st.write("Response:", response)
    else:
        if st.button("Start Voice Input"):
            with st.spinner("Listening..."):
                voice_text = voice_input()
                if voice_text:
                    st.write("You said:", voice_text)
                    response = llm_model_object(voice_text)
                    st.write("Response:", response)
                    text_to_speech(response)

if __name__ == "__main__":
    main()