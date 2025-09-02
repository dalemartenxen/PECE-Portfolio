import { z } from 'zod';

// Example schema for contact form
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Example project schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  image: z.string().optional(),
  link: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;