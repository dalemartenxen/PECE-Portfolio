import type { InsertProject, InsertContactSubmission, InsertArticle, Project, ContactSubmission, Article } from '@shared/schema';

// API client for database operations
export const dbOperations = {
  // Projects
  async getAllProjects(): Promise<Project[]> {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  },

  async getProject(id: string): Promise<Project | undefined> {
    const response = await fetch(`/api/projects/${id}`);
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    return await response.json();
  },

  async createProject(project: InsertProject): Promise<Project> {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return await response.json();
  },

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    return await response.json();
  },

  async deleteProject(id: string): Promise<boolean> {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 404) {
      return false;
    }
    return response.ok;
  },

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    return await response.json();
  },

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const response = await fetch('/api/contact');
    if (!response.ok) {
      throw new Error('Failed to fetch contact submissions');
    }
    return await response.json();
  },

  // Articles
  async getAllArticles(): Promise<Article[]> {
    const response = await fetch('/api/articles');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return await response.json();
  },

  async getArticle(id: string): Promise<Article | undefined> {
    const response = await fetch(`/api/articles/${id}`);
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return await response.json();
  },

  async createArticle(article: InsertArticle): Promise<Article> {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) {
      throw new Error('Failed to create article');
    }
    return await response.json();
  }
};