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

When deploying this application, make sure to set up environment variables in your hosting platform (e.g., Vercel) for:

- `GOOGLE_API_KEY`

## License

[MIT](https://choosealicense.com/licenses/mit/)
