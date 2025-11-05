import React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ThemeProvider } from "./components/ThemeProvider";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { HeroSection } from "./components/HeroSection";
import { DocsNavigation } from "./components/DocsNavigation";
import { DocsContent } from "./components/DocsContent";
import { RegistrationForm } from "./components/RegistrationForm";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Code2, Menu, X } from "lucide-react";
import { Button } from "./components/ui/button";

function AppContent() {
  const formRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDocs = () => {
    docsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === "register") {
      scrollToForm();
    } else {
      setActiveSection(sectionId);
      docsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Hide scroll indicator after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroTop = heroRef.current.offsetTop;
        const viewportTop = window.scrollY;
        // Hide when viewport top has passed the hero section bottom
        setShowScrollIndicator(viewportTop < heroTop + 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 transition-colors duration-300">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 dark:border-gray-800/50 light:border-gray-200/50 backdrop-blur-xl bg-black/80 dark:bg-black/80 light:bg-white/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Code2 className="w-5 h-5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
              </div>
              <span className="text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">Bootcamp</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              <button 
                onClick={scrollToDocs}
                className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 transition-colors text-sm font-mono tracking-wide"
              >
                Documentation
              </button>
              <Button 
                onClick={scrollToForm}
                size="sm"
                className="h-9 px-5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 border border-emerald-500/30 font-mono"
              >
                Postuler
              </Button>
              <ThemeSwitcher />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800/50 dark:border-gray-800/50 light:border-gray-200/50 bg-black/95 dark:bg-black/95 light:bg-white/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-2">
              <button
                onClick={scrollToDocs}
                className="w-full text-left px-4 py-3 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 hover:bg-emerald-500/5 rounded-lg transition-colors font-mono text-sm"
              >
                Documentation
              </button>
              <button
                onClick={scrollToForm}
                className="w-full text-left px-4 py-3 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-emerald-400 dark:hover:text-emerald-400 light:hover:text-emerald-600 hover:bg-emerald-500/5 rounded-lg transition-colors font-mono text-sm"
              >
                Postuler
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main */}
      <main className="relative z-10">
        {/* Hero Section */}
        <div ref={heroRef} className="pt-16">
          <HeroSection onScrollToForm={scrollToDocs} />
        </div>
        
        {/* Docs Section */}
        <div ref={docsRef} className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
              {/* Sidebar Navigation - Hidden on mobile, shown as floating menu */}
              <aside className="hidden lg:block">
                <DocsNavigation 
                  activeSection={activeSection} 
                  onSectionClick={handleSectionClick}
                />
              </aside>

              {/* Mobile Navigation - Horizontal scroll */}
              <div className="lg:hidden overflow-x-auto pb-4 -mx-6 px-6">
                <div className="flex gap-2 min-w-max">
                  {[
                    { id: "introduction", label: "Introduction" },
                    { id: "pillars", label: "Trois Piliers" },
                    { id: "benefits", label: "Avantages" },
                    { id: "register", label: "Inscription" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionClick(item.id)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-mono whitespace-nowrap transition-all
                        ${activeSection === item.id
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'text-gray-500 hover:text-gray-300 border border-gray-800'
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="min-w-0">
                <DocsContent activeSection={activeSection} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration Section */}
        <div ref={formRef} className="border-t border-gray-800/50">
          <RegistrationForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 dark:border-gray-800/50 light:border-gray-200/50 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500 light:text-gray-600">
              <Code2 className="w-4 h-4 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
              <span className="text-sm">© 2025 Bootcamp. Conçu pour les développeurs africains.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-600 light:text-gray-500 font-mono text-sm">
              <span>{"// Apprendre"}</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">→</span>
              <span>Construire</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">→</span>
              <span>Gagner</span>
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">→</span>
              <span>Grandir</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden lg:block pointer-events-none"
        >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-gray-800 dark:border-gray-800 light:border-gray-300 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600"
          ></motion.div>
        </motion.div>
      </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider children={<React.Fragment />}>
      <AppContent />
    </ThemeProvider>
  );
}
