import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages: React.FC = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, 100);
  }, [messages]);

  const renderContent = () => {
    if (loading) {
      return [...Array(3)].map((_, key) => <MessageSkeleton key={key} />);
    }
    if (!messages.length) {
      return <p>Send a message to start a conversation</p>;
    }
    return messages.map((message) => (
      <div ref={lastMessageRef} key={message._id}>
        <Message message={message} />
      </div>
    ));
  };

  return (
    <div className="px-4 flex-1 overflow-auto max-h-[450px]">
      {renderContent()}
    </div>
  );
};

export default Messages;
