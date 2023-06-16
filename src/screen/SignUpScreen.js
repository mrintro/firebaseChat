import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth, storeDB, validateEmail, validatePassword } from "../utils/AuthenticationUtils"

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handle, setHandle] = useState('');

    const handleSignUp = () => {
        if(validateEmail(email) && validatePassword(password)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    updateProfile(userCredentials.user, {
                        displayName: handle
                    })
                    setDoc(doc( storeDB, "users" , userCredentials.user.uid), {
                        uid: userCredentials.user.uid,
                        handle,
                        email
                    }).catch((error) => {
                        console.log(`db error : ${error}`)
                    })
                    setDoc(doc( storeDB, "userChats" , userCredentials.user.uid), {})
                    .catch((error) => {
                        console.log(`db error : ${error}`)
                    })
                })
                .catch((error) => {
                    console.log(error)
                    alert(error.message)
                })
        }
    }

    return (
        <View>
            <TextInput
                style = {styles.inputText}
                placeholder="handle"
                keyboardType='default'
                value={handle}
                onChangeText={text => setHandle(text)}
            />
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
            <Button onPress={handleSignUp} title='Register' />
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


export default SignUpScreen;