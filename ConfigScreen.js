import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ConfigScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [serverAddress, setServerAddress] = useState('');

    const handleStartChat = () => {
        navigation.navigate('Chat', { username, serverAddress });
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
                placeholder="Enter server address"
                value={serverAddress}
                onChangeText={setServerAddress}
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
