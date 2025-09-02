export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              About Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              As a licensed Professional Engineer with extensive experience in electronics engineering, 
              I specialize in designing innovative solutions for complex technical challenges.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              My expertise spans circuit design, embedded systems development, signal processing, 
              and regulatory compliance across various industries including automotive, aerospace, 
              and consumer electronics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">License</h3>
                <p className="text-slate-600 dark:text-slate-300">Professional Engineer (PE)</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Experience</h3>
                <p className="text-slate-600 dark:text-slate-300">15+ Years</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Expertise</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Circuit Design & Analysis
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Embedded Systems Development
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Signal Processing & RF Design
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                PCB Layout & Design
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Regulatory Compliance (FCC, CE, UL)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}