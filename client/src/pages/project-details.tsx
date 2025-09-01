import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@shared/schema";

export default function ProjectDetails() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;

  const {
    data: project,
    isLoading,
    error,
  } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - ElectroPro Engineering`;
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Button asChild data-testid="button-back-home">
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 hero-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="ghost"
                asChild
                className="mb-8 text-muted-foreground hover:text-primary"
                data-testid="button-back-projects"
              >
                <a href="/#projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </a>
              </Button>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1
                    className="text-4xl md:text-5xl font-bold mb-6"
                    data-testid="text-project-title"
                  >
                    {project.title}
                  </h1>

                  <p
                    className="text-xl text-secondary-foreground mb-8"
                    data-testid="text-project-description"
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    {project.projectUrl && (
                      <Button
                        asChild
                        className="gradient-bg"
                        data-testid="button-view-project"
                      >
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Project
                        </a>
                      </Button>
                    )}

                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        asChild
                        data-testid="button-view-github"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        data-testid={`tech-${tech.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="rounded-2xl shadow-2xl w-full"
                    data-testid="img-project-hero"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Information */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold mb-6">About the Project</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p
                      className="text-secondary-foreground leading-relaxed"
                      data-testid="text-project-long-description"
                    >
                      {project.longDescription || project.description}
                    </p>
                  </div>
                </motion.div>

                {/* Project Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12"
                  >
                    <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.gallery.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imageUrl}
                            alt={`${project.title} - Gallery ${index + 1}`}
                            className="rounded-xl w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            data-testid={`img-gallery-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-6">
                        Project Information
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Tag className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Category
                            </p>
                            <p
                              className="font-semibold"
                              data-testid="text-project-category"
                            >
                              {project.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Completed
                            </p>
                            <p
                              className="font-semibold"
                              data-testid="text-project-date"
                            >
                              {project.createdAt
                                ? new Date(
                                    project.createdAt,
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                  })
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Status
                          </p>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
                              project.status === "completed"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                            data-testid="status-project-status"
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {(project.projectUrl || project.githubUrl) && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <h4 className="font-semibold mb-4">Links</h4>
                          <div className="space-y-3">
                            {project.projectUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="w-full justify-start"
                                data-testid="button-sidebar-project"
                              >
                                <a
                                  href={project.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Live Project
                                </a>
                              </Button>
                            )}

                            {project.githubUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="w-full justify-start"
                                data-testid="button-sidebar-github"
                              >
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="mr-2 h-4 w-4" />
                                  View Source Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact CTA */}
                  <Card className="mt-6">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold mb-2">
                        Interested in Similar Work?
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Let's discuss how I can help with your next project.
                      </p>
                      <Button
                        asChild
                        className="gradient-bg w-full"
                        data-testid="button-contact-cta"
                      >
                        <a href="/#contact">Get In Touch</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
