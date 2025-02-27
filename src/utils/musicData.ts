
export interface Track {
  id: string;
  title: string;
  duration: string;
  releaseDate: string;
  audioSrc: string;
  coverArt: string;
  description?: string;
}

export const tracks: Track[] = [
  {
    id: "track-1",
    title: "Midnight Groove",
    duration: "3:42",
    releaseDate: "2023-12-10",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "A smooth beat with deep bass and atmospheric synths."
  },
  {
    id: "track-2",
    title: "Urban Lights",
    duration: "4:15",
    releaseDate: "2023-11-05",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "Upbeat rhythm with electronic elements and urban vibes."
  },
  {
    id: "track-3",
    title: "Crystal Flow",
    duration: "3:28",
    releaseDate: "2023-10-15",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "Melodic beats with crystalline sounds and flowing rhythms."
  },
  {
    id: "track-4",
    title: "Electric Dreams",
    duration: "5:10",
    releaseDate: "2023-09-22",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "Dreamy synths with electric undertones and steady beats."
  },
  {
    id: "track-5",
    title: "Nebula Rhythm",
    duration: "4:32",
    releaseDate: "2023-08-18",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "Cosmic sounds with rhythmic patterns inspired by space."
  },
  {
    id: "track-6",
    title: "Velvet Night",
    duration: "3:55",
    releaseDate: "2023-07-30",
    audioSrc: "",
    coverArt: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "Smooth night vibes with velvet textures and gentle beats."
  }
];

export const aboutContent = {
  name: "Kelgralich",
  bio: "Kelgralich is an independent music producer specializing in electronic, ambient, and lo-fi beats. With a passion for creating immersive soundscapes and rhythmic patterns, Kelgralich has been producing music for over 5 years, constantly evolving and experimenting with new sounds and techniques.",
  location: "Los Angeles, CA",
  influences: ["Bonobo", "Flying Lotus", "Tycho", "Four Tet", "Burial"],
  quote: "Music is the universal language that connects souls across the universe."
};

export const socialLinks = {
  spotify: "#",
  soundcloud: "#",
  instagram: "#",
  twitter: "#",
  youtube: "#",
};
