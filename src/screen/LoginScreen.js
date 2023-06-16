import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
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
            <TextInput
                style = {styles.inputText}
                placeholder='Email'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style = {styles.inputText}
                placeholder='Password'
                textContentType='password'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button style={styles.buttonStyle} onPress={handleLogin} title='Login' />
            <Button style={styles.buttonStyle} onPress={() => {props.navigation.navigate('AuthSignUp')}} title='SignUp' />
        </View>
    )
}

const styles = StyleSheet.create({
    item : {
        height: "auto",
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1
    },
    textStyle : {
        color: '#000',
        fontSize: 20
    },
    messageText : {
        color: '#000',
        fontSize: 16
    },
    inputText: {
        padding: 4,
        fontSize: 16,
        margin : 8,
        borderWidth: 0.5
    },
    buttonStyle: {
        marginBottom: 20
    }
})

export default LoginScreen;