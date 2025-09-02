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
        <div className="max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
              About the <span className="gradient-text">Service</span>
            </h2>
            
            <div className="space-y-6 text-lg text-secondary-foreground leading-relaxed text-left max-w-none">
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
          </motion.div>


          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6 text-primary">Core Services</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
