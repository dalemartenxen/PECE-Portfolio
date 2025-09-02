import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { eq } from 'drizzle-orm';
import type { InsertProject, InsertContactSubmission, InsertArticle, Project, ContactSubmission, Article } from '@shared/schema';

// Configure Neon for serverless
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

if (!import.meta.env.VITE_DATABASE_URL) {
  throw new Error(
    "VITE_DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const pool = new Pool({ connectionString: import.meta.env.VITE_DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Database operations
export const dbOperations = {
  // Projects
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(schema.projects);
  },

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return project;
  },

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(schema.projects).values(project).returning();
    return newProject;
  },

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(schema.projects)
      .set(project)
      .where(eq(schema.projects.id, id))
      .returning();
    return updatedProject;
  },

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(schema.projects).where(eq(schema.projects.id, id));
    return (result.rowCount ?? 0) > 0;
  },

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(schema.contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  },

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(schema.contactSubmissions);
  },

  // Articles
  async getAllArticles(): Promise<Article[]> {
    return await db.select().from(schema.articles);
  },

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(schema.articles).where(eq(schema.articles.id, id));
    return article;
  },

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(schema.articles).values(article).returning();
    return newArticle;
  }
};