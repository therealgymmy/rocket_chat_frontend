import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load existing messages from the server
    // fetch('http://<your-server-ip>:8000/messages')
    fetch('http://127.0.0.1:8000/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data.map(m => ({
          _id: Math.random().toString(36).substring(7),
          text: m.content,
          createdAt: new Date(),
          user: {
            _id: m.username,
            name: m.username,
          },
        })));
      });
  }, []);

  const onSend = (newMessages = []) => {
    console.log(newMessages);
    setMessages(GiftedChat.append(messages, newMessages));
    // Send the message to the server
    fetch('http://127.0.0.1:8000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newMessages[0].user._id,
        content: newMessages[0].text,
      }),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 'user1', // The ID of the local user
      }}
    />
  );
}
