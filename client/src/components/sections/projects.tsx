import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";
import { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading scenarios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              When You Need a <span className="gradient-text">PECE</span>
            </h2>
            <p className="text-xl text-destructive">Failed to load scenarios. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredProjects = projects?.slice(0, 6) || [];

  return (
    <section id="projects" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-projects-title">
            When You Need a <span className="gradient-text">PECE</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto" data-testid="text-projects-description">
            Common scenarios where Professional Electronics Engineer is needed for safety, compliance, and regulatory approval.
          </p>
        </motion.div>

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                asChild
                className="gradient-bg text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                data-testid="button-view-all-projects"
              >
                <Link href="/projects">View All Scenarios</Link>
              </Button>
            </motion.div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">No scenarios available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
