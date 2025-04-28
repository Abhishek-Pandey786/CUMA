import speech_recognition as sr
import google.generativeai as genai
from dotenv import load_dotenv
import os
from gtts import gTTS
import time

print("perfect!!")
load_dotenv()

GOOGLE_API_KEY=os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"]=GOOGLE_API_KEY



def voice_input():
    r=sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Listening...")
        # Adjust for ambient noise
        r.adjust_for_ambient_noise(source, duration=0.5)
        audio=r.listen(source)
    try:
        text=r.recognize_google(audio)
        print("You said:", text)
        return text
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand the audio. Please try speaking again.")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service: {e}")
        return None
    

def text_to_speech(text):
    try:
        # Create a unique filename with timestamp
        timestamp = int(time.time())
        filename = f"speech_{timestamp}.mp3"
        
        # Generate speech
        tts = gTTS(text=text, lang="en")
        tts.save(filename)
        
        print(f"Created audio file: {filename}")
        return filename
    except Exception as e:
        print(f"Error in text-to-speech conversion: {e}")
        return "speech.mp3"  # Return default as fallback

def llm_model_object(user_text):
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Create a context-aware prompt
        prompt = f"""You are a helpful academic assistant for Christ University students. 
        Please provide clear, accurate, and helpful responses to the following question: 
        {user_text}
        
        If the question is in a different language, please respond in the same language.
        For academic questions, include relevant examples and explanations.
        Keep responses concise but informative."""
        
        response = model.generate_content(prompt)
        result = response.text
        
        return result
    except Exception as e:
        error_message = f"I apologize, but I encountered an error: {str(e)}. Please try again."
        print(f"Error in LLM processing: {e}")
        return error_message
       