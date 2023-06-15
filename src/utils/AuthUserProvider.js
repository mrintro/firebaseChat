const { createContext, useState } = require("react");

const AuthUserContext = createContext({});

const AuthUserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    return (
        <AuthUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthUserContext.Provider>
    )
}

export { 
    AuthUserProvider, 
    AuthUserContext,
};