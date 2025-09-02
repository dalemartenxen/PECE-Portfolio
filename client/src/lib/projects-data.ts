import { Project } from "@shared/schema";

// This file can be used for additional project utilities or local data if needed
// The main project data is now managed through the API and storage

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const response = await fetch(`/api/projects/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project | null> => {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};
