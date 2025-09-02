import { Project, InsertProject } from "@shared/schema";
import { dbOperations } from "./database";

// Direct database operations for serverless architecture

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const project = await dbOperations.getProject(id);
    return project || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    return await dbOperations.getAllProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const createProject = async (project: InsertProject): Promise<Project | null> => {
  try {
    return await dbOperations.createProject(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};
