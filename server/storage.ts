import type {
  Project,
  InsertProject,
  ContactSubmission,
  InsertContactSubmission,
  Article,
  InsertArticle,
} from '@shared/schema';

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Articles
  getAllArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private projects: Project[] = [
    {
      id: 'project-1',
      title: 'Smart IoT Temperature Monitoring System',
      description: 'A comprehensive temperature monitoring solution using wireless sensors and real-time data analytics.',
      longDescription: 'Developed a complete IoT ecosystem for industrial temperature monitoring featuring wireless sensor networks, real-time data collection, and predictive maintenance algorithms. The system includes custom PCB design, embedded firmware, and cloud-based analytics platform.',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600',
      technologies: ['Arduino', 'LoRaWAN', 'React', 'Node.js', 'MongoDB'],
      category: 'IoT Solutions',
      status: 'completed',
      projectUrl: '#',
      githubUrl: '#',
      createdAt: new Date('2024-01-15'),
      gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600']
    },
    {
      id: 'project-2',
      title: 'Advanced Power Management Circuit',
      description: 'High-efficiency switch-mode power supply with digital control and monitoring capabilities.',
      longDescription: 'Designed and implemented a state-of-the-art SMPS with digital control algorithms, achieving 95% efficiency across wide load ranges. Features include real-time monitoring, adaptive control, and comprehensive protection mechanisms.',
      imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600',
      technologies: ['Altium Designer', 'STM32', 'C++', 'MATLAB', 'SPICE'],
      category: 'Power Electronics',
      status: 'completed',
      projectUrl: '#',
      githubUrl: '#',
      createdAt: new Date('2024-02-20'),
      gallery: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600']
    }
  ];
  private contactSubmissions: ContactSubmission[] = [];
  private articles: Article[] = [
    {
      id: 'article-1',
      title: 'Understanding Power Electronics in Modern Applications',
      description: 'A comprehensive guide to power electronic systems and their applications in renewable energy and electric vehicles.',
      content: 'Power electronics form the backbone of modern electrical systems...',
      imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=600',
      category: 'Technical Insights',
      tags: ['Power Electronics', 'Renewable Energy', 'Electric Vehicles'],
      readTime: '8 min',
      publishedAt: new Date('2024-01-10'),
      createdAt: new Date('2024-01-10')
    }
  ];
  private idCounter = 1;

  private generateId(): string {
    return `mem_${this.idCounter++}`;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return [...this.projects];
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    this.projects[index] = { ...this.projects[index], ...project };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }

  // Contact submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: this.generateId(),
      status: 'new',
      createdAt: new Date(),
    };
    this.contactSubmissions.push(newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contactSubmissions];
  }

  // Articles
  async getAllArticles(): Promise<Article[]> {
    return [...this.articles];
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.find(a => a.id === id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const newArticle: Article = {
      ...article,
      id: this.generateId(),
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }
}

// Export a singleton instance
export const storage = new MemStorage();
