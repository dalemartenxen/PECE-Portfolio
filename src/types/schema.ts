import { z } from "zod";

// Contact form schema
export const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

// Project type for static data
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  status: string;
  projectUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

// Article type for static data
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt?: Date;
}