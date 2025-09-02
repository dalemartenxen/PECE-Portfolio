import { Button } from '../ui/button';

const services = [
  {
    title: "Circuit Design & Analysis",
    description: "Custom analog and digital circuit design with comprehensive analysis and simulation",
    features: ["Schematic Design", "SPICE Simulation", "Component Selection", "Design Verification"]
  },
  {
    title: "Embedded Systems",
    description: "Complete embedded system development from concept to production",
    features: ["Microcontroller Programming", "Real-time Systems", "IoT Integration", "Firmware Development"]
  },
  {
    title: "PCB Design",
    description: "Professional PCB layout and design services for optimal performance",
    features: ["Multi-layer Designs", "High-Speed Digital", "RF/Microwave", "EMC Compliance"]
  },
  {
    title: "Consulting & Review",
    description: "Expert technical consulting and design review services",
    features: ["Design Reviews", "Technical Audits", "Regulatory Guidance", "Expert Witness"]
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Professional Services
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive electronics engineering services backed by professional expertise and industry experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}