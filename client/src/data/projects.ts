import { Project } from "../types/project";

// Static project data for frontend-only portfolio
export const staticProjects: Project[] = [
  {
    id: "1",
    title: "Industrial Control System Design",
    description: "Designed and implemented a comprehensive industrial control system for manufacturing automation with PLC integration and safety protocols.",
    longDescription: "Led the complete design and implementation of an industrial control system for a manufacturing facility. The project involved developing control algorithms, selecting appropriate PLCs, designing safety interlocks, and ensuring compliance with industrial safety standards. The system improved production efficiency by 35% while maintaining the highest safety standards.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["PLC Programming", "SCADA", "Industrial Networks", "Safety Systems", "HMI Design"],
    category: "Industrial Automation",
    status: "completed",
    projectUrl: null,
    githubUrl: null,
    createdAt: new Date("2024-08-15"),
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ]
  },
  {
    id: "2", 
    title: "Power Distribution System Analysis",
    description: "Comprehensive electrical power distribution analysis and design for a commercial complex, ensuring regulatory compliance and optimal efficiency.",
    longDescription: "Performed detailed power distribution analysis for a 50,000 sq ft commercial complex. The project included load calculations, fault analysis, protective device coordination, and compliance verification with national electrical codes. Delivered complete electrical drawings and specifications sealed with PECE authority.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Power Systems Analysis", "AutoCAD Electrical", "Protective Relays", "Load Flow Analysis", "Electrical Codes"],
    category: "Power Systems",
    status: "completed",
    projectUrl: null,
    githubUrl: null,
    createdAt: new Date("2024-06-20"),
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ]
  },
  {
    id: "3",
    title: "Medical Device Compliance Review",
    description: "Regulatory compliance assessment and documentation for FDA-approved medical electronic devices, ensuring safety standards and certification requirements.",
    longDescription: "Conducted comprehensive compliance review for medical electronic devices seeking FDA approval. The project involved risk analysis, safety standard verification (IEC 60601), electromagnetic compatibility testing coordination, and preparation of technical documentation. Successfully guided the client through the regulatory approval process.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Medical Device Standards", "IEC 60601", "FDA Regulations", "Risk Analysis", "EMC Testing"],
    category: "Regulatory Compliance",
    status: "completed",
    projectUrl: null,
    githubUrl: null,
    createdAt: new Date("2024-04-10"),
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ]
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return staticProjects.find(project => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return staticProjects;
};

export const getProjectsByCategory = (category: string): Project[] => {
  return staticProjects.filter(project => project.category === category);
};