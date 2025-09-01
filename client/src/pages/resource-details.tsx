import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Article } from "@shared/schema";
import ReactMarkdown from "react-markdown";

export default function ResourceDetails() {
  const [, params] = useRoute("/resource/:id");
  const [location, setLocation] = useLocation();
  const articleId = params?.id;

  // Optimized navigation functions
  const handleBackToResources = () => {
    setLocation("/resources");
    // Ensure we scroll to top when navigating
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 50);
  };

  const handleGetInTouch = () => {
    setLocation("/");
    // Wait for navigation then scroll to contact section
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        const navbarHeight = 64;
        const offsetPosition = element.offsetTop - navbarHeight - 20;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<Article>({
    queryKey: ["/api/articles", articleId],
    enabled: !!articleId,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Resources | ElectroPro Engineering`;
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button 
              onClick={handleBackToResources}
              data-testid="button-back-resources-error"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
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
        {/* Article Hero Section */}
        <section className="py-20 hero-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                variant="ghost"
                onClick={handleBackToResources}
                className="mb-8 text-muted-foreground hover:text-primary"
                data-testid="button-back-resources"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Button>

              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge variant="secondary" data-testid="badge-article-category">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </div>

                <h1
                  className="text-4xl md:text-5xl font-bold mb-6"
                  data-testid="text-article-title"
                >
                  {article.title}
                </h1>

                <p
                  className="text-xl text-secondary-foreground mb-8"
                  data-testid="text-article-description"
                >
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="aspect-video mb-12 overflow-hidden rounded-xl">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  data-testid="img-article-hero"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
              data-testid="article-content"
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-5">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 ml-6 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="mb-2">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Need Professional Assistance?</h2>
              <p className="text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto">
                If you need help with your electronics engineering project or have questions about PECE requirements, I'm here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleGetInTouch}
                  size="lg"
                  className="gradient-bg"
                  data-testid="button-get-in-touch"
                >
                  Get In Touch
                </Button>
                <Button 
                  onClick={handleBackToResources}
                  size="lg"
                  variant="outline"
                  data-testid="button-more-resources"
                >
                  More Resources
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}