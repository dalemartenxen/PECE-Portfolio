import { type User, type InsertUser, type Project, type InsertProject, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "Hospital Equipment Installation",
        description: "When installing critical medical equipment that affects patient safety, a PECE must review and seal all electrical systems.",
        longDescription: "Hospitals installing new medical imaging equipment, surgical systems, or critical care devices require PECE oversight. The professional engineer ensures all electrical installations meet IEC 60601-1 medical safety standards, validates proper grounding systems, reviews emergency power backup systems, and certifies that electrical isolation meets stringent medical requirements. This is especially critical for equipment in wet locations like operating rooms or areas with flammable anesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Medical Standards", "IEC 60601", "Safety Systems", "Emergency Power", "Grounding"],
        category: "Medical Compliance",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-01-15"),
        gallery: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "2",
        title: "Industrial Manufacturing Setup",
        description: "Large manufacturing facilities need PECE approval for electrical systems, motor controls, and safety interlocks.",
        longDescription: "Manufacturing plants with heavy machinery, motor control centers above certain horsepower ratings, or complex automation systems require PECE review. This includes validation of electrical load calculations, short circuit analysis, arc flash studies, and ensuring compliance with NFPA 70E workplace safety standards. The engineer must also verify proper sizing of transformers, switchgear, and protective devices for the industrial environment.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Motor Controls", "NFPA 70E", "Arc Flash", "Load Analysis", "Industrial Safety"],
        category: "Industrial",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-02-10"),
        gallery: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "3",
        title: "Telecommunications Infrastructure",
        description: "Cell towers, radio stations, and broadcast facilities require PECE certification for RF systems and tower grounding.",
        longDescription: "Telecommunications projects involving radio frequency systems, antenna installations, or broadcast equipment need PECE oversight for both electrical safety and RF exposure compliance. This includes proper tower grounding systems, lightning protection, RF hazard analysis, and ensuring compliance with FCC regulations for maximum permissible exposure (MPE) levels. The engineer must also verify backup power systems and emergency shutdown procedures.",
        imageUrl: "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["RF Systems", "FCC Compliance", "Tower Grounding", "Lightning Protection", "MPE Analysis"],
        category: "Telecommunications",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-03-05"),
        gallery: [
          "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "4",
        title: "Solar Power System Integration",
        description: "Commercial solar installations over certain capacity require PECE review for grid interconnection and safety systems.",
        longDescription: "Large-scale solar installations, especially those connecting to the utility grid, require PECE certification to ensure compliance with IEEE 1547 interconnection standards. The engineer reviews inverter specifications, protective relay settings, anti-islanding protection, and grid synchronization systems. This also includes evaluation of DC and AC disconnect systems, grounding electrode systems, and rapid shutdown requirements for firefighter safety.",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Solar PV", "IEEE 1547", "Grid Interconnection", "Rapid Shutdown", "Protective Relays"],
        category: "Renewable Energy",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-04-12"),
        gallery: [
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "5",
        title: "Data Center Electrical Design",
        description: "Critical data centers require PECE oversight for uninterruptible power systems and redundant electrical infrastructure.",
        longDescription: "Data centers with high availability requirements need PECE review of their electrical infrastructure including UPS systems, emergency generators, automatic transfer switches, and redundant power distribution. The engineer must ensure compliance with TIA-942 data center standards, validate N+1 or 2N redundancy configurations, and perform detailed load analysis for critical vs. non-critical systems. Proper grounding and EMI mitigation are also essential for data integrity.",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["UPS Systems", "TIA-942", "Redundancy", "Emergency Generators", "EMI Mitigation"],
        category: "Data Centers",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-05-20"),
        gallery: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "6",
        title: "Electric Vehicle Charging Stations",
        description: "Public EV charging infrastructure requires PECE certification for high-power electrical systems and safety features.",
        longDescription: "Electric vehicle charging stations, particularly DC fast chargers, require PECE review due to their high-power electrical systems and public accessibility. The engineer must verify proper installation of charging equipment, ground fault protection, ventilation requirements for indoor installations, and compliance with NFPA 70 Article 625. This includes evaluation of load management systems, utility coordination for demand charges, and ensuring proper signage and safety barriers around high-voltage equipment.",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["EV Charging", "NFPA 70", "Ground Fault", "Load Management", "High Voltage Safety"],
        category: "Transportation",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-06-15"),
        gallery: [
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      }
    ];

    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = { 
      ...project, 
      id, 
      createdAt: new Date(),
      longDescription: project.longDescription || null,
      projectUrl: project.projectUrl || null,
      githubUrl: project.githubUrl || null,
      gallery: project.gallery as string[] | null || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject: Project = { 
      ...existingProject, 
      ...project,
      longDescription: project.longDescription !== undefined ? project.longDescription : existingProject.longDescription,
      projectUrl: project.projectUrl !== undefined ? project.projectUrl : existingProject.projectUrl,
      githubUrl: project.githubUrl !== undefined ? project.githubUrl : existingProject.githubUrl,
      gallery: project.gallery !== undefined ? project.gallery as string[] | null : existingProject.gallery
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      status: "new",
      createdAt: new Date(),
      company: submission.company || null,
      service: submission.service || null
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
}

export const storage = new MemStorage();
