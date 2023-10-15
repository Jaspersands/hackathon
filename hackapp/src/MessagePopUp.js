// MessagePopUp.js
import React, { useState } from 'react';
import './messagePopUp.css';
import supabase from './supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function MessagePopUp({ apartment, onClose }) {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const auth = useAuth();
  const {loggedIn } = useAuth();

  const toMessage = () => {
    navigate('/message');
  };

  const handleSendMessage = async () => {
    // Implement sending a new message
    if (newMessage.trim() !== '') {
      // Add your logic to send the message
      await supabase.from('messages').insert([
        {
          sender: loggedIn,  // Note: Make sure loggedIn is defined
          receiver: apartment.user_id,  // Assuming apartment has a listing_user_id property
          text: newMessage,
        },
      ]);

      // Clear the input field after sending the message
      onClose();  // Close the MessagePopUp
      navigate("/message");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div>
          <p>Prompt to send a message to the lister:</p>
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessagePopUp;
