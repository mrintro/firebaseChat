import { collection, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { storeDB } from "../utils/AuthenticationUtils";
import { AuthUserContext } from "../utils/AuthUserProvider";

const ChannelItem = ({item}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.textStyle}>{item[1].userInfo.handle}</Text>
        </View>
    )
}

const ChatSelection = props => {

    const [channels, setChannels] = useState([])
    const {user, setUser} = useContext(AuthUserContext)

    const navigateToAllContacts = () => {
        props.navigation.navigate('AllContacts')
    }


    useEffect(() => {
        const unSub = onSnapshot(doc(storeDB, "userChats", user.uid), docSnapshot => {
            setChannels(Object.entries(docSnapshot.data()))
        })

        return () => unSub()
    }, [])

    return (
        <View>
            <FlatList 
                data={channels}
                renderItem={({item}) => <ChannelItem item={item} />}
            />
            <Button onPress={navigateToAllContacts} title="See all contacts"/>
        </View>
    );
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

export default ChatSelection;