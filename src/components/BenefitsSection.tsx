import { motion } from "motion/react";
import { Users, Briefcase, Network, Award } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Communauté Privée",
    description: "Accès aux mentors, pairs et mises à jour hebdomadaires de ressources"
  },
  {
    icon: Briefcase,
    title: "Projets Réels",
    description: "Construisez des projets prêts pour votre portfolio qui démontrent vos compétences"
  },
  {
    icon: Network,
    title: "Réseau & Opportunités",
    description: "Connectez-vous avec des opportunités mondiales et développeurs partageant les mêmes idées"
  },
  {
    icon: Award,
    title: "Récompenses de Performance",
    description: "Les meilleurs performers reçoivent des projets freelance à la fin"
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function BenefitsSection() {
  return (
    <section className="relative px-6 py-32 border-t border-gray-800/50">
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
            Avantages
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
            Écosystème Complet
          </h2>
        </motion.div>
        
        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/40 to-black/40 dark:from-gray-900/40 dark:to-black/40 light:from-gray-50/80 light:to-white/80 backdrop-blur-sm space-y-6 group-hover:border-gray-700 dark:group-hover:border-gray-700 light:group-hover:border-gray-300 transition-all duration-300">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">{benefit.title}</h4>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
