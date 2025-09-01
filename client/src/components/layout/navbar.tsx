import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Only set up scroll listener on home page
    if (location === "/") {
      let ticking = false;
      
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const sections = ["home", "about", "services", "projects", "contact"];
            const navbarHeight = 64; // 16 * 4 (h-16 in Tailwind)
            const scrollPosition = window.scrollY + navbarHeight + 50; // More precise offset

            let currentSection = "home"; // Default to home section

            for (const section of sections) {
              const element = document.getElementById(section);
              if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;

                // Check if we're within this section's boundaries
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  currentSection = section;
                }
              }
            }

            setActiveSection(currentSection);
            ticking = false;
          });
          ticking = true;
        }
      };

      // Initial call to set correct section on load
      handleScroll();
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Set active section based on current route
      if (location === "/projects") {
        setActiveSection("projects");
      }
    }
  }, [location]);

  const navItems = [
    { name: "Home", href: "/#home", type: "section" },
    { name: "About", href: "/#about", type: "section" },
    { name: "Services", href: "/#services", type: "section" },
    { name: "Projects", href: "/projects", type: "page" },
    { name: "Contact", href: "/#contact", type: "section" },
  ];

  const handleNavClick = (href: string, type: string) => {
    setIsOpen(false);
    
    if (type === "page") {
      // For page navigation, use fast client-side routing
      setLocation(href);
    } else {
      // For section navigation, check if we're on home page
      if (location !== "/") {
        // If we're not on home page, navigate to home first with section
        setLocation("/");
        // Wait for navigation then scroll to section
        setTimeout(() => {
          const targetId = href.replace("/#", "");
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = 64; // Account for fixed navbar
            const offsetPosition = element.offsetTop - navbarHeight - 20; // Extra space for visual comfort
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 150); // Slightly longer delay for page load
      } else {
        // If we're on home page, scroll to section immediately
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = 64; // Account for fixed navbar
          const offsetPosition = element.offsetTop - navbarHeight - 20; // Extra space for visual comfort
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  const isActive = (item: any) => {
    if (item.type === "page") {
      if (item.href === "/projects" && location === "/projects") return true;
      return false;
    } else {
      // For sections, only active when on home page and section matches
      return location === "/" && activeSection === item.href.replace("/#", "");
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
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
              className="text-xl font-bold gradient-text cursor-pointer"
              data-testid="link-logo"
            >
              PECE Consultancy and Sign-Seal Services
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                item.type === "page" ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-300 ${
                      isActive(item)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.type);
                    }}
                    className={`font-medium transition-colors duration-300 ${
                      isActive(item)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary"
              data-testid="button-mobile-menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-card border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.type === "page" ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 font-medium transition-colors duration-300 ${
                    isActive(item)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.type);
                  }}
                  className={`block px-3 py-2 font-medium transition-colors duration-300 ${
                    isActive(item)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
