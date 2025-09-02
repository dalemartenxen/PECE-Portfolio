import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Professional Electronics Engineer
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Licensed Professional Engineer specializing in electronics design, embedded systems, and engineering consulting
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Projects
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}