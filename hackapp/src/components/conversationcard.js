import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import supabase from '../supabase';

import './conversationcard.css';

function ConversationCard({ conversation }) {
  const [title, setTitle] = useState('');
  const auth = useAuth();
  const { loggedIn } = useAuth();
  const other = loggedIn === conversation.sender ? conversation.receiver : conversation.sender;
  const createdAtDate = new Date(conversation.created_at);
  let latest_mes = timeAgo(createdAtDate.getTime(), new Date().getTime());
  let text = conversation.text;

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const { data: user, error: emailError } = await supabase
          .from('users')
          .select('*')
          .eq('id', other)
          .single();

        if (user) {
          setTitle(`${user.firstname} ${user.lastname}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchTitle();
  }, [other]);

  function timeAgo(fromTimestamp, toTimestamp) {
    const timeDiff = toTimestamp - fromTimestamp;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }

  return (
    <div>
      <div className="card2">
        <p className="text2">{title}</p>
        <p className="semester2">{latest_mes}</p>
        <p className="price2">{text}</p>
      </div>
    </div>
  );
}

export default ConversationCard;
