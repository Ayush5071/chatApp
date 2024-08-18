import { useAuthContext } from "../context/AuthContext"
import useConversation from "../store/useConversation";

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  console.log("message sender",)
  const fromMe = message.senderId === authUser._id;
  const ChatClassName = fromMe ? 'chat-end' :  'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  return (
    <div className={`chat ${ChatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-[3.8rem] rounded-full">
                <img src={profilePic} alt="" className="" />
            </div>
        </div>  
        <div className={`chat-bubble text-[1.4rem] text-white ${bubbleBgColor}`}>{message.message}</div>    
        <div className="chat-footer opacity-50 text-xl flex gap-1 items-center">{message.createdAt}</div>    
    </div>
  )
}

export default Message
