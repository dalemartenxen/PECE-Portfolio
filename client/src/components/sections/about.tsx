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
              About the <span className="gradient-text">Service</span>
            </h2>
            
            <div className="space-y-6 text-lg text-secondary-foreground leading-relaxed">
              <p data-testid="text-about-paragraph-1">
                Our professional electronics engineering consultancy services are founded on the mandate of <span className="text-primary font-semibold">Republic Act No. 9292, otherwise known as the Electronics Engineering Law of 2004</span>. Under <span className="text-primary font-semibold">Section 5 of the Act</span>, the scope and practice of Electronics Engineers cover the application of engineering sciences and principles in the design, planning, construction, installation, operation, testing, maintenance, and management of electronic systems and networks across various fields such as ICT, telecommunications, broadcasting, industrial and consumer electronics, avionics, aerospace, medical electronics, robotics, biometrics, and convergent technologies.
              </p>
              
              <p data-testid="text-about-paragraph-2">
                What sets the <span className="text-primary font-semibold">Professional Electronics Engineer (PECE)</span> apart is the <span className="text-primary font-semibold">exclusive authority</span> granted under RA 9292, Section 5(b) — the sole authority to provide consulting services and to sign and seal electronics engineering plans, designs, specifications, reports, permit applications, and other technical documents prepared by themselves or under their direct supervision. This ensures not only technical soundness but also legal validity and regulatory compliance for projects requiring electronics engineering expertise.
              </p>
              
              <p data-testid="text-about-paragraph-3">
                Our services guarantee that every design, document, and certification is backed by the competence, responsibility, and professional accountability of a duly licensed Professional Electronics Engineer, as required by law.
              </p>
            </div>

            {/* Core Services */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Core Services</h3>
              <div className="space-y-3 text-base">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>PECE Consultancy in compliance with RA 9292</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sign & Seal of Electronics Engineering Designs and Technical Documents</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Fire Detection and Alarm Systems (FDAS) and Electronics Systems Integration</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Regulatory Compliance Support for LGUs, Government Agencies, and the Private Sector</span>
                </div>
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
