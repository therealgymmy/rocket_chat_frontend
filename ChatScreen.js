import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Avatar, Bubble } from 'react-native-gifted-chat';

const getColorBasedOnUsername = (username) => {
    // Simple hashing function to generate a color based on the username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = `hsl(${hash % 360}, 70%, 80%)`;
    return color;
};

const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    // Sender bubble color
                    backgroundColor: '#add8e6', // Lighter blue
                },
                left: {
                    // Receiver bubble color
                    backgroundColor: getColorBasedOnUsername(props.currentMessage.user.name),
                },
            }}
        />
    );
};

export default function ChatScreen({ route }) {
    const { username, serverAddress } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load existing messages from the server
        fetch(`http://${serverAddress}/messages`)
            .then(response => response.json())
            .then(data => {
                let formattedMessages = data.map(msg => ({
                    _id: Math.random().toString(36).substring(7),
                    text: msg.content,
                    createdAt: new Date(msg.timestamp),
                    user: {
                        _id: msg.username,
                        name: msg.username,
                    },
                }));
                formattedMessages = formattedMessages.sort((a, b) => b.createdAt - a.createdAt);
                setMessages(formattedMessages);
            })
            .catch(error => console.error(error));
    }, [serverAddress]);

    const onSend = useCallback((newMessages = []) => {
        console.log("New message:", newMessages);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        const message = newMessages[0];

        // Send the message to the server
        fetch(`http://${serverAddress}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                content: message.text,
                timestamp: message.createdAt.toISOString(),
            }),
        }).catch(error => console.error(error));
    }, [serverAddress, username]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: username,
                name: username,
            }}
            renderBubble={renderBubble}
        />
    );
}
