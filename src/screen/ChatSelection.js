import { signOut } from "firebase/auth";
import { collection, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChatContext } from "../hooks/ChatContext";
import { auth, storeDB } from "../utils/AuthenticationUtils";
import { AuthUserContext } from "../utils/AuthUserProvider";

const ChannelItem = ({props}) => {
    const { user } = useContext(AuthUserContext)
    const { dispatch } = useContext(ChatContext)

    const handleOnpress = () => {
        dispatch({type: "SET_CHAT", payload: props.item[1].userInfo});
        props.props.navigation.navigate("ChatNav");
    }
    const lastMessage = () =>{ 
        const textString = props.item[1].lastMessage ?
        (props.item[1].lastMessage.senderId == user.uid ? "You : "
            : `${props.item[1].userInfo.handle} : `) + props.item[1].lastMessage.text
        : "" 
        return textString;

    }
    return (
        <TouchableOpacity 
            style={styles.item}
            onPress={() => handleOnpress()}
        >
            <Text style={styles.textStyle}>{props.item[1].userInfo.handle}</Text>
            <Text style={styles.messageText}>{lastMessage()}</Text>
        </TouchableOpacity>
    )
}

const ChatSelection = props => {

    const [channels, setChannels] = useState([])
    const {user, setUser} = useContext(AuthUserContext)

    const navigateToAllContacts = () => {
        props.navigation.navigate('AllContacts')
    }

    const handleSignOut = () => {
        signOut(auth)
    }

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style = {{ marginRight: 10 }}
                    onPress = {handleSignOut}
                >
                    <Text>Log Out</Text>
                </TouchableOpacity>
            )
        })
    })


    useEffect(() => {
        const unSub = onSnapshot(doc(storeDB, "userChats", user.uid), docSnapshot => {
            var channelVals = Object.entries(docSnapshot.data())
            channelVals.sort((a , b) => b[1].date - a[1].date)
            setChannels(channelVals)
        })

        return () => unSub()
    }, [])

    return (
        <View>
            <FlatList 
                data={channels}
                renderItem={({item}) => <ChannelItem props={{item, props}} />}
            />
            <Button onPress={navigateToAllContacts} title="See all contacts"/>
        </View>
    );
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
    }
})

export default ChatSelection;