import { useState } from "react"
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSentMessage = () => {
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    const sendMessage = async (message)=>{
        setLoading(true);
        try {
            const token = JSON.parse(localStorage.getItem('chat-user'))?.token;
            const res = await fetch(`http://localhost:8000/api/message/send/${selectedConversation._id}`,{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({message})
            });

            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setMessages([...messages,data]);
        } catch (error) {
            toast.error(error.msg);            
        } finally {
            setLoading(false);
        }    
    }
    return {sendMessage,loading}
}

export default useSentMessage
