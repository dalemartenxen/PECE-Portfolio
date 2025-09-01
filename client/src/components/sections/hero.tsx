import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      {/* Moving Electrons Background */}
      <div className="absolute inset-0">
        {/* Circuit board pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,107,0,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Moving electrons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                opacity: [0.6, 0.2, 0.8, 0.6],
                scale: [1, 1.5, 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Electron trails */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              style={{
                top: `${20 + i * 10}%`,
                transformOrigin: 'left center',
              }}
              animate={{
                scaleX: [0, 1, 0],
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Professional Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              <span className="text-foreground">Professional</span>
              <br />
              <span className="gradient-text">Electronics Engineer</span>
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium" data-testid="text-hero-subtitle">
              Consultancy and Sign-Seal Services
            </h2>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-secondary-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-tagline">
              Ensuring compliance and delivering quality electronics engineering services with industry training and experience.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              className="gradient-bg text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
              onClick={() => handleScrollTo('services')}
              data-testid="button-explore-services"
            >
              Explore Services
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-border text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
              onClick={() => handleScrollTo('contact')}
              data-testid="button-get-in-touch"
            >
              Contact us
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
