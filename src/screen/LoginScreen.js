import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth, validateEmail, validatePassword } from "../utils/AuthenticationUtils"

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(validateEmail(email) && validatePassword(password)) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    console.log('Signup success')
                    console.log(userCredentials)
                })
                .catch((error) => {
                    alert(error.message)
                })
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
            <Button onPress={() => {props.navigation.navigate('AuthSignUp')}} title='SignUp' />
        </View>
    )
}

export default LoginScreen;