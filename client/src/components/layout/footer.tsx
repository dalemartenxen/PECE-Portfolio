import { motion } from "framer-motion";
import { Mail, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Consultancy", href: "#services" },
    { name: "Electronics Design", href: "#services" },
    { name: "Sign & Seal", href: "#services" },
    { name: "Compliance", href: "#services" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="text-2xl font-bold gradient-text mb-4 block"
              data-testid="link-footer-logo"
            >
              ElectroPro
            </a>
            <p className="text-secondary-foreground mb-6 max-w-md" data-testid="text-footer-description">
              Professional electronics engineering services with over 15 years of experience in consultancy, design, and regulatory compliance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:contact@electroproeng.com" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid="link-footer-email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/electroproeng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/electroproeng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid="link-footer-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-secondary-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(service.href);
                    }}
                    className="text-secondary-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`link-footer-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <hr className="border-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            © {currentYear} ElectroPro Engineering. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              data-testid="link-privacy-policy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              data-testid="link-terms-service"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              data-testid="link-cookie-policy"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
