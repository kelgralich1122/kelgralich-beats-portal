
import React from "react";
import { Music } from "lucide-react";

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl"
  };
  
  const iconSizes = {
    small: 18,
    medium: 24,
    large: 32
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="bg-music-accent rounded-full p-2 flex items-center justify-center">
        <Music size={iconSizes[size]} className="text-white" />
      </div>
      <h1 className={`font-bold ${sizeClasses[size]} text-white`}>SoundWave</h1>
    </div>
  );
};

export default Logo;
