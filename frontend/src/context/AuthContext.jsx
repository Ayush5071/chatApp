import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// we are using this hook to get access directly

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () =>{
    return useContext(AuthContext);
};

/// wrapping up the root elemnt where it is needed to get easy access to both the authuser,setauthuser 
export const AuthContextProvider = ({ children }) => {
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user"))||null)
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}        
    </AuthContext.Provider>
}