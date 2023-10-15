// Message.js

import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ConversationCard from './components/conversationcard';
import ApartmentPopup from './listingPopUp';
import "./index.css"
import { useAuth } from './AuthContext'; // Assuming you've created AuthContext.js

function Message() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const navigate = useNavigate();
    const auth = useAuth(); // Assuming AuthContext provides user information
    const { loggedIn } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let x = '_'
    useEffect(() => {
        
        // Check if the user is already logged in
        if (loggedIn == -1) {
        // Redirect or handle as needed
        // Example: Redirect to the home page
        navigate('/');
        }
    }, [auth]);

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
    }, []);

    if (loading) {
        return <p>Loading...</p>;  // You can replace this with a loading spinner or any other loading indicator
    }

    

    const fetchMessages = async () => {
        if(selectedConversation){
            //Implement fetching messages from your database (Supabase in this example)
            const [sender, receiver] = selectedConversation.split('_');
            const { data, error } = await supabase
                .from('messages')
                .select('*');
            const privateMes = [];
            data.forEach(message => {
                if ((message.sender == sender && message.receiver == receiver)|| (message.sender == receiver && message.receiver == sender)) {
                    privateMes.push(message);
                }
            });
            console.log(privateMes);
            setSelectedMessages(privateMes);
        }
    };


    const handleSendMessage = async () => {
        //Implement sending a new message to the selected conversation
        if (selectedConversation) {
            const [sender, receiver] = selectedConversation.split('_');
            await supabase.from('messages').insert([
                {
                    sender: loggedIn,
                    receiver: sender == loggedIn? receiver : sender,
                    text: newMessage,
                },
            ]);

            // Update the messages after sending a new message
            fetchMessages(selectedConversation);
            setNewMessage('');
        }
    };

    return (
        <div>
            <button className="back" onClick={back}>
            Back
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : conversations.length === 0 ? (
                <p>You have no messages.</p>
            ) : (
                <div>
                    <div className="conversation-list">
                        {conversations.map(conversation => (
                            <li key={conversation.conversationId} onClick={async () => {
                                await setSelectedConversation(conversation.conversationId);
                                await fetchMessages();
                            }}>
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
                </div>
            )}

            <div className="message-list">
                {selectedMessages && (
                    <div>
                        <h2>{selectedMessages[0].firstname + " " + selectedMessages[0].lastname}</h2>
                        {selectedMessages.map(message => (
                            <li key={message.id}>
                                {message.text}
                            </li>
                        ))}
                        <div>
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Message;
