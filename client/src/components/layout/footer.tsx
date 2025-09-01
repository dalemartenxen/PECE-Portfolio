import { motion } from "framer-motion";
import { Mail, Linkedin, Facebook } from "lucide-react";
import { useLocation } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [location, setLocation] = useLocation();

  const quickLinks = [
    { name: "Case Studies", href: "/projects", type: "page" },
    { name: "Resources", href: "/resources", type: "page" },
    { name: "Services", href: "/#services", type: "section" },
    { name: "About", href: "/#about", type: "section" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Compliance", href: "#compliance" },
  ];

  const handleLinkClick = (href: string, type: string) => {
    if (type === "page") {
      // For page navigation, use client-side routing
      setLocation(href);
      // Scroll to top of the page after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // For section navigation, check if we're on home page
      if (location !== "/") {
        // If we're not on home page, navigate to home first
        setLocation("/");
        // Wait for navigation then scroll to section
        setTimeout(() => {
          const targetId = href.replace("/#", "");
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = 64; // Account for fixed navbar
            const offsetPosition = element.offsetTop - navbarHeight - 20;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 150);
      } else {
        // If we're on home page, scroll to section immediately
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = 64; // Account for fixed navbar
          const offsetPosition = element.offsetTop - navbarHeight - 20;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
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
                if (location !== "/") {
                  setLocation("/");
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 150);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-2xl font-bold gradient-text mb-4 block"
              data-testid="link-footer-logo"
            >
              PECE Consultancy and Sign-Seal Services
            </a>
            <p className="text-secondary-foreground mb-6 max-w-md" data-testid="text-footer-description">
              Professional electronics engineering services specializing in consultancy, design, and regulatory compliance.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:sddgmes@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid="link-footer-email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/sddmartensen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/sddgmes" 
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
                      handleLinkClick(link.href, link.type);
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

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      // These are placeholder links for now
                    }}
                    className="text-secondary-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`link-footer-legal-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <hr className="border-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            © {currentYear} PECE Consultancy and Sign-Seal Services. All rights reserved.
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
