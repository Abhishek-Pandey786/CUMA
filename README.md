# Christ University Multilingual AI Assistant (CUMA)

A comprehensive web application that provides AI assistance for Christ University users, including students, faculty, and administrators. The application has multilingual capabilities, text-to-speech, and speech-to-text features.

## Features

- User authentication (students, faculty, admins)
- Multilingual AI assistant
- Voice input and output
- Course management system
- Admin dashboard with analytics
- User management
- Translation services
- Email notifications

## Project Structure

- **Frontend**: React.js application with Material UI components
- **Backend**: Node.js/Express server with MySQL database
- **AI Component**: Python-based ML application using Streamlit and Google's Generative AI

## Setup

### Environment Variables

This application requires environment variables for API keys and sensitive information. Create a `.env` file in the project root and the `Multilingual-AI-Assistant-main` directory with the following:

```
# API Keys
GOOGLE_API_KEY=your_google_api_key_here
```

**IMPORTANT: Never commit `.env` files with real API keys to the repository. Our `.gitignore` is configured to exclude these files.**

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
# Configure your MySQL database
node server.js
```

### AI Component

```bash
cd Multilingual-AI-Assistant-main
pip install -r requirements.txt
python app.py
```

## Deployment

### Vercel Deployment

When deploying this application to Vercel, you need to configure environment variables in the Vercel dashboard:

1. Sign in to your Vercel account
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add the following variable:
   - `GOOGLE_API_KEY`: Your Google Gemini API key

### Handling Secrets Securely

To keep your API keys and other sensitive information secure:

1. Never hardcode API keys in your code
2. Use environment variables for all sensitive information
3. For local development, use `.env` files that are not committed to Git
4. For production, use the environment variable settings provided by your hosting platform
5. Regularly rotate your API keys, especially if you suspect they might be compromised

## License

[MIT](https://choosealicense.com/licenses/mit/)
