import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
    const [serverAddress, setServerAddress] = useState('192.168.1.62:8000');
    const [email, setEmail] = useState('gymmy@random.com');
    const [username, setUsername] = useState('beyondsora');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        fetch(`http://${serverAddress}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.Err != undefined) {
                    setErrorMessage('Could not register user: ' + response.Err);
                } else {
                    setErrorMessage('');
                    navigation.navigate('Config');
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter server address"
                value={serverAddress}
                onChangeText={setServerAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

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

export default RegistrationScreen;