import { motion } from "motion/react";
import { Brain, Wrench, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Workflows IA",
    description: "Maîtrisez l'IA pour accélérer l'écriture de code, le débogage et la documentation. Intégrez l'IA dans votre processus de développement et automatisez les tâches répétitives.",
    highlights: [
      "Assistance code par IA",
      "Déploiement & tests automatisés",
      "Systèmes de productivité intelligents"
    ]
  },
  {
    icon: Wrench,
    title: "Outils & Infrastructure",
    description: "Immersion dans les stacks web modernes, déploiement cloud et architectures de projets réels. Construisez des produits scalables dès le premier jour.",
    highlights: [
      "Git, CI/CD, intégrations API",
      "Next.js, React, Node, Docker",
      "Pratiques Cloud & DevOps"
    ]
  },
  {
    icon: TrendingUp,
    title: "Carrière & Croissance",
    description: "Apprenez à monétiser vos compétences via le freelancing, SaaS ou travail en agence. Construisez votre marque personnelle et positionnez-vous pour les opportunités mondiales.",
    highlights: [
      "Freelancing & communication client",
      "Stratégies de personal branding",
      "Opportunités internationales"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function PillarsSection() {
  return (
    <section className="relative px-6 py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 space-y-4"
        >
          <div className="inline-block text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-sm font-mono tracking-wider uppercase">
            Approche
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
            Trois Piliers de Maîtrise
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-2xl mx-auto text-lg">
            Construit autour des compétences pratiques qui vous rendent plus rapide, intelligent et précieux.
          </p>
        </motion.div>
        
        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {/* Subtle glow on hover */}
                <div className="absolute -inset-px bg-gradient-to-b from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/50 to-black/50 dark:from-gray-900/50 dark:to-black/50 light:from-gray-50/80 light:to-white/80 backdrop-blur-sm space-y-6 group-hover:border-gray-700 dark:group-hover:border-gray-700 light:group-hover:border-gray-300 transition-colors duration-300">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/15 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">{pillar.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{pillar.description}</p>
                  
                  {/* Highlights */}
                  <ul className="space-y-3 pt-2">
                    {pillar.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-500 dark:text-gray-500 light:text-gray-700">
                        <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600 shrink-0"></span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
