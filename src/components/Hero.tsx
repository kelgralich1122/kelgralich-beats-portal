
import { useState, useEffect } from "react";
import { Music } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-pattern px-4">
      <div 
        className={`absolute top-10 right-10 w-64 h-64 rounded-full bg-music-accent/20 filter blur-3xl animate-float transition-opacity duration-3000 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
      ></div>
      <div 
        className={`absolute bottom-20 left-10 w-48 h-48 rounded-full bg-music-highlight/20 filter blur-3xl animate-float animation-delay-1000 transition-opacity duration-3000 ${isVisible ? 'opacity-40' : 'opacity-0'}`}
      ></div>
      
      <div className="max-w-7xl w-full text-center z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Music className="w-6 h-6 text-music-accent" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="text-gradient">Kelgralich</span>
            <span className="text-white"> Beats</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Immersive soundscapes and rhythmic patterns for the modern listener
          </p>
          
          <div className="audio-wave mb-12">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-music-accent to-music-highlight text-white font-medium hover:shadow-lg hover:shadow-music-accent/20 transition-all duration-300 transform hover:scale-105">
              Listen Now
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300">
              Explore Tracks
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/60"
        >
          <path 
            d="M12 5V19M12 19L5 12M12 19L19 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
