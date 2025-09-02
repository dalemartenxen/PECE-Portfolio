import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [, setLocation] = useLocation();

  const handleViewDetails = () => {
    setLocation(`/project/${project.id}`);
    // Scroll to top of page after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 50);
  };

  return (
    <motion.div 
      className="project-card bg-card border border-border rounded-xl overflow-hidden cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleViewDetails}
      data-testid={`project-card-${project.id}`}
    >
      <div className="relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-48 object-cover" 
          data-testid={`img-project-${project.id}`}
        />
        
        <div className="project-overlay absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
          <div className="p-4">
            <span className="text-primary text-sm font-semibold">View Details</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" data-testid={`text-project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-secondary-foreground text-sm mb-4" data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </p>
        
        
      </div>
    </motion.div>
  );
}
