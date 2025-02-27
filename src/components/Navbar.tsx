
import { useState, useEffect } from "react";
import { Menu, X, Music } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { title: "Home", href: "#" },
    { title: "Tracks", href: "#tracks" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" }
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 glass-effect' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-music-accent flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Kelgralich</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className="text-sm text-gray-300 hover-link hover:text-white transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
        </nav>
        
        <button className="hidden md:block px-6 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
          Listen Now
        </button>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-50 bg-music-darker transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-12">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-music-accent flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Kelgralich</span>
            </a>
            
            <button 
              className="text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 items-center my-auto">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-2xl font-medium text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            ))}
            
            <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-music-accent to-music-highlight text-white font-medium transition-all duration-300">
              Listen Now
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
