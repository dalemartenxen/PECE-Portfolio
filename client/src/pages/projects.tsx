import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText, Users, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "auto" });
    
    document.title = "Case Studies - When You Need a PECE | ElectroPro Engineering";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real-world case studies and scenarios showing when you need a Professional Electronics Engineer for compliance, safety, and certification published on Substack.');
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
                data-testid="text-projects-page-title"
              >
                When You Need a <span className="gradient-text">PECE</span>
              </h1>
              <p 
                className="text-xl text-secondary-foreground max-w-3xl mx-auto mb-12"
                data-testid="text-projects-page-description"
              >
                I share real-world case studies and scenarios on Substack showing when Professional Electronics Engineer services are essential for your project's success.
              </p>

              {/* Substack CTA Card */}
              <div className="max-w-2xl mx-auto">
                <Card className="bg-card/50 backdrop-blur-sm border border-border">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">Read Case Studies on Substack</CardTitle>
                    <CardDescription className="text-base">
                      Discover detailed case studies, real-world scenarios, and practical examples of when PECE services are required
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
                      View Case Studies
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

        {/* What You'll Find Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Case Studies You'll Find</h2>
              <p className="text-xl text-secondary-foreground max-w-3xl mx-auto">
                Real scenarios from my experience helping clients navigate PECE requirements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Medical Facilities",
                  description: "Hospital equipment installations, medical device compliance, and critical care system certifications requiring PECE oversight."
                },
                {
                  icon: Lightbulb,
                  title: "Industrial Projects",
                  description: "Manufacturing facility electrical systems, safety interlocks, and high-power equipment installations with PECE requirements."
                },
                {
                  icon: FileText,
                  title: "Commercial Buildings",
                  description: "Office complexes, shopping centers, and public buildings requiring PECE certification for electrical compliance."
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

        {/* CTA Section */}
        <section className="py-20 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Learn from Real Examples</h2>
              <p className="text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto">
                Read detailed case studies that show exactly when and why PECE services are needed, helping you avoid costly mistakes and delays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleVisitSubstack}
                  size="lg"
                  className="gradient-bg"
                  data-testid="button-read-case-studies"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Read Case Studies
                </Button>
                <Button 
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      window.location.href = "/#contact";
                    } else {
                      window.location.href = "/";
                    }
                  }}
                  size="lg"
                  variant="outline"
                  data-testid="button-contact-direct"
                >
                  Discuss Your Project
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