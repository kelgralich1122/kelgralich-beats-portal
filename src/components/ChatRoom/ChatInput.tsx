
import React, { useState } from "react";
import { Send, Mic, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-white/10 p-3 bg-black/30"
    >
      <div className="flex items-center gap-2">
        <button 
          type="button" 
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5"
          title="Add attachment"
        >
          <Paperclip size={20} />
        </button>
        
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/5 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-music-accent"
        />
        
        <button 
          type="button" 
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5"
          title="Add emoji"
        >
          <Smile size={20} />
        </button>
        
        <button 
          type="button" 
          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5"
          title="Voice message"
        >
          <Mic size={20} />
        </button>
        
        <button 
          type="submit" 
          className="bg-music-accent text-white p-2 rounded-full hover:bg-music-accent/80"
          title="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
