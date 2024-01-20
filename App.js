import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from './ConfigScreen';
import RegistrationScreen from './RegistrationScreen';
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f7' }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#f2f2f7' },
            headerTintColor: '#000',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitleVisible: true,
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen name="Log In" component={ConfigScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
