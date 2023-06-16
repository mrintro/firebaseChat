import { updateCurrentUser } from "firebase/auth";
import { AuthUserContext } from "../utils/AuthUserProvider";

const { createContext, useState, useContext, useReducer } = require("react");

const ChatContext = createContext({});

const ChatContextProvider = ({children}) => {

    const { user } = useContext(AuthUserContext);

    const INITIAL_STATE = {
        chatId: "null",
        chatUser: {}
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "SET_CHAT":
                return {
                    chatUser: action.payload,
                    chatId: user.uid > action.payload.uid 
                            ? user.uid + action.payload.uid
                            : action.payload.uid + user.uid
                }
            default : return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}

export { 
    ChatContextProvider, 
    ChatContext,
};