
export interface Track {
  id: string;
  title: string;
  duration: string;
  releaseDate: string;
  audioSrc: string;
  coverArt: string;
  description?: string;
  artist?: string;
  producer?: string;
}

// Helper function to create GitHub raw content URLs
export const createGithubRawUrl = (username: string, repo: string, branch: string, path: string): string => {
  return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${path}`;
};

// Convert Google Drive shareable link to direct download link
export const convertGoogleDriveLink = (shareableLink: string): string => {
  // Extract the file ID from the shareable link
  const match = shareableLink.match(/\/d\/([^\/]+)/);
  if (!match || !match[1]) return shareableLink;
  
  // Create a direct download link with the file ID
  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
};

// Example of a track with Google Drive-hosted audio file
export const tracks: Track[] = [
  {
    id: "track-1",
    title: "Universal Sound",
    duration: "4:28",
    releaseDate: "2024-04-03",
    audioSrc: convertGoogleDriveLink("https://drive.google.com/file/d/1-HiP-UyYPDz-TG1dMyjl10L6aBYesN2a/view?usp=drivesdk"),
    coverArt: "https://images.unsplash.com/photo-1583173451851-330156818a9d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "An immersive soundscape with deep electronic vibes and atmospheric elements.",
    artist: "Kelgralich",
    producer: "Kelgralich"
  },
  {
    id: "track-2",
    title: "Siwezi",
    duration: "3:45", // Approximate duration
    releaseDate: "2024-04-03",
    audioSrc: convertGoogleDriveLink("https://drive.google.com/file/d/1-22VCvH1i0r_MkhZzYq6wtlRpwGuw3ID/view?usp=drivesdk"),
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    description: "A vibrant and rhythmic track with captivating beats.",
    artist: "Dvanny",
    producer: "Kelgralich"
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
