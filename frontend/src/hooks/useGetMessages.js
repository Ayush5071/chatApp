import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id){
                console.log("BS YHA SE GYA YAAAR");
                return;
            }
            setLoading(true);
            // console.log(selectedConversation._id);
            console.log(JSON.parse(localStorage.getItem("chat-user"))?.token);
            try {
                const token = JSON.parse(localStorage.getItem("chat-user"))?.token;
                const res = await fetch(`http://localhost:8000/api/message/${selectedConversation?._id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                // console.log("ye bhi ho gta");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages(); // Fetch messages when `selectedConversation` changes
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
