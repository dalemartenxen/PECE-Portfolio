// Project types for frontend-only portfolio
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string | null;
  imageUrl: string;
  technologies: string[];
  category: string;
  status: string;
  projectUrl: string | null;
  githubUrl: string | null;
  createdAt: Date;
  gallery: string[] | null;
}