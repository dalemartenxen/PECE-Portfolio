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
    window.open('https://dictbataan.substack.com/', '_blank');
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
                PECE <span className="gradient-text">Knowledge Hub</span>
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
                      dictbataan.substack.com
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You'll Find Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">What You'll Find on My Substack</h2>
              <p className="text-xl text-secondary-foreground max-w-3xl mx-auto">
                Comprehensive guides and insights to help you succeed with your electronics engineering projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Compliance Guides",
                  description: "Step-by-step guides on RA 9292 compliance, PECE requirements, and regulatory processes for your projects."
                },
                {
                  icon: BookOpen,
                  title: "Technical Articles",
                  description: "In-depth articles covering electronics engineering best practices, common mistakes, and professional insights."
                },
                {
                  icon: Users,
                  title: "Case Studies",
                  description: "Real-world examples and scenarios showing when and how PECE services are essential for project success."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
}