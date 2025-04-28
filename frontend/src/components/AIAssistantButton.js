import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import './AIAssistantButton.css';

function AIAssistantButton() {
  const navigate = useNavigate();

  return (
    <button 
      className="ai-assistant-btn"
      onClick={() => navigate('/translation')}
      aria-label="AI Assistant"
    >
      <FaRobot /> AI Assistant
    </button>
  );
}

export default AIAssistantButton; 