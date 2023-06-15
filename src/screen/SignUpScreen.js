import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth, validateEmail, validatePassword } from "../utils/AuthenticationUtils"

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handle, setHandle] = useState('');

    const handleSignUp = () => {
        if(validateEmail(email) && validatePassword(password)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
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
                placeholder="handle"
                keyboardType='default'
                value={handle}
                onChangeText={text => setHandle(text)}
            />
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
            <Button onPress={handleSignUp} title='Register' />
        </View>
    )
}

export default SignUpScreen;