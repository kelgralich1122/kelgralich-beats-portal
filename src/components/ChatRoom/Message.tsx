
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ChatMessage } from "./index";

interface MessageProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

const Message = ({ message, isOwnMessage }: MessageProps) => {
  const { user, text, timestamp } = message;
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  // Special styling for system messages
  if (user.id === "system") {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-music-accent/10 text-gray-300 px-4 py-2 rounded-full text-sm">
          {text}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] ${isOwnMessage ? "order-2" : "order-1"}`}>
        {!isOwnMessage && (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white mb-1 ml-1"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
          {!isOwnMessage && (
            <span className="text-sm text-gray-400 ml-2">{user.name}</span>
          )}
          
          <div 
            className={`rounded-2xl px-4 py-2 ${
              isOwnMessage 
                ? "bg-music-accent text-white rounded-br-none" 
                : "bg-white/10 text-white rounded-bl-none"
            }`}
          >
            {text}
          </div>
          
          <span className="text-xs text-gray-400 mt-1 mx-2">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
