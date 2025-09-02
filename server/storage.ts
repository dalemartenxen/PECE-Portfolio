import { type User, type InsertUser, type Project, type InsertProject, type ContactSubmission, type InsertContactSubmission, type Article, type InsertArticle } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  getAllArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private articles: Map<string, Article>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.articles = new Map();
    this.initializeProjects();
    this.initializeArticles();
  }

  private initializeProjects() {
    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "Hospital Equipment Installation",
        description: "When installing critical medical equipment that affects patient safety, a PECE must review and seal all electrical systems.",
        longDescription: "Hospitals installing new medical imaging equipment, surgical systems, or critical care devices require PECE oversight. The professional engineer ensures all electrical installations meet IEC 60601-1 medical safety standards, validates proper grounding systems, reviews emergency power backup systems, and certifies that electrical isolation meets stringent medical requirements. This is especially critical for equipment in wet locations like operating rooms or areas with flammable anesthetics.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Medical Standards", "IEC 60601", "Safety Systems", "Emergency Power", "Grounding"],
        category: "Medical Compliance",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-01-15"),
        gallery: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "2",
        title: "Industrial Manufacturing Setup",
        description: "Large manufacturing facilities need PECE approval for electrical systems, motor controls, and safety interlocks.",
        longDescription: "Manufacturing plants with heavy machinery, motor control centers above certain horsepower ratings, or complex automation systems require PECE review. This includes validation of electrical load calculations, short circuit analysis, arc flash studies, and ensuring compliance with NFPA 70E workplace safety standards. The engineer must also verify proper sizing of transformers, switchgear, and protective devices for the industrial environment.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Motor Controls", "NFPA 70E", "Arc Flash", "Load Analysis", "Industrial Safety"],
        category: "Industrial",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-02-10"),
        gallery: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "3",
        title: "Telecommunications Infrastructure",
        description: "Cell towers, radio stations, and broadcast facilities require PECE certification for RF systems and tower grounding.",
        longDescription: "Telecommunications projects involving radio frequency systems, antenna installations, or broadcast equipment need PECE oversight for both electrical safety and RF exposure compliance. This includes proper tower grounding systems, lightning protection, RF hazard analysis, and ensuring compliance with FCC regulations for maximum permissible exposure (MPE) levels. The engineer must also verify backup power systems and emergency shutdown procedures.",
        imageUrl: "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["RF Systems", "FCC Compliance", "Tower Grounding", "Lightning Protection", "MPE Analysis"],
        category: "Telecommunications",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-03-05"),
        gallery: [
          "https://images.unsplash.com/photo-1606314850633-ac6eca832fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "4",
        title: "Solar Power System Integration",
        description: "Commercial solar installations over certain capacity require PECE review for grid interconnection and safety systems.",
        longDescription: "Large-scale solar installations, especially those connecting to the utility grid, require PECE certification to ensure compliance with IEEE 1547 interconnection standards. The engineer reviews inverter specifications, protective relay settings, anti-islanding protection, and grid synchronization systems. This also includes evaluation of DC and AC disconnect systems, grounding electrode systems, and rapid shutdown requirements for firefighter safety.",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Solar PV", "IEEE 1547", "Grid Interconnection", "Rapid Shutdown", "Protective Relays"],
        category: "Renewable Energy",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-04-12"),
        gallery: [
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "5",
        title: "Data Center Electrical Design",
        description: "Critical data centers require PECE oversight for uninterruptible power systems and redundant electrical infrastructure.",
        longDescription: "Data centers with high availability requirements need PECE review of their electrical infrastructure including UPS systems, emergency generators, automatic transfer switches, and redundant power distribution. The engineer must ensure compliance with TIA-942 data center standards, validate N+1 or 2N redundancy configurations, and perform detailed load analysis for critical vs. non-critical systems. Proper grounding and EMI mitigation are also essential for data integrity.",
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["UPS Systems", "TIA-942", "Redundancy", "Emergency Generators", "EMI Mitigation"],
        category: "Data Centers",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-05-20"),
        gallery: [
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: "6",
        title: "Electric Vehicle Charging Stations",
        description: "Public EV charging infrastructure requires PECE certification for high-power electrical systems and safety features.",
        longDescription: "Electric vehicle charging stations, particularly DC fast chargers, require PECE review due to their high-power electrical systems and public accessibility. The engineer must verify proper installation of charging equipment, ground fault protection, ventilation requirements for indoor installations, and compliance with NFPA 70 Article 625. This includes evaluation of load management systems, utility coordination for demand charges, and ensuring proper signage and safety barriers around high-voltage equipment.",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["EV Charging", "NFPA 70", "Ground Fault", "Load Management", "High Voltage Safety"],
        category: "Transportation",
        status: "scenario",
        projectUrl: null,
        githubUrl: null,
        createdAt: new Date("2024-06-15"),
        gallery: [
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ]
      }
    ];

    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  private initializeArticles() {
    const sampleArticles: Article[] = [
      {
        id: "1",
        title: "Why PECE Sign & Seal is Required by Law",
        description: "Understanding RA 9292 compliance and the legal requirements for Professional Electronics Engineer certification in the Philippines.",
        content: `# Why PECE Sign & Seal is Required by Law

## Understanding RA 9292 Compliance

Republic Act 9292, also known as the Electronics Engineering Law of 2004, mandates that certain electronics engineering work must be reviewed, approved, and sealed by a licensed Professional Electronics Engineer (PECE). This law protects public safety and ensures professional standards in electronics engineering practice.

## When is PECE Sign & Seal Required?

Under RA 9292, PECE certification is required for:

### 1. Government Projects
- All electronics engineering work for government buildings
- Public infrastructure with electronic systems
- Educational institutions and hospitals

### 2. Commercial Buildings
- Shopping malls and commercial complexes
- Office buildings over certain floor areas
- Industrial facilities with complex electronics

### 3. Safety-Critical Systems
- Medical equipment installations
- Emergency communication systems
- Fire safety and security systems

## Legal Consequences of Non-Compliance

Projects without proper PECE certification may face:
- Building permit rejections
- Construction delays and cost overruns
- Legal liability for the project owner
- Potential safety hazards to the public

## Conclusion

RA 9292 compliance isn't just a bureaucratic requirement—it's a legal safeguard that ensures electronics engineering work meets professional standards and protects public safety. Always engage a licensed PECE for your electronics engineering needs.`,
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Legal Compliance",
        tags: ["RA 9292", "Legal Requirements", "PECE Certification", "Philippines Law"],
        readTime: "5 min read",
        publishedAt: new Date("2024-01-10"),
        createdAt: new Date("2024-01-10")
      },
      {
        id: "2",
        title: "Electronics Engineering Compliance Checklist for Developers",
        description: "A comprehensive checklist of steps project owners must follow to ensure their electronics engineering work meets regulatory requirements.",
        content: `# Electronics Engineering Compliance Checklist for Developers

## Pre-Design Phase

### ☐ Project Assessment
- [ ] Determine if PECE certification is required
- [ ] Identify applicable building codes and standards
- [ ] Review local government requirements
- [ ] Establish project timeline including PECE review

### ☐ Documentation Preparation
- [ ] Gather architectural plans and specifications
- [ ] Prepare electrical load calculations
- [ ] Document special requirements (medical, industrial, etc.)

## Design Phase

### ☐ Technical Requirements
- [ ] Ensure designs meet NEC/PEC standards
- [ ] Include proper grounding and bonding systems
- [ ] Design adequate emergency power systems
- [ ] Plan for future expansion and maintenance

### ☐ Safety Considerations
- [ ] Include arc flash analysis for high-power systems
- [ ] Design proper protection coordination
- [ ] Plan emergency shutdown procedures
- [ ] Consider environmental factors

## Submission Phase

### ☐ Document Preparation
- [ ] Complete electrical plans and specifications
- [ ] Prepare load calculations and analysis
- [ ] Include equipment schedules and specifications
- [ ] Prepare single-line diagrams

### ☐ PECE Review Process
- [ ] Submit plans to qualified PECE
- [ ] Address any technical comments or revisions
- [ ] Obtain signed and sealed drawings
- [ ] Verify all stamps and signatures are valid

## Implementation Phase

### ☐ Construction Oversight
- [ ] Ensure installation follows approved plans
- [ ] Document any field changes or modifications
- [ ] Conduct progress inspections
- [ ] Prepare as-built documentation

### ☐ Final Compliance
- [ ] Complete final PECE inspection
- [ ] Obtain Certificate of Compliance
- [ ] Submit final documentation to authorities
- [ ] Archive all project documentation

## Common Pitfalls to Avoid

- Starting construction before obtaining PECE approval
- Using unqualified or unlicensed engineers
- Failing to document field changes
- Inadequate coordination between trades
- Insufficient emergency power planning

Following this checklist ensures your project meets all regulatory requirements and avoids costly delays or rework.`,
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Project Management",
        tags: ["Compliance", "Checklist", "Project Planning", "Best Practices"],
        readTime: "8 min read",
        publishedAt: new Date("2024-01-15"),
        createdAt: new Date("2024-01-15")
      },
      {
        id: "3",
        title: "The Role of a PECE in Government Permitting",
        description: "How Professional Electronics Engineers facilitate the government permitting process and ensure regulatory compliance for construction projects.",
        content: `# The Role of a PECE in Government Permitting

## Understanding the Permitting Landscape

Government permitting for construction projects with electronics components requires careful navigation of multiple regulatory frameworks. A Professional Electronics Engineer (PECE) serves as your technical expert and regulatory liaison throughout this complex process.

## Key Responsibilities of a PECE

### 1. Technical Review and Validation
- **Code Compliance**: Ensuring all designs meet National Electrical Code (NEC) and local amendments
- **Load Analysis**: Verifying electrical loads don't exceed utility or building capacity
- **Safety Systems**: Validating emergency power, fire alarm, and security system designs
- **Integration**: Ensuring electronics systems work harmoniously with mechanical and structural elements

### 2. Documentation and Submittal
- **Plan Preparation**: Creating detailed technical drawings and specifications
- **Calculations**: Providing load calculations, short circuit analysis, and coordination studies
- **Compliance Reports**: Documenting how designs meet applicable codes and standards
- **Professional Sealing**: Applying official PECE seal and signature to validate the work

### 3. Government Interaction
- **Plan Review Meetings**: Representing the project during technical reviews with building officials
- **Comment Resolution**: Addressing reviewer comments and plan check corrections
- **Inspection Support**: Assisting during field inspections and final approvals
- **Code Interpretation**: Clarifying technical requirements and acceptable alternatives

## The Permitting Process Flow

### Phase 1: Pre-Submittal
The PECE reviews project requirements and coordinates with the design team to ensure all electronics engineering aspects are properly planned and documented.

### Phase 2: Plan Review
Government reviewers examine PECE-sealed plans for code compliance, safety, and technical adequacy. The PECE responds to comments and revises plans as needed.

### Phase 3: Construction
During construction, the PECE may need to review field conditions, approve changes, and coordinate with inspectors to ensure work matches approved plans.

### Phase 4: Final Approval
The PECE provides final documentation and supports the Certificate of Occupancy process by confirming all electronics systems are installed and functioning per approved designs.

## Why Government Officials Trust PECE Certification

Building officials and plan reviewers rely on PECE certification because:
- **Professional Liability**: PECEs carry professional insurance and are legally responsible for their work
- **Continuing Education**: License requirements ensure current knowledge of codes and technologies
- **Peer Review**: Professional engineering boards maintain standards through disciplinary oversight
- **Technical Expertise**: Specialized knowledge in electronics engineering principles and applications

## Value to Project Owners

Engaging a PECE early in the process provides:
- **Faster Approvals**: Properly prepared submittals reduce review cycles
- **Cost Control**: Avoiding rework and delays through compliant initial designs
- **Risk Mitigation**: Professional oversight reduces liability and safety concerns
- **Quality Assurance**: Expert review ensures reliable, maintainable systems

## Conclusion

A PECE serves as your technical advocate in the government permitting process, ensuring your project meets all regulatory requirements while protecting your interests and timeline. Their expertise and professional standing with regulatory authorities can be the difference between a smooth approval process and costly delays.`,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Government Relations",
        tags: ["Permitting", "Government", "Building Codes", "Professional Services"],
        readTime: "7 min read",
        publishedAt: new Date("2024-01-20"),
        createdAt: new Date("2024-01-20")
      },
      {
        id: "4",
        title: "Common Mistakes in Electronics Design Submissions",
        description: "Learn about frequent errors in electronics engineering plan submissions and practical strategies to avoid costly delays and revisions.",
        content: `# Common Mistakes in Electronics Design Submissions (and How to Avoid Them)

## Introduction

After reviewing hundreds of electronics engineering submissions, certain patterns of mistakes emerge consistently. These errors cause delays, increase costs, and frustrate everyone involved in the project. Here's what to watch out for and how to get it right the first time.

## Top 10 Most Common Mistakes

### 1. Incomplete Load Calculations
**The Mistake**: Submitting designs without proper electrical load analysis or using generic assumptions instead of actual equipment specifications.

**The Fix**: 
- Always use manufacturer's data sheets for load calculations
- Include diversity factors based on actual usage patterns
- Document all assumptions and show calculation methodology
- Include future expansion capacity in your analysis

### 2. Missing Grounding Details
**The Mistake**: Inadequate grounding electrode system design or missing equipment grounding conductor sizing.

**The Fix**:
- Show complete grounding electrode system layout
- Size equipment grounding conductors per NEC Table 250.122
- Include bonding details for metal raceways and enclosures
- Document grounding electrode conductor connections

### 3. Inadequate Short Circuit Analysis
**The Mistake**: Failing to provide fault current calculations or specifying equipment with insufficient interrupting ratings.

**The Fix**:
- Calculate available fault current at all major distribution points
- Specify protective devices with adequate interrupting capacity
- Include time-current coordination studies
- Document fault current contributors (utility, generators, motors)

### 4. Non-Compliant Emergency Systems
**The Mistake**: Mixing emergency and normal power circuits or inadequate emergency power transfer arrangements.

**The Fix**:
- Maintain complete separation between emergency and normal systems
- Size emergency generators for actual emergency loads only
- Include proper transfer switch specifications and testing requirements
- Document compliance with NEC Article 700/701/702

### 5. Insufficient Panel Schedule Details
**The Mistake**: Generic panel schedules without actual circuit descriptions or load assignments.

**The Fix**:
- Provide detailed circuit descriptions for every breaker
- Include actual connected loads and ampacity calculations
- Show spare circuit allocations
- Coordinate panel schedules with floor plan circuit designations

### 6. Missing Single Line Diagrams
**The Mistake**: Omitting electrical distribution diagrams or providing diagrams that don't match actual installation.

**The Fix**:
- Create clear, accurate single line diagrams showing all major equipment
- Include protective device ratings and coordination
- Show meter locations and utility connection points
- Coordinate with architectural and mechanical plans

### 7. Inadequate Fire Alarm Documentation
**The Mistake**: Generic fire alarm plans without device locations or missing notification coverage analysis.

**The Fix**:
- Show exact device locations with distances and coverage areas
- Include battery calculations and standby power requirements
- Provide device schedules with model numbers and specifications
- Document ADA compliance for notification devices

### 8. Poor Cable Management Planning
**The Mistake**: No consideration for cable routing, tray sizing, or conduit fill calculations.

**The Fix**:
- Plan cable tray layouts and loading calculations
- Size conduits per NEC fill requirements
- Show cable routing avoiding conflicts with other trades
- Include pull box locations and sizing

### 9. Inadequate Equipment Specifications
**The Mistake**: Specifying equipment without considering environmental conditions, maintenance access, or future requirements.

**The Fix**:
- Specify equipment ratings for actual environmental conditions
- Include maintenance clearances and access requirements
- Consider equipment lifecycle and replacement planning
- Coordinate equipment dimensions with architectural plans

### 10. Missing Coordination with Other Trades
**The Mistake**: Designing electronics systems in isolation without considering mechanical, plumbing, or structural requirements.

**The Fix**:
- Coordinate early and often with all design disciplines
- Attend interdisciplinary design meetings
- Review architectural and mechanical plans thoroughly
- Resolve conflicts before plan submission

## Quality Control Checklist

Before submitting your plans, verify:

- [ ] All calculations are complete and documented
- [ ] Equipment specifications match actual requirements
- [ ] Plans coordinate with architectural and mechanical drawings
- [ ] All applicable codes and standards are addressed
- [ ] Emergency systems comply with applicable articles
- [ ] Grounding and bonding details are complete
- [ ] Professional engineer review and seal is applied

## Conclusion

Most submission mistakes stem from rushing the design process or inadequate coordination. Taking time for thorough review and proper documentation upfront saves significant time and cost during the approval process. When in doubt, consult with a qualified PECE early in the design process.`,
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Design Best Practices",
        tags: ["Common Mistakes", "Plan Review", "Quality Control", "Technical Documentation"],
        readTime: "10 min read",
        publishedAt: new Date("2024-01-25"),
        createdAt: new Date("2024-01-25")
      },
      {
        id: "5",
        title: "Step-by-Step Guide: How to Get Your Electronics Plans Approved",
        description: "A detailed walkthrough of the electronics plan approval process, from initial design to final certificate of compliance.",
        content: `# Step-by-Step Guide: How to Get Your Electronics Plans Approved

## Overview

Getting electronics engineering plans approved can seem daunting, but following a systematic approach ensures success. This guide walks you through each step of the process, helping you avoid common pitfalls and delays.

## Phase 1: Pre-Design Planning (2-3 weeks)

### Step 1: Define Project Requirements
- **Gather Information**: Collect architectural plans, building program, and special requirements
- **Site Visit**: Assess existing conditions, utility availability, and environmental factors
- **Code Research**: Identify applicable building codes, standards, and local amendments
- **Stakeholder Meeting**: Coordinate with architect, owner, and other engineers

### Step 2: Utility Coordination
- **Service Requirements**: Calculate total electrical demand and coordinate with utility
- **Service Entrance**: Plan utility connection point and meter locations
- **Backup Power**: Determine need for emergency generators or UPS systems
- **Future Growth**: Plan for anticipated load growth and system expansion

## Phase 2: Design Development (3-4 weeks)

### Step 3: System Design
- **Load Analysis**: Calculate electrical loads for all systems and equipment
- **Distribution Design**: Plan electrical distribution from service to end users
- **Protection Coordination**: Design protective device coordination and arc flash analysis
- **Emergency Systems**: Design emergency power and life safety systems

### Step 4: Plan Development
- **Electrical Plans**: Create detailed floor plans showing all electrical components
- **Schedules**: Develop panel schedules, equipment schedules, and device lists
- **Details**: Prepare typical installation details and specifications
- **Calculations**: Complete all electrical calculations and analysis

## Phase 3: Plan Preparation (1-2 weeks)

### Step 5: Document Preparation
- **Drawing Standards**: Ensure all drawings meet local submission requirements
- **Specification Writing**: Prepare detailed technical specifications
- **Calculation Package**: Organize all calculations in logical sequence
- **Code Compliance**: Document compliance with applicable codes and standards

### Step 6: Quality Review
- **Internal Review**: Conduct thorough review of all documents for completeness
- **Coordination Check**: Verify coordination with architectural and mechanical plans
- **Code Check**: Confirm all code requirements are addressed
- **Calculation Verification**: Double-check all calculations for accuracy

## Phase 4: Professional Review (1 week)

### Step 7: PECE Review
- **Technical Review**: Professional engineer reviews all technical aspects
- **Code Compliance**: Verify compliance with current codes and standards
- **Quality Assurance**: Check calculations, specifications, and plan coordination
- **Professional Seal**: Apply professional engineer seal and signature

### Step 8: Final Preparation
- **Document Assembly**: Organize submission package per local requirements
- **Cover Letter**: Prepare submittal cover letter highlighting key project features
- **Fee Calculation**: Calculate and prepare plan review fees
- **Submission Checklist**: Verify all required documents are included

## Phase 5: Plan Submission (1 day)

### Step 9: Official Submission
- **Plan Review Application**: Complete all required application forms
- **Fee Payment**: Submit required plan review fees
- **Document Delivery**: Deliver required number of plan sets and digital files
- **Receipt Confirmation**: Obtain receipt confirmation and tracking number

## Phase 6: Plan Review Process (2-4 weeks)

### Step 10: Review Period
- **Patience**: Allow adequate time for thorough plan review
- **Availability**: Be available for reviewer questions or clarifications
- **Coordination**: Maintain communication with other design team members
- **Preparation**: Begin preparing for potential comments or revisions

### Step 11: Comment Response
- **Review Comments**: Carefully analyze all plan review comments
- **Technical Response**: Prepare technical responses and plan revisions
- **Code Clarification**: Request clarification on unclear comments if needed
- **Revision Preparation**: Prepare revised plans addressing all comments

## Phase 7: Plan Approval (1-2 weeks)

### Step 12: Resubmission
- **Revised Plans**: Submit revised plans with comment responses
- **Change Documentation**: Clearly mark all changes and additions
- **Response Letter**: Include detailed response to each comment
- **Additional Fees**: Pay any additional review fees required

### Step 13: Final Approval
- **Approved Plans**: Receive approved plans with official stamps
- **Permit Issuance**: Obtain electrical permit for construction
- **Plan Distribution**: Distribute approved plans to contractor and team
- **Construction Authorization**: Authorize construction to begin

## Phase 8: Construction Support (Ongoing)

### Step 14: Construction Oversight
- **Progress Inspections**: Conduct periodic construction inspections
- **Field Questions**: Respond to contractor questions and field conditions
- **Change Management**: Review and approve any necessary field changes
- **Quality Control**: Ensure installation matches approved plans

### Step 15: Final Inspection
- **System Testing**: Witness system testing and commissioning
- **Punch List**: Prepare punch list of items requiring correction
- **Documentation**: Compile as-built drawings and test reports
- **Certificate of Compliance**: Obtain final certificate of occupancy

## Success Tips

### Do:
- Start early and allow adequate time for each phase
- Maintain clear communication with all stakeholders
- Address comments thoroughly and professionally
- Keep detailed documentation throughout the process

### Don't:
- Rush the design process to meet unrealistic deadlines
- Submit plans without proper PECE review and seal
- Ignore plan review comments or provide incomplete responses
- Begin construction without approved plans and permits

## Conclusion

Plan approval success depends on thorough preparation, professional design, and systematic execution. While the process requires patience and attention to detail, following these steps ensures your electronics engineering plans will be approved efficiently and correctly.

Remember: investing time in proper planning and design upfront saves significant time and cost during construction and occupancy phases.`,
        imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Process Guide",
        tags: ["Plan Approval", "Step-by-Step", "Process", "Project Management"],
        readTime: "12 min read",
        publishedAt: new Date("2024-01-30"),
        createdAt: new Date("2024-01-30")
      }
    ];

    sampleArticles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = { 
      ...project, 
      id, 
      status: project.status || "draft",
      technologies: project.technologies as string[],
      createdAt: new Date(),
      longDescription: project.longDescription || null,
      projectUrl: project.projectUrl || null,
      githubUrl: project.githubUrl || null,
      gallery: project.gallery as string[] | null || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject: Project = { 
      ...existingProject, 
      ...project,
      technologies: project.technologies ? project.technologies as string[] : existingProject.technologies,
      longDescription: project.longDescription !== undefined ? project.longDescription : existingProject.longDescription,
      projectUrl: project.projectUrl !== undefined ? project.projectUrl : existingProject.projectUrl,
      githubUrl: project.githubUrl !== undefined ? project.githubUrl : existingProject.githubUrl,
      gallery: project.gallery !== undefined ? project.gallery as string[] | null : existingProject.gallery
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      status: "new",
      createdAt: new Date(),
      company: submission.company || null,
      service: submission.service || null
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const newArticle: Article = { 
      ...article, 
      id,
      tags: article.tags ? article.tags as string[] : [],
      createdAt: new Date(),
      publishedAt: new Date()
    };
    this.articles.set(id, newArticle);
    return newArticle;
  }
}

export const storage = new MemStorage();
