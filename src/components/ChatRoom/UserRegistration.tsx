
import React, { useState } from "react";
import { Music } from "lucide-react";

interface UserRegistrationProps {
  onRegister: (name: string, phoneNumber: string) => void;
}

const UserRegistration = ({ onRegister }: UserRegistrationProps) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError("Please enter your name");
      isValid = false;
    } else {
      setNameError("");
    }
    
    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneNumber.trim()) {
      setPhoneError("Please enter your phone number");
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      setPhoneError("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneError("");
    }
    
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onRegister(name, phoneNumber);
    }
  };
  
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-music-darker to-black rounded-lg border border-white/10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-music-accent rounded-full p-3 flex items-center justify-center">
            <Music size={40} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Join the SoundWave Chat</h1>
        <p className="text-gray-400 text-center mb-8">Connect with music lovers from around the world</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-white/5 border ${
                nameError ? 'border-red-500' : 'border-white/10'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-music-accent`}
              placeholder="Enter your name"
            />
            {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full bg-white/5 border ${
                phoneError ? 'border-red-500' : 'border-white/10'
              } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-music-accent`}
              placeholder="+1 234 567 8900"
            />
            {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-music-accent text-white rounded-lg py-3 font-medium hover:bg-music-accent/90 transition-colors"
          >
            Join Chat
          </button>
        </form>
        
        <p className="text-gray-400 text-xs text-center mt-6">
          By joining, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;
