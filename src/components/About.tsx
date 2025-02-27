
import { Music2, Headphones, Speaker, Wave } from "lucide-react";
import { aboutContent } from "@/utils/musicData";

const About = () => {
  return (
    <section className="py-24 px-4 bg-music-dark" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Kelgralich in studio" 
                  className="w-full h-full object-cover filter brightness-90 animate-scale-in"
                />
              </div>
              
              <div className="absolute -bottom-10 -right-10 p-5 glass-effect rounded-xl max-w-xs animate-fade-in">
                <p className="text-sm italic text-gray-300">"{aboutContent.quote}"</p>
              </div>
              
              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full glass-effect flex items-center justify-center animate-rotate-center">
                <div className="w-10 h-10 rounded-full bg-music-accent flex items-center justify-center">
                  <Music2 size={18} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-music-accent/10 text-music-accent mb-4 inline-block">
              ABOUT
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Kelgralich</h2>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {aboutContent.bio}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-music-accent/10 flex items-center justify-center">
                  <Headphones size={18} className="text-music-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Immersive Sound Design</h3>
                  <p className="text-sm text-gray-400">Creating unique sonic landscapes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-music-accent/10 flex items-center justify-center">
                  <Speaker size={18} className="text-music-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Precision Mixing</h3>
                  <p className="text-sm text-gray-400">Balanced and clear audio production</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-music-accent/10 flex items-center justify-center">
                  <Wave size={18} className="text-music-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Rhythmic Innovation</h3>
                  <p className="text-sm text-gray-400">Pushing boundaries with unique patterns</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-2">Influences</h3>
              <div className="flex flex-wrap gap-2">
                {aboutContent.influences.map((influence, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300"
                  >
                    {influence}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-music-accent to-music-highlight text-white font-medium hover:shadow-lg hover:shadow-music-accent/20 transition-all duration-300 transform hover:scale-105">
              Connect with Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
