import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screen/LoginScreen';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthLogin" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
