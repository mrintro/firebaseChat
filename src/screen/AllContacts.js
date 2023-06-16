import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChatContext } from "../hooks/ChatContext";
import { storeDB } from "../utils/AuthenticationUtils";
import { AuthUserContext } from "../utils/AuthUserProvider";

const ChannelItem = ({props}) => {
    const {user, setUser} = useContext(AuthUserContext)
    const { dispatch } = useContext(ChatContext)
    const item = props.item

    const handleContactPress = async (item) => {
        const channelId = user.uid > item.uid 
            ? user.uid + item.uid
            : item.uid + user.uid;
        const channels = await getDoc(doc(storeDB, "chats", channelId))
        if(!channels.exists()) {
            await setDoc(doc(storeDB, "chats", channelId), { messages: [] });
            await updateDoc(doc(storeDB, "userChats", user.uid), {
                [channelId + ".userInfo"] : {
                    uid : item.uid,
                    handle : item.handle
                },
                [channelId + ".date"] : serverTimestamp()
            })
            await updateDoc(doc(storeDB, "userChats", item.uid), {
                [channelId + ".userInfo"] : {
                    uid : user.uid,
                    handle : user.displayName
                },
                [channelId + ".date"] : serverTimestamp()
            })
        }
        dispatch({type: "SET_CHAT", payload: item});
        props.props.navigation.navigate("ChatNav");
    }

    return (
        <TouchableOpacity 
            style={styles.item}
            onPress = {() => handleContactPress(item)}
        >
            <Text style={styles.textStyle}>{item.handle}</Text>
        </TouchableOpacity>
    )
}



const AllContacts = props => {

    const [channels, setChannels] = useState([])
    const {user, setUser} = useContext(AuthUserContext)

    useEffect(() => {
        const docRef = getDocs(collection(storeDB, "users")).then(docSnapshot => {
            const channels = new Array()
            docSnapshot.forEach((doc) => {
                if(doc.data().uid != user.uid)
                    channels.push(doc.data())
            })
            setChannels(channels)
        })
    }, [])

    return (
        <View>
            <FlatList
                data={channels}
                renderItem={({item}) => <ChannelItem props={{item, props}} />}
            />
        </View>);
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
    }
})

export default AllContacts;