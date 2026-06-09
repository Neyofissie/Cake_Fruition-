import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Process", href: "#order" },
    { name: "AI Planner", href: "#ai-planner" }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled
            ? "bg-off-white/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border-muted-border/50"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Brand Wordmark */}
          <a 
            href="#home"
            className="flex select-none group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <Logo variant="horizontal" theme="light" size="md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal hover:text-primary-black relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Call-to-action layout right */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/447847996397"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary-black bg-primary-black px-6 py-2.5 text-[10px] tracking-widest uppercase text-white hover:bg-transparent hover:text-primary-black transition-all duration-300 font-sans font-medium"
            >
              Order Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hamburger Mobile button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary-black aria-label='Toggle Menu'"
            aria-label="Open Navigation List"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-primary-black/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-4/5 max-w-[340px] bg-[#FAF8F4] border-l border-muted-border p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8 pt-10">
                <Logo variant="vertical" theme="light" size="lg" className="!items-start !text-left" />

                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="font-sans text-xs tracking-[0.25em] uppercase text-charcoal hover:text-primary-black py-2.5 border-b border-muted-border/30 flex items-center justify-between"
                    >
                      {link.name}
                      {link.name === "AI Planner" && <Sparkles className="w-3.5 h-3.5 text-medium-grey" />}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/447847996397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary-black text-white px-5 py-3 text-xs tracking-widest uppercase font-medium border border-primary-black"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <p className="font-sans text-[9px] text-center text-medium-grey leading-relaxed">
                  Creating Sweet Moments, One Cake at a Time.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
