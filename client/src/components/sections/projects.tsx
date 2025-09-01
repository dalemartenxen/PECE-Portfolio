import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const handleVisitSubstack = () => {
    window.open('https://dictbataan.substack.com/', '_blank');
  };

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
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto" data-testid="text-projects-description">I share case studies and scenarios showing when a Professional Electronics Engineer services are essential for project success.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Read Case Studies on Substack</h3>
            <p className="text-secondary-foreground mb-8">This will redirect you to my Substack site</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleVisitSubstack}
                size="lg"
                className="gradient-bg text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                data-testid="button-view-case-studies"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Case Studies
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              dictbataan.substack.com
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}