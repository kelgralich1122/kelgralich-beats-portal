
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import UserRegistration from "./UserRegistration";

export interface ChatUser {
  id: string;
  name: string;
  phoneNumber: string;
  avatarColor: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  user: ChatUser;
}

const getRandomColor = () => {
  const colors = [
    "#9b87f5", "#6d48e5", "#4dabf7", "#38d9a9", 
    "#f783ac", "#e599f7", "#ffa94d", "#a9e34b"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ChatRoom = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    const storedUser = localStorage.getItem('chatUser');
    
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to parse stored messages:", error);
      }
    }
    
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    
    // Simulate some online users
    const demoUsers = [
      { id: "demo-1", name: "Sophia", phoneNumber: "+1234567890", avatarColor: "#9b87f5" },
      { id: "demo-2", name: "James", phoneNumber: "+0987654321", avatarColor: "#38d9a9" },
      { id: "demo-3", name: "Maya", phoneNumber: "+1122334455", avatarColor: "#ffa94d" }
    ];
    setOnlineUsers(demoUsers);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('chatUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Auto scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!currentUser || !text.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      timestamp: new Date(),
      user: currentUser
    };

    setMessages([...messages, newMessage]);
  };

  const handleUserRegister = (name: string, phoneNumber: string) => {
    const newUser: ChatUser = {
      id: `user-${Date.now()}`,
      name,
      phoneNumber,
      avatarColor: getRandomColor()
    };
    
    setCurrentUser(newUser);
    setOnlineUsers([...onlineUsers, newUser]);
    
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      text: `Welcome to the chat, ${name}! 👋`,
      timestamp: new Date(),
      user: {
        id: "system",
        name: "System",
        phoneNumber: "",
        avatarColor: "#6c757d"
      }
    };
    
    setMessages([...messages, welcomeMessage]);
  };

  if (!currentUser) {
    return <UserRegistration onRegister={handleUserRegister} />;
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-120px)] bg-music-darker rounded-lg overflow-hidden border border-white/10">
      {/* Header */}
      <div className="bg-music-accent/20 p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">SoundWave Chat</h2>
        <div className="text-sm text-gray-300">{onlineUsers.length} online users</div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <Message 
              key={message.id} 
              message={message} 
              isOwnMessage={message.user.id === currentUser.id} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Users sidebar */}
        <div className="hidden lg:block w-64 bg-black/30 border-l border-white/10 p-4 overflow-y-auto">
          <h3 className="text-white font-medium mb-3">Online Users</h3>
          <ul className="space-y-2">
            {onlineUsers.map(user => (
              <li key={user.id} className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: user.avatarColor }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-white text-sm">{user.name}</div>
                  <div className="text-gray-400 text-xs">{user.phoneNumber}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Input area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
