import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigScreen from './ConfigScreen';
import ChatScreen from './ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Config" component={ConfigScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
