const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-[3.8rem] rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" className="" />
            </div>
        </div>  
        <div className="chat-bubble text-[1.4rem] text-white bg-blue-500">Hi! What is Up?</div>    
        <div className="chat-footer opacity-50 text-xl flex gap-1 items-center">12:42</div>    
    </div>
  )
}

export default Message
