import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/service-card";
import { Handshake, Compass, Stamp } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Handshake,
      title: "Engineering Consultancy",
      description: "Expert technical consultation for electronics design, system architecture, compliance strategy, and product development optimization.",
      features: [
        "Technical Design Review",
        "Compliance Assessment", 
        "Risk Analysis",
        "Cost Optimization"
      ]
    },
    {
      icon: Compass,
      title: "Electronics Design",
      description: "Complete electronics design services from concept to production, including PCB design, component selection, and testing protocols.",
      features: [
        "Circuit Design & Analysis",
        "PCB Layout & Routing",
        "Prototype Development",
        "Testing & Validation"
      ]
    },
    {
      icon: Stamp,
      title: "Sign & Seal Services",
      description: "Professional engineering certification and approval services for regulatory compliance, product certification, and legal documentation.",
      features: [
        "P.E. Stamp & Seal",
        "Compliance Documentation",
        "Regulatory Submissions",
        "Safety Certifications"
      ]
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-services-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto" data-testid="text-services-description">
            Comprehensive electronics engineering solutions tailored to meet your specific needs and regulatory requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard {...service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
