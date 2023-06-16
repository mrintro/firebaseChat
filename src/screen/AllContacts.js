import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { storeDB } from "../utils/AuthenticationUtils";
import { AuthUserContext } from "../utils/AuthUserProvider";

const ChannelItem = ({item}) => {
    const {user, setUser} = useContext(AuthUserContext)
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



const AllContacts = () => {

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
                renderItem={({item}) => <ChannelItem item={item} />}
            />
        </View>);
}



const styles = StyleSheet.create({
    item : {
        backgroundColor: '#f9c2ff',
        height: 40,
        marginTop: 8,
        marginBottom: 8
    },
    textStyle : {
        color: '#000',
        fontSize: 20
    }
})

export default AllContacts;