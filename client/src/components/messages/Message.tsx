import React from "react";
import { TResponseSendMessageData } from "../../types";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConvesation";
import { extractTime } from "../../utils/extractTime";

type MessageProps = {
  message: TResponseSendMessageData;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const { userData } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === userData?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? userData.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt)  

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="User avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
