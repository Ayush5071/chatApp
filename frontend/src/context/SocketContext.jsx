import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:8000",{
                query:{
                    userId: authUser._id
                }
            });

            setSocket(newSocket);

            // socket.on() is used to listen to events.
             newSocket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })

            // Cleanup function to close the socket connection when the component unmounts
            return () => {
                if (newSocket) {
                    newSocket.close();
                }
            };
        } else {
            // Only try to close the socket if it exists
            if (socket) {
                socket.close();
            }
            setSocket(null);
        }
    }, [authUser]); // Add authUser as a dependency to rerun the effect when authUser changes

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
