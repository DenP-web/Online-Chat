import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations: React.FC = () => {
  const { conversations, loading } = useGetConversation();

  if (!conversations) {
    return <span className="spinner loading-spinner" />;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        conversations.map((conversation, index) => (
          <Conversation
            key={conversation._id}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1}
            conversation={conversation}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
