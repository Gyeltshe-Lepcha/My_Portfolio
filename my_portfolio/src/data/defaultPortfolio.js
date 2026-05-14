export const defaultPortfolio = {
  owner: {
    id: "default",
    name: "Lepcha",
    username: "lepcha",
    slug: "lepcha",
    publicIdentifier: "lepcha",
  },
  profile: {
    displayName: "Lepcha",
    headline: "Engineering student and full-stack learner",
    bio: "I am an eager learner and engineering student with foundational knowledge in IoT, AI, machine learning, and full-stack development.",
    location: "Bhutan",
    avatarUrl: "/profile.png",
  },
  hero: {
    eyebrow: "HELLO",
    title: "I AM",
    highlighted: "LEPCHA",
    subtitle:
      "I am an eager learner and engineering student with foundational knowledge in IoT, AI, machine learning, and full-stack development. Experienced in lab-based projects and passionate about applying skills in real-world environments. Approaches challenges as opportunities to grow, with a strong interest in integrating hardware and software systems. I am good at problem-solving, teamwork, and adapting to new technologies, with a strong drive to take on hands-on engineering tasks.",
    primaryCta: "Achievements",
    secondaryCta: "GET CV",
    imageUrl: "/profile.png",
    badgeLabel: "Expertise",
    badgeTitle: "Tech Pro",
  },
  services: [
    {
      id: "mobile-development",
      icon: "📱",
      title: "Mobile Development",
      description: "Building cross-platform mobile applications using Flutter and Dart.",
    },
    {
      id: "ui-ux-design",
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces for mobile applications.",
    },
    {
      id: "clean-code",
      icon: "💻",
      title: "Clean Code",
      description: "Ensuring high performance, scalability, and maintainability of the codebase.",
    },
  ],
  about: {
    title: "About Me",
    details: [
      { label: "Name", value: "Lepcha" },
      { label: "Studies", value: "College of Science and Technology" },
      { label: "Location", value: "Bhutan" },
    ],
    abilities: ["Coding", "Flutter", "Dart", "Firebase", "UI/UX Design", "Mobile Development"],
    experience: ["Developing Mobile Apps", "UI/UX Prototyping", "CS Student Projects"],
    progress: ["Core Engineering Sciences", "Algorithm Design", "User-Centric Applications"],
  },
  projects: [
    {
      id: "project-1",
      title: "Project 1",
      description: "A brief description of project 1 and its key features.",
      tags: ["FLUTTER", "DART", "FIREBASE"],
      imageUrl: "https://source.unsplash.com/random/400x300?tech,1",
    },
    {
      id: "project-2",
      title: "Project 2",
      description: "An advanced analytics dashboard for business management.",
      tags: ["REACT", "TYPESCRIPT", "TAILWIND"],
      imageUrl: "https://source.unsplash.com/random/400x300?tech,2",
    },
    {
      id: "project-3",
      title: "Project 3",
      description: "Real-time messaging application with end-to-end encryption.",
      tags: ["NODE.JS", "SOCKET.IO", "FLUTTER"],
      imageUrl: "https://source.unsplash.com/random/400x300?tech,3",
    },
  ],
  education: [
    {
      id: "btech",
      title: "Bachelor of Technology in Computer Science",
      organization: "University Name",
      period: "2020 - 2024",
      description: "Specialized in Mobile Application Development and Web Technologies.",
      actionLabel: "View Details →",
    },
    {
      id: "higher-secondary",
      title: "Higher Secondary Education",
      organization: "College Name",
      period: "2018 - 2020",
      description: "Major in Computer Science with Mathematics and Physics.",
      actionLabel: "View Details →",
    },
  ],
  gallery: Array.from({ length: 12 }, (_, index) => ({
    id: `gallery-${index + 1}`,
    url: `https://picsum.photos/400/300?random=${index + 1}`,
    alt: `Gallery image ${index + 1}`,
  })),
  contact: {
    title: "Ready to start a project?",
    description:
      "I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
    primaryCta: "Send an Email",
    secondaryCta: "View Profile",
  },
  socialLinks: [
    { id: "github", label: "GitHub", url: "https://github.com/" },
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/" },
    { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/" },
  ],
};
