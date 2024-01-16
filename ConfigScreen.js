import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

// Function to send login request
async function loginUser(username, password, serverAddress) {
    const response = await fetch(`http://${serverAddress}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
    return data.Ok;
}

export default function ConfigScreen({ navigation }) {
    const [username, setUsername] = useState('beyondsora');
    const [password, setPassword] = useState('123');
    const [serverAddress, setServerAddress] = useState('0.0.0.0:8000');
    const [chatroom, setChatroom] = useState('default');

    const handleStartChat = () => {
        loginUser(username, password, serverAddress)
            .then(token => {
                console.log("Got token: ", token);
                navigation.navigate('Chat', { username, token, serverAddress, chatroom });
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter server address"
                value={serverAddress}
                onChangeText={setServerAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter chat room"
                value={chatroom}
                onChangeText={setChatroom}
            />
            <Button title="Start Chat" onPress={handleStartChat} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        padding: 10,
    },
});
