import useGetConversations from "../hooks/useGetConversation";
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-hidden">
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
                
    </div>
  )
}

export default Conversations
