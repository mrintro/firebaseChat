import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore"
import { GiftedChat } from "react-native-gifted-chat"
import { storeDB } from "../utils/AuthenticationUtils"

const { useState, useEffect } = require("react")

const ChatScreen = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const collectionRef = collection(storeDB, 'chatApp');
        const queryRef = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(queryRef, querySnapshot => {
            console.log(querySnapshot.docs)
        })

        return () => unsubscribe
    }, [])

    return (
        <GiftedChat
            messages={messages}
        />
    )

}

export default ChatScreen;