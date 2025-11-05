import { motion } from "motion/react";
import { Terminal, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedGridBeams } from "./AnimatedGridBeams";
import { useRef } from "react";

export function HeroSection({ onScrollToForm }: { onScrollToForm: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* Gradient + noise background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        <div className="hero-gradient"></div>
        <div className="hero-noise"></div>
      </div>
      <AnimatedGridBeams containerRef={sectionRef} />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="space-y-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
              <span className="text-emerald-300/90 dark:text-emerald-300/90 light:text-emerald-700 font-mono text-sm tracking-wide">Programme Nouvelle Génération</span>
            </div>
          </motion.div>
          
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-center"
          >
            <h1 className="space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] tracking-tight"
              >
                <span className="block text-gray-100 dark:text-gray-100 light:text-gray-900">Construire Plus Vite.</span>
                <span className="block text-gray-100 dark:text-gray-100 light:text-gray-900">Livrer Plus Smart.</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 dark:from-emerald-400 dark:to-emerald-300 light:from-emerald-600 light:to-emerald-500 bg-clip-text text-transparent">
                  Être Embauché.
                </span>
              </motion.div>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg leading-relaxed"
            >
              Formation pratique boostée par l'IA pour transformer les développeurs africains 
              en builders complets. Maîtrisez les outils, workflows et stratégies qui vous rendent{" "}
              <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">employable</span>.
            </motion.p>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={onScrollToForm}
              className="group h-12 px-8 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 light:bg-emerald-600 light:hover:bg-emerald-700 text-black dark:text-black light:text-white border-0"
            >
              Explorer la Documentation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200/50 rounded-2xl overflow-hidden max-w-4xl mx-auto"
          >
            {[
              { label: "Sessions Live", value: "Chaque Semaine", desc: "Deep-dives IA & Dev" },
              { label: "Projets Réels", value: "Portfolio Pro", desc: "Prêts à montrer" },
              { label: "Top Performers", value: "Missions Réelles", desc: "Freelancing garanti" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-white p-8 hover:bg-[#0d0d0d] dark:hover:bg-[#0d0d0d] light:hover:bg-gray-50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2">
                  <div className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-sm font-mono tracking-wide">{stat.label}</div>
                  <div className="text-gray-200 dark:text-gray-200 light:text-gray-900 text-xl">{stat.value}</div>
                  <div className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-sm">{stat.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
