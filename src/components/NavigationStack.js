import ChatScreen from "../screen/ChatScreen";
import ChatSelection from "../screen/ChatSelection";
import LoginScreen from "../screen/LoginScreen";
import SignUpScreen from "../screen/SignUpScreen";
import AllContacts from "../screen/AllContacts"

const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="AuthLogin" component={LoginScreen} />
          <Stack.Screen name="AuthSignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatSelection" component={ChatSelection} />
            <Stack.Screen name="ChatNav" component={ChatScreen} />
            <Stack.Screen name="AllContacts" component={AllContacts} />
        </Stack.Navigator>
    )
}

export {
    AuthStack,
    ChatStack
}