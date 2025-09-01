import {
  users,
  projects,
  contactSubmissions,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.createdAt);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }
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
        title: "IoT Sensor Network",
        description: "Industrial IoT sensor network for environmental monitoring with wireless communication and cloud integration.",
        longDescription: "A comprehensive IoT solution designed for industrial environmental monitoring. The system consists of multiple wireless sensor nodes that collect temperature, humidity, pressure, and air quality data. Each node communicates via LoRaWAN to a central gateway, which then forwards data to cloud platforms for real-time analysis and alerting. The solution includes custom PCB design, embedded firmware development, and a complete backend infrastructure.",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["IoT", "Wireless", "Cloud", "LoRaWAN", "Environmental Monitoring"],
        category: "IoT Systems",
        status: "completed",
        projectUrl: "https://example.com/iot-project",
        githubUrl: "https://github.com/example/iot-sensor",
        createdAt: new Date("2024-01-15"),
        gallery: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "2",
        title: "Power Management System",
        description: "High-efficiency power management solution for electric vehicle charging stations with advanced safety features.",
        longDescription: "An advanced power management system specifically designed for electric vehicle charging infrastructure. The system incorporates multiple voltage regulation stages, active power factor correction, and comprehensive safety monitoring. Features include over-current protection, thermal management, and real-time efficiency monitoring. The design meets all relevant safety standards including UL and IEC certifications.",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Power Electronics", "EV Charging", "Safety", "UL Certified", "Thermal Management"],
        category: "Power Systems",
        status: "completed",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-02-10"),
        gallery: [
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "3",
        title: "Medical Device Control",
        description: "FDA-compliant control system for medical imaging equipment with precision timing and safety protocols.",
        longDescription: "A critical control system for medical imaging equipment requiring FDA compliance and IEC 60601-1 certification. The system manages high-precision timing for imaging sequences, implements multiple layers of safety monitoring, and includes comprehensive fault detection and reporting. All software is developed following IEC 62304 standards for medical device software lifecycle processes.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Medical", "FDA Compliant", "Precision", "IEC 60601", "Safety Critical"],
        category: "Medical Devices",
        status: "completed",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-03-05"),
        gallery: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "4",
        title: "Automation Control",
        description: "Comprehensive automation control system for manufacturing processes with real-time monitoring and feedback.",
        longDescription: "An industrial automation solution for manufacturing process control featuring real-time monitoring, adaptive feedback control, and predictive maintenance capabilities. The system integrates with existing SCADA infrastructure and provides comprehensive data logging and analysis tools. Designed for 24/7 operation with redundant safety systems.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Automation", "Industrial", "Control", "SCADA", "Real-time"],
        category: "Industrial Automation",
        status: "completed",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-04-12"),
        gallery: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "5",
        title: "RF Communication",
        description: "Long-range RF communication system for remote monitoring applications with advanced signal processing.",
        longDescription: "A sophisticated RF communication system designed for long-range remote monitoring applications. Features advanced digital signal processing, adaptive frequency hopping, and robust error correction. The system operates in the ISM band with FCC Part 15 compliance and provides reliable communication over distances up to 50 kilometers in open terrain.",
        imageUrl: "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["RF Design", "Long Range", "Signal Processing", "FCC Certified", "Digital Communications"],
        category: "Communications",
        status: "completed",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-05-20"),
        gallery: [
          "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "6",
        title: "Renewable Energy",
        description: "Smart grid integration system for renewable energy sources with maximum power point tracking and grid synchronization.",
        longDescription: "An advanced renewable energy integration system featuring maximum power point tracking (MPPT) algorithms, grid synchronization, and smart inverter functionality. The system supports both solar and wind energy sources with dynamic load balancing and energy storage management. Complies with IEEE 1547 standards for distributed energy resources.",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Solar", "Smart Grid", "MPPT", "IEEE 1547", "Energy Storage"],
        category: "Renewable Energy",
        status: "completed",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-06-15"),
        gallery: [
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
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

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || randomUUID();
    const user: User = { 
      id,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
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

export const storage = new DatabaseStorage();
