import ChatScreen from "../screen/ChatScreen";
import LoginScreen from "../screen/LoginScreen";
import SignUpScreen from "../screen/SignUpScreen";

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
            <Stack.Screen name="ChatNav" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export {
    AuthStack,
    ChatStack
}