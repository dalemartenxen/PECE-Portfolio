import { motion } from "framer-motion";
import { Award, GraduationCap, Shield, Tag } from "lucide-react";

export default function About() {
  const credentials = [
    {
      icon: Tag,
      title: "Professional Electronics Engineer",
    },
    {
      icon: Tag,
      title: "Associate ASEAN Engineer",
    },
  ];

  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
              About the <span className="gradient-text">Engineer</span>
            </h2>
            
            <div className="space-y-6 text-lg text-secondary-foreground leading-relaxed">
              <p data-testid="text-about-paragraph-1">
                With years of experience in electronics engineering, I provide PECE consultancy and sign-seal services for electronic design & systems and regulatory compliance.
              </p>
              
              <p data-testid="text-about-paragraph-2">
                My expertise spans across Information and Communications Technology (ICT), Telecommunications (Outside Plant Design), Fire Detection and Alarm System (FDAS) and Electronics Systems Design. I hold professional engineering licenses and certifications that enable me to provide legally binding engineering certifications and documentation.
              </p>
              
              <p data-testid="text-about-paragraph-3">
                I work with local companies, local government units, and government agencies to ensure their electronics engineering needs meet all regulatory requirements and maintaining industry-standard compliant and cost-effectiveness.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Professional Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <motion.div
                    key={credential.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                    data-testid={`credential-${index}`}
                  >
                    <credential.icon className="h-5 w-5 text-primary" />
                    <span>{credential.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional engineer working on electronics design" 
              className="rounded-2xl shadow-2xl w-full" 
              data-testid="img-about-engineer"
            />
            
            {/* Stats Overlays */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              data-testid="stat-years-experience"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">7+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              data-testid="stat-projects-completed"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
