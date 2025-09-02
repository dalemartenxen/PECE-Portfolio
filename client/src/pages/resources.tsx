import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText, Users } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "auto" });
    
    document.title = "Resources - PECE Knowledge Hub | ElectroPro Engineering";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Educational resources, guides, and insights for electronics engineering compliance, PECE requirements, and professional services published on Substack.');
    }
  }, []);

  const handleVisitSubstack = () => {
    window.open('https://pececonsultancy.substack.com/', '_blank');
  };

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
              className="text-center"
            >
              <h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                data-testid="text-resources-page-title"
              >
                Knowledge <span className="gradient-text">Resources</span>
              </h1>
              <p 
                className="text-xl text-secondary-foreground max-w-3xl mx-auto mb-12"
                data-testid="text-resources-page-description"
              >
                I publish educational resources, compliance guides, and professional insights on Substack to help you navigate electronics engineering requirements and regulatory processes.
              </p>

              {/* Substack CTA Card */}
              <div className="max-w-2xl mx-auto">
                <Card className="bg-card/50 backdrop-blur-sm border border-border">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Visit My Substack</CardTitle>
                    <CardDescription className="text-base">
                      Find all my latest articles, guides, and educational content on electronics engineering and PECE compliance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      onClick={handleVisitSubstack}
                      size="lg"
                      className="gradient-bg mb-4"
                      data-testid="button-visit-substack"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Read on Substack
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      pececonsultancy.substack.com
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        

        
      </main>

      <Footer />
    </div>
  );
}