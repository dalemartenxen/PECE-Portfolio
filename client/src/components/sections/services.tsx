import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/service-card";
import { Handshake, Compass, Stamp } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Handshake,
      title: "PECE Consultancy",
      description: "Technical consultation for electronics design, system architecture and regulatory compliance.",
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
      description: "Electronics design services from concept to implementation, including system design, component selection, and testing.",
      features: [
        "Design & Analysis",
        "Project Implementation",
        "System Design",
        "Testing & Validation"
      ]
    },
    {
      icon: Stamp,
      title: "Sign & Seal Services",
      description: "Professional electronics engineering services for regulatory compliance, product certification, and documentation.",
      features: [
        "PECE Sign & Seal",
        "Compliance Documentation",
        "Regulatory Submissions",
        "Certifications"
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
            Technical <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-secondary-foreground max-w-3xl mx-auto" data-testid="text-services-description">
            Comprehensive electronics engineering services tailored to meet your specific needs and regulatory requirements. Visit our <a href="/resources" className="text-primary hover:underline">Resources</a> section to learn more about compliance guides, professional insights, and educational materials.
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
