// Configuration for API endpoints
const isDev = process.env.NODE_ENV === 'development';

// API URLs
const config = {
  // Backend API base URL - use localhost in development, and relative path in production
  apiUrl: isDev ? 'http://localhost:3001' : '/api',
  
  // AI Assistant URL - this would be your deployed AI component URL
  aiAssistantUrl: isDev ? 'http://localhost:8501' : process.env.REACT_APP_AI_ASSISTANT_URL || '/ai-assistant'
};

export default config; 