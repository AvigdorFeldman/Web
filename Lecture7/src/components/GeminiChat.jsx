import React, { useState } from 'react';
import { Send, Loader2, Bot, User, AlertCircle } from 'lucide-react';

// NOTE: In a real application, NEVER expose your API key in client-side code!
// This is for demonstration purposes only. Use a backend proxy in production.
const DEMO_MODE = false; // Set to false and add your API key to test with real Gemini

export default function GeminiChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m powered by Gemini AI. Ask me anything! (This is a demo - add your API key to connect to real Gemini)'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Simulated AI response for demo
  const getDemoResponse = (userInput) => {
    const responses = {
      'hello': 'Hello! How can I help you today?',
      'hi': 'Hi there! What would you like to know?',
      'how are you': 'I\'m doing great! Thanks for asking. How can I assist you?',
      'what can you do': 'I can help with various tasks like answering questions, explaining concepts, writing code, and more!',
      'default': `I received your message: "${userInput}". In demo mode, I provide simulated responses. Add your Gemini API key to get real AI responses!`
    };

    const lowerInput = userInput.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  // Real Gemini API call
  const callGeminiAPI = async (userInput) => {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    
    try {
      const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: userInput
            }]
          }]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let aiResponse;
      
      if (DEMO_MODE || !apiKey) {
        // Demo mode - simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        aiResponse = getDemoResponse(input);
      } else {
        // Real API call
        aiResponse = await callGeminiAPI(input);
      }

      const assistantMessage = {
        role: 'assistant',
        content: aiResponse
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `❌ Error: ${error.message}. Please check your API key and try again.`
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Bot size={32} />
          Gemini AI Chat Demo
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.9rem'
        }}>
          A React integration example
        </p>
        
        {/* API Key Toggle */}
        <button
          onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {showApiKeyInput ? '🔒 Hide API Key' : '🔑 Add Real API Key'}
        </button>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div style={{
            marginTop: '15px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'left'
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.85rem',
              marginBottom: '8px'
            }}>
              Enter your Gemini API Key:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.9rem'
              }}
            />
            <p style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: '8px',
              marginBottom: '0'
            }}>
              Get your free API key at: <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'white', textDecoration: 'underline' }}
              >
                Google AI Studio
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Chat Container */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '600px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: msg.role === 'user' 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {msg.role === 'user' ? (
                  <User size={20} color="white" />
                ) : (
                  <Bot size={20} color="white" />
                )}
              </div>

              {/* Message Bubble */}
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '16px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f1f3f5',
                color: msg.role === 'user' ? 'white' : '#1a1a1a',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                wordWrap: 'break-word'
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="white" />
              </div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '16px',
                background: '#f1f3f5',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <Loader2 size={16} className="spin" />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  Thinking...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSend}
          style={{
            padding: '20px',
            borderTop: '1px solid #e9ecef',
            background: '#f8f9fa',
            display: 'flex',
            gap: '12px'
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #dee2e6',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: loading || !input.trim() 
                ? '#dee2e6' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {loading ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
            Send
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.85rem',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Demo Mode:</strong> This example uses simulated responses. To connect to real Gemini AI:
          <ol style={{ marginTop: '8px', marginBottom: '0', paddingLeft: '20px' }}>
            <li>Click "Add Real API Key" above</li>
            <li>Get a free API key from Google AI Studio</li>
            <li>Paste your key and start chatting!</li>
          </ol>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
