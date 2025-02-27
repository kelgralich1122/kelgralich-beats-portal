
import { Music, Instagram, Twitter, Youtube, Headphones } from "lucide-react";
import { socialLinks } from "@/utils/musicData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-music-darker pt-20 pb-10 px-4" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-music-accent flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Kelgralich</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Creating immersive soundscapes and rhythmic patterns for the modern listener.
            </p>
            
            <div className="flex gap-4">
              <a 
                href={socialLinks.instagram} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={socialLinks.twitter} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={socialLinks.youtube} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href={socialLinks.soundcloud} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="SoundCloud"
              >
                <Headphones size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#tracks" className="text-gray-400 hover:text-white transition-colors">Tracks</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <p className="text-gray-400 mb-6">
              For bookings, collaborations, or any inquiries, feel free to reach out.
            </p>
            
            <a 
              href="mailto:contact@kelgralichbeats.com" 
              className="inline-block px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm"
            >
              contact@kelgralichbeats.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Kelgralich Beats. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
