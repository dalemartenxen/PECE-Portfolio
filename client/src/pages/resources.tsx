import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Clock, Tag } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@shared/schema";
import { Link } from "wouter";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("all");

  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "auto" });
    
    document.title = "Resources - PECE Knowledge Hub | ElectroPro Engineering";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Educational resources, guides, and insights for electronics engineering compliance, PECE requirements, and professional services.');
    }
  }, []);

  // Get unique categories from articles
  const categories = useMemo(() => {
    if (!articles) return [];
    return [...new Set(articles.map(a => a.category))];
  }, [articles]);

  // Filter articles based on applied search criteria
  const filteredArticles = useMemo(() => {
    if (!articles) return [];

    return articles.filter(article => {
      const matchesSearch = appliedSearchTerm === "" || 
        article.title.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(appliedSearchTerm.toLowerCase()));
      
      const matchesCategory = appliedCategory === "all" || article.category === appliedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [articles, appliedSearchTerm, appliedCategory]);

  const handleSearch = () => {
    // Apply the current search criteria when Search button is clicked
    setAppliedSearchTerm(searchTerm);
    setAppliedCategory(selectedCategory);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading resources...</p>
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
            <h1 className="text-2xl font-bold mb-4">Error Loading Resources</h1>
            <p className="text-muted-foreground mb-6">
              Failed to load resources. Please try again later.
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
                data-testid="text-resources-page-title"
              >
                PECE <span className="gradient-text">Knowledge Hub</span>
              </h1>
              <p 
                className="text-xl text-secondary-foreground max-w-3xl mx-auto mb-12"
                data-testid="text-resources-page-description"
              >
                Educational resources, compliance guides, and professional insights to help you navigate electronics engineering requirements and regulatory processes.
              </p>

              {/* Search and Filter Section */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
                {/* Search Input - Centered with reduced width */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search articles by keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-articles"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-6">
                  <div className="w-full max-w-sm">
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
                  </div>
                </div>

                {/* Search Button - Centered with same width as search input */}
                <div className="flex justify-center">
                  <Button 
                    onClick={handleSearch}
                    className="gradient-bg w-full max-w-sm"
                    data-testid="button-search-articles"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Articles
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredArticles.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-muted-foreground" data-testid="text-results-count">
                    Showing {filteredArticles.length} of {articles?.length || 0} articles
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <Link href={`/resource/${article.id}`}>
                          <CardHeader>
                            <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                              <img 
                                src={article.imageUrl} 
                                alt={article.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                data-testid={`img-article-${article.id}`}
                              />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                                {article.category}
                              </Badge>
                              <div className="flex items-center text-muted-foreground text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                {article.readTime}
                              </div>
                            </div>
                            <CardTitle className="line-clamp-2" data-testid={`text-article-title-${article.id}`}>
                              {article.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="line-clamp-3 mb-4" data-testid={`text-article-description-${article.id}`}>
                              {article.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-2">
                              {article.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {article.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{article.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
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
                <h3 className="text-2xl font-bold mb-4">No Articles Found</h3>
                <p className="text-muted-foreground">
                  No articles match your current search criteria. Try adjusting your filters.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}