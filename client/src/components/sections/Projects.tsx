import { Button } from '../ui/button';

const projects = [
  {
    title: "Automotive ECU Development",
    description: "Custom electronic control unit for electric vehicle battery management system",
    technologies: ["ARM Cortex-M", "CAN Bus", "ISO 26262", "Functional Safety"],
    image: "/api/placeholder/400/300"
  },
  {
    title: "IoT Sensor Network",
    description: "Wireless sensor network for industrial monitoring with long-range communication",
    technologies: ["LoRaWAN", "ESP32", "Edge Computing", "Cloud Integration"],
    image: "/api/placeholder/400/300"
  },
  {
    title: "Medical Device Controller",
    description: "FDA-compliant medical device controller with real-time monitoring capabilities",
    technologies: ["IEC 60601", "Real-time OS", "Safety Critical", "Wireless Connectivity"],
    image: "/api/placeholder/400/300"
  },
  {
    title: "RF Communication Module",
    description: "High-frequency communication module for aerospace applications",
    technologies: ["RF Design", "EMC/EMI", "Space-grade", "Custom Protocol"],
    image: "/api/placeholder/400/300"
  }
];

export default function Projects() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A selection of recent engineering projects showcasing innovative solutions across various industries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-2">⚡</div>
                  <p className="text-sm opacity-80">Project Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}