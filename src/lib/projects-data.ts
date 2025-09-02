import { Project } from "@/types/schema";

// Static project data for portfolio
const projects: Project[] = [
  {
    id: "1",
    title: "Industrial Control System Design",
    description: "Custom control system for manufacturing automation with safety interlocks and monitoring capabilities.",
    longDescription: "Designed and implemented a comprehensive industrial control system for a manufacturing facility, featuring programmable logic controllers (PLCs), human-machine interfaces (HMIs), and safety interlocks. The system includes real-time monitoring, data logging, and alarm management capabilities.",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["PLC Programming", "HMI Design", "SCADA", "Industrial Networking", "Safety Systems"],
    category: "Industrial Automation",
    status: "completed",
    projectUrl: "",
    githubUrl: "",
    gallery: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
  },
  {
    id: "2", 
    title: "Power Electronics Circuit Analysis",
    description: "High-efficiency DC-DC converter design with advanced control algorithms for renewable energy applications.",
    longDescription: "Developed a high-efficiency DC-DC converter for solar energy systems, incorporating advanced control algorithms and protection circuits. The design achieved >95% efficiency across varying load conditions and included comprehensive thermal management solutions.",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["Power Electronics", "Circuit Simulation", "PCB Design", "Thermal Analysis", "Control Systems"],
    category: "Power Electronics",
    status: "completed",
    projectUrl: "",
    githubUrl: "",
    gallery: ["/api/placeholder/800/600", "/api/placeholder/800/600"]
  },
  {
    id: "3",
    title: "Embedded System Development",
    description: "IoT sensor network for environmental monitoring with wireless communication and data analytics.",
    longDescription: "Created a comprehensive IoT sensor network for environmental monitoring, featuring wireless sensor nodes, data collection gateways, and cloud-based analytics. The system monitors temperature, humidity, air quality, and other environmental parameters in real-time.",
    imageUrl: "/api/placeholder/600/400", 
    technologies: ["Embedded C/C++", "IoT Protocols", "Wireless Communication", "Sensor Integration", "Data Analytics"],
    category: "Embedded Systems",
    status: "completed",
    projectUrl: "",
    githubUrl: "",
    gallery: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
  },
  {
    id: "4",
    title: "Signal Processing & Analysis", 
    description: "Digital signal processing system for audio enhancement with real-time filtering and noise reduction.",
    longDescription: "Implemented a digital signal processing system for audio applications, featuring real-time filtering, noise reduction, and audio enhancement algorithms. The system processes multiple audio channels simultaneously with low latency and high fidelity.",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["DSP Algorithms", "MATLAB/Simulink", "Real-time Processing", "Audio Engineering", "Filter Design"],
    category: "Signal Processing",
    status: "completed", 
    projectUrl: "",
    githubUrl: "",
    gallery: ["/api/placeholder/800/600", "/api/placeholder/800/600"]
  },
  {
    id: "5",
    title: "RF System Design",
    description: "High-frequency RF communication system with antenna design and signal optimization.",
    longDescription: "Designed a complete RF communication system including antenna design, impedance matching networks, and signal conditioning circuits. The system operates in the 2.4GHz band with optimized range and signal quality for industrial applications.",
    imageUrl: "/api/placeholder/600/400",
    technologies: ["RF Design", "Antenna Engineering", "Impedance Matching", "Signal Optimization", "Network Analysis"],
    category: "RF Engineering", 
    status: "completed",
    projectUrl: "",
    githubUrl: "",
    gallery: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"]
  }
];

export const getProjectById = async (id: string): Promise<Project | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = projects.find(p => p.id === id);
      resolve(project || null);
    }, 100); // Simulate loading time
  });
};

export const getAllProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 100); // Simulate loading time
  });
};

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProjects = projects.filter(p => 
        p.category.toLowerCase().includes(category.toLowerCase())
      );
      resolve(filteredProjects);
    }, 100);
  });
};
