
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatRoom from "@/components/ChatRoom";

const Chat = () => {
  return (
    <div className="bg-gradient-to-b from-music-darker to-music-dark min-h-screen text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="pt-10 pb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Music Chat Room</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Connect with other music lovers, share your thoughts, and discuss your favorite tracks
            in our live chat room.
          </p>
        </div>
        
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 mb-10">
          <ChatRoom />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chat;
