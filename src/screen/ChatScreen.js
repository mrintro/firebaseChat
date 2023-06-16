import { addDoc, arrayUnion, collection, doc, onSnapshot, orderBy, query, QuerySnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { GiftedChat } from "react-native-gifted-chat"
import { ChatContext } from "../hooks/ChatContext"
import { storeDB } from "../utils/AuthenticationUtils"
import { AuthUserContext } from "../utils/AuthUserProvider"

const { useState, useEffect, useContext, useCallback } = require("react")

const ChatScreen = () => {
    const [messages, setMessages] = useState([])
    const { user } = useContext(AuthUserContext)
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const collectionRef = collection(storeDB, 'chats');
        // const queryRef = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(doc(storeDB, 'chats', data.chatId), docSnapshot => {
            try {
                docSnapshot.exists() && setMessages(
                    docSnapshot.data().messages.map(doc => ({
                        _id: doc._id,
                        createdAt: doc.createdAt.toDate(),
                        text: doc.text,
                        user: doc.user
                    })).reverse()
                )
            } catch{
                console.log("No Data")
            }
        })

        return () => unsubscribe()
    }, [data.chatId])

    const onSend = useCallback(async (messages = []) => {
        const { _id, createdAt, text, user } = messages[0]
        await updateDoc(doc(storeDB, "chats", data.chatId), {
            messages: arrayUnion({
                _id, createdAt, text, user
            })
        }).catch((error) => {
            console.log(`db error : ${error}`)
        })
        await updateDoc(doc(storeDB, "userChats", user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
                senderId: user.uid
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(storeDB, "userChats", data.chatUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
                senderId: user.uid
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            renderAvatar={null}
            user={{
                _id: user.uid,
                uid: user.uid,
                handle: user.displayName,
                email: user.email
            }}
        />
    )

}

export default ChatScreen;