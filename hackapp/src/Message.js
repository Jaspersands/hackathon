// Message.js

import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import { useNavigate } from 'react-router-dom';
import ConversationCard from './components/conversationcard';
import "./message.css"
import { useAuth } from './AuthContext'; // Assuming you've created AuthContext.js

function Message() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState();
    const [selectedMessages, setSelectedMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();
    const auth = useAuth(); // Assuming AuthContext provides user information
    const { loggedIn } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("place");

    useEffect(() => {
        // Check if the user is already logged in
        if (loggedIn === -1) {
            // Redirect or handle as needed
            // Example: Redirect to the home page
            navigate('/');
        }
    }, [auth]);

    useEffect(() => {
        // This effect runs whenever selectedConversation changes
        if (selectedConversation) {
            // Fetch messages and title when selectedConversation changes
            fetchMessages();
            fetchTitle();
        }
    }, [selectedConversation]);

    function back() {
        navigate('/listings');
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .or(`sender.eq.${loggedIn}`, `receiver.eq.${loggedIn}`);

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    const dataWithConversationId = data.map(message => ({
                        ...message,
                        conversationId: `${Math.min(message.sender, message.receiver)}_${Math.max(message.sender, message.receiver)}`,
                    }));
                    const uniqueConversations = {};
                    dataWithConversationId.forEach(message => {
                        if (!uniqueConversations[message.conversationId] || message.created_at > uniqueConversations[message.conversationId].created_at) {
                            uniqueConversations[message.conversationId] = message;
                        }
                    });
                    const uniqueConversationsArray = Object.values(uniqueConversations);
                    setConversations(uniqueConversationsArray);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [loggedIn]);

    const fetchTitle = async () => {
        try {
            const [sender, receiver] = selectedConversation.split('_');
            const { data: user, error: emailError } = await supabase
                .from('users')
                .select('*')
                .eq('id', sender == loggedIn ? receiver : sender)
                .single();

            if (user) {
                setTitle(`${user.firstname} ${user.lastname}`);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchMessages = async () => {
        //setTimeout(250);
        console.log(selectedConversation);
        if (selectedConversation) {
            const [sender, receiver] = selectedConversation.split('_');
            const { data, error } = await supabase
                .from('messages')
                .select('*');
            const privateMes = [];
            data.forEach(message => {
                if ((message.sender == sender && message.receiver == receiver) || (message.sender == receiver && message.receiver == sender)) {
                    privateMes.push(message);
                }
            });
            console.log(privateMes);
            setSelectedMessages(privateMes);
        }
    };

    const handleSendMessage = async () => {
        if (selectedConversation) {
            const [sender, receiver] = selectedConversation.split('_');
            await supabase.from('messages').insert([
                {
                    sender: loggedIn,
                    receiver: sender == loggedIn ? receiver : sender,
                    text: newMessage,
                },
            ]);

            // Update the messages after sending a new message
            fetchMessages(selectedConversation);
            setNewMessage('');
        }
    };

    

    return (
        <div className="message-container">
            <div className="conversation-list-container">
                <button className="back" onClick={back}>
                    Back
                </button>
                {loading ? (
                    <p>Loading...</p>
                ) : conversations.length === 0 ? (
                    <p>You have no messages.</p>
                ) : (
                    <div className="conversation-list">
                        {conversations.map(conversation => (
                            <li
                                key={conversation.conversationId}
                                onClick={async() => {
                                     await setSelectedConversation(
                                        conversation.conversationId
                                    );
                                     
                                    
                                }}
                            >
                                <ConversationCard
                                    conversation={{
                                        text: conversation.text,
                                        sender: conversation.sender,
                                        receiver: conversation.receiver,
                                        created_at: conversation.created_at,
                                    }}
                                />
                            </li>
                        ))}
                    </div>
                )}
            </div>

            <div className="message-list-container">
                {selectedMessages && (
                    <div className="message-list">
                        <h2>
                            {title}
                        </h2>
                        {selectedMessages.map((message) => (
                            <li
                                key={message.id}
                                className={
                                    message.sender === loggedIn
                                        ? 'sent-message'
                                        : 'received-message'
                                }
                            >
                                {message.text}
                            </li>
                        ))}
                        <div>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e =>
                                    setNewMessage(e.target.value)
                                }
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Message;
