import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";
import type { InsertProject, InsertArticle } from '../shared/schema';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

const sampleProjects: InsertProject[] = [
  {
    title: "Hospital Equipment Installation",
    description: "When installing critical medical equipment that affects patient safety, a PECE must review and seal all electrical systems.",
    longDescription: "Hospitals installing new medical imaging equipment, surgical systems, or critical care devices require PECE oversight. The professional engineer ensures all electrical installations meet IEC 60601-1 medical safety standards, validates proper grounding systems, reviews emergency power backup systems, and certifies that electrical isolation meets stringent medical requirements. This is especially critical for equipment in wet locations like operating rooms or areas with flammable anesthetics.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Medical Standards", "IEC 60601", "Safety Systems", "Emergency Power", "Grounding"],
    category: "Medical Compliance",
    status: "scenario",
  },
  {
    title: "Industrial Control System Upgrade",
    description: "Manufacturing facilities upgrading their control systems require PECE oversight to ensure safety and code compliance.",
    longDescription: "When factories install new programmable logic controllers (PLCs), motor control centers, or SCADA systems, a PECE must verify that all electrical installations meet CSA standards. This includes reviewing arc flash studies, ensuring proper lockout/tagout procedures, validating emergency shutdown systems, and certifying that electrical enclosures meet NEMA ratings for the industrial environment. The engineer also ensures compliance with electrical safety standards in hazardous locations if applicable.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["PLCs", "SCADA", "Arc Flash Analysis", "CSA Standards", "Industrial Safety"],
    category: "Industrial Systems",
    status: "scenario",
  },
  {
    title: "Renewable Energy Installation",
    description: "Solar and wind energy installations require professional engineering oversight for grid interconnection and safety compliance.",
    longDescription: "Large-scale renewable energy projects must have PECE oversight for electrical system design and safety compliance. This includes reviewing inverter installations, grid interconnection equipment, protective relay settings, and ensuring compliance with IEEE standards for distributed generation. The professional engineer validates that electrical systems can safely disconnect from the grid during maintenance or emergencies, and that all installations meet local electrical codes and utility requirements.",
    imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Solar Systems", "Grid Interconnection", "IEEE Standards", "Protective Relays", "Power Electronics"],
    category: "Renewable Energy",
    status: "scenario",
  }
];

const sampleArticles: InsertArticle[] = [
  {
    title: "Understanding Professional Engineering Liability in Electronics",
    description: "A comprehensive guide to professional liability considerations when sealing electronic engineering work.",
    content: "Professional engineers who seal electronic engineering work assume significant liability for public safety. This article explores the key considerations and best practices for managing this responsibility...",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Professional Practice",
    tags: ["liability", "professional-practice", "ethics", "engineering-law"],
    readTime: "8 min read",
  },
  {
    title: "Medical Device Electronics: Safety Standards and Compliance",
    description: "Essential information about IEC 60601 standards and regulatory requirements for medical electronic devices.",
    content: "Medical electronic devices must meet stringent safety requirements to protect patients and operators. This article covers the key aspects of IEC 60601-1 and related standards...",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Medical Electronics",
    tags: ["medical-devices", "IEC-60601", "safety-standards", "compliance"],
    readTime: "12 min read",
  }
];

async function migrateData() {
  try {
    console.log("Starting data migration...");
    
    // Insert projects
    console.log("Inserting sample projects...");
    for (const project of sampleProjects) {
      await db.insert(schema.projects).values([project]);
    }
    
    // Insert articles
    console.log("Inserting sample articles...");
    for (const article of sampleArticles) {
      await db.insert(schema.articles).values([article]);
    }
    
    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrateData();