import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from "@shared/schema";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "auto" });
    
    document.title = "All Projects - ElectroPro Engineering";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse all electronics engineering projects including IoT systems, power management, medical devices, and automation solutions.');
    }
  }, []);

  // Get unique categories and statuses from projects
  const categories = useMemo(() => {
    if (!projects) return [];
    return [...new Set(projects.map(p => p.category))];
  }, [projects]);

  const statuses = useMemo(() => {
    if (!projects) return [];
    return [...new Set(projects.map(p => p.status))];
  }, [projects]);

  // Filter projects based on search criteria
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter(project => {
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  const handleSearch = () => {
    // Search is already reactive through useMemo, but this function can be used for explicit search
    // The filtering happens automatically when any search criteria changes
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedStatus("all");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Projects</h1>
            <p className="text-muted-foreground mb-6">
              Failed to load projects. Please try again later.
            </p>
            <Button asChild data-testid="button-back-home">
              <a href="/">Back to Home</a>
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
              className="text-center mb-12"
            >
              <h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                data-testid="text-projects-page-title"
              >
                All <span className="gradient-text">Projects</span>
              </h1>
              <p 
                className="text-xl text-secondary-foreground max-w-3xl mx-auto mb-12"
                data-testid="text-projects-page-description"
              >
                Explore our complete portfolio of electronics engineering solutions across various industries and applications.
              </p>

              {/* Search and Filter Section */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Search Input */}
                  <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search projects by name or keyword..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-projects"
                    />
                  </div>

                  {/* Category Dropdown */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Status Dropdown */}
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleSearch}
                    className="gradient-bg"
                    data-testid="button-search-projects"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Projects
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-muted-foreground" data-testid="text-results-count">
                    Showing {filteredProjects.length} of {projects?.length || 0} projects
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  No projects match your current search criteria. Try adjusting your filters.
                </p>
                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  data-testid="button-clear-filters-no-results"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}