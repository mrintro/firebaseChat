import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { validateEmail, validatePassword } from "../utils/AuthenticationUtils"

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(validateEmail(email) && validatePassword(password)) {
            //login here
        }
    }

    return (
        <View>
            <Text>Login Screen</Text>
            <TextInput
                placeholder='Email'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder='Password'
                textContentType='password'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button onPress={handleLogin} title='Login' />
        </View>
    )
}

export default LoginScreen;