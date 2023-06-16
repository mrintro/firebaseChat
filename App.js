import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import {AuthUserContext, AuthUserProvider} from './src/utils/AuthUserProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/utils/AuthenticationUtils';
import { AuthStack, ChatStack } from './src/components/NavigationStack';
import { ChatContext, ChatContextProvider } from './src/hooks/ChatContext';

const Stack = createStackNavigator();


function RootNavigation() {

  const {user, setUser} = useContext(AuthUserContext)

  function onAuthStateChange() {

    return onAuthStateChanged(
          auth,
          authUser => {
            console.log(authUser)
            if(authUser) setUser(authUser)
            else setUser(null)
          }
      )
  }

  useEffect(() => {
    const unsubscribeUser = onAuthStateChange()
    return () => unsubscribeUser;
  }, [])

  return(
    <NavigationContainer>
      { user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

function App() {

  return (
    <AuthUserProvider>
      <ChatContextProvider>
        <RootNavigation />
      </ChatContextProvider>
    </AuthUserProvider>
  );
}


export default App;
