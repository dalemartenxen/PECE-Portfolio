import { Router } from 'express';
import { storage } from './storage.js';
import { insertProjectSchema, insertContactSubmissionSchema, insertArticleSchema } from '@shared/schema';
import { fromZodError } from 'zod-validation-error';

const router = Router();

// Projects routes
router.get('/projects', async (req, res) => {
  try {
    const projects = await storage.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await storage.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const validation = insertProjectSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: fromZodError(validation.error).toString() 
      });
    }
    
    const project = await storage.createProject(validation.data);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const validation = insertProjectSchema.partial().safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: fromZodError(validation.error).toString() 
      });
    }
    
    const project = await storage.updateProject(req.params.id, validation.data);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const success = await storage.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Contact submissions routes
router.post('/contact', async (req, res) => {
  try {
    const validation = insertContactSubmissionSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: fromZodError(validation.error).toString() 
      });
    }
    
    const submission = await storage.createContactSubmission(validation.data);
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

router.get('/contact', async (req, res) => {
  try {
    const submissions = await storage.getAllContactSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Articles routes
router.get('/articles', async (req, res) => {
  try {
    const articles = await storage.getAllArticles();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

router.get('/articles/:id', async (req, res) => {
  try {
    const article = await storage.getArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

router.post('/articles', async (req, res) => {
  try {
    const validation = insertArticleSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: fromZodError(validation.error).toString() 
      });
    }
    
    const article = await storage.createArticle(validation.data);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

export default router;
