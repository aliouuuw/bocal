import React from "react";
import { motion } from "motion/react";
import { Brain, Wrench, TrendingUp, Users, Briefcase, Network, Award, Terminal, Zap, Globe } from "lucide-react";

const pillarsData = [
  {
    icon: Brain,
    title: "Workflows IA",
    description: "Maîtrisez l'IA pour accélérer l'écriture de code, le débogage et la documentation. Intégrez l'IA dans votre processus de développement et automatisez les tâches répétitives.",
    features: [
      { icon: Terminal, label: "Assistance code par IA", desc: "Utilisez GPT-4, Claude et d'autres modèles pour booster votre productivité" },
      { icon: Zap, label: "Déploiement automatisé", desc: "CI/CD pipelines et workflows d'automatisation avec GitHub Actions" },
      { icon: Brain, label: "Systèmes intelligents", desc: "Construisez des systèmes qui apprennent et s'adaptent" }
    ]
  },
  {
    icon: Wrench,
    title: "Outils & Infrastructure",
    description: "Immersion dans les stacks web modernes, déploiement cloud et architectures de projets réels. Construisez des produits scalables dès le premier jour.",
    features: [
      { icon: Terminal, label: "Git & CI/CD", desc: "Maîtrise du versioning et des pipelines de déploiement continu" },
      { icon: Globe, label: "Stack moderne", desc: "Next.js, React, Node.js, TypeScript, Docker et Kubernetes" },
      { icon: Zap, label: "Cloud & DevOps", desc: "AWS, Vercel, deployment strategies et monitoring" }
    ]
  },
  {
    icon: TrendingUp,
    title: "Carrière & Croissance",
    description: "Apprenez à monétiser vos compétences via le freelancing, SaaS ou travail en agence. Construisez votre marque personnelle et positionnez-vous pour les opportunités mondiales.",
    features: [
      { icon: Users, label: "Freelancing", desc: "Communication client, pricing, et gestion de projets" },
      { icon: Globe, label: "Personal branding", desc: "Portfolio, GitHub profile, et présence en ligne" },
      { icon: TrendingUp, label: "Opportunités globales", desc: "Accès aux marchés internationaux et remote work" }
    ]
  }
];

const benefitsData = [
  {
    icon: Users,
    title: "Communauté Privée",
    description: "Rejoignez une communauté de développeurs ambitieux, accédez aux mentors et recevez des mises à jour hebdomadaires de ressources et opportunités.",
    details: [
      "Canal Slack/Discord privé",
      "Sessions Q&A avec mentors",
      "Partage de ressources exclusives",
      "Networking avec pairs"
    ]
  },
  {
    icon: Briefcase,
    title: "Projets Portfolio",
    description: "Construisez 3-5 projets réels qui démontrent vos compétences et vous démarquent auprès des recruteurs et clients potentiels.",
    details: [
      "Projets guidés étape par étape",
      "Code reviews professionnels",
      "Deployment sur production",
      "Documentation complète"
    ]
  },
  {
    icon: Network,
    title: "Réseau Global",
    description: "Connectez-vous avec des développeurs, entrepreneurs et recruteurs du monde entier. Accédez aux opportunités de remote work.",
    details: [
      "Introductions à des hiring managers",
      "Accès aux job boards exclusifs",
      "Événements networking mensuels",
      "Communauté alumni active"
    ]
  },
  {
    icon: Award,
    title: "Récompenses",
    description: "Les meilleurs performers du bootcamp reçoivent des projets freelance réels payés, vous permettant de commencer à générer des revenus immédiatement.",
    details: [
      "Projets freelance garantis (top 10%)",
      "Certificat de completion",
      "Recommandations LinkedIn",
      "Portfolio showcase sur notre site"
    ]
  }
];

interface DocsContentProps {
  activeSection: string;
}

export function DocsContent({ activeSection }: DocsContentProps) {
  return (
    <div className="space-y-16">
      {/* Introduction Section */}
      {activeSection === "introduction" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-xs font-mono tracking-wider uppercase">
              Aperçu du Programme
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
              Introduction au Bootcamp
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed max-w-3xl">
              Un programme intensif de 12 semaines conçu pour transformer les développeurs africains 
              en builders complets capables de construire, déployer et monétiser des applications modernes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Durée", value: "12 Semaines", desc: "Sessions live + async" },
              { label: "Format", value: "Hybride", desc: "Online + communauté" },
              { label: "Niveau", value: "Intermédiaire", desc: "Bases en dev requises" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/40 to-black/40 dark:from-gray-900/40 dark:to-black/40 light:from-gray-50/80 light:to-white/80">
                <div className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-600 font-mono mb-2">{stat.label}</div>
                <div className="text-2xl text-gray-100 dark:text-gray-100 light:text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-600 light:text-gray-500">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-xl border border-emerald-500/20 dark:border-emerald-500/20 light:border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent dark:from-emerald-500/5 light:from-emerald-500/10">
            <h3 className="text-xl text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono mb-4">Objectif Principal</h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-800 leading-relaxed mb-6">
              Notre mission est de vous équiper avec les compétences, outils et mindset nécessaires pour 
              devenir un développeur hautement employable et capable de générer des revenus via le freelancing, 
              le SaaS ou le travail en agence. Nous ne nous concentrons pas uniquement sur le code, mais sur 
              l'ensemble de l'écosystème qui fait un builder à succès.
            </p>
            <div className="flex flex-wrap gap-2">
              {["IA & Automatisation", "Stack Moderne", "Déploiement Cloud", "Freelancing", "Portfolio Pro"].map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-sm font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pillars Section */}
      {activeSection === "pillars" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-xs font-mono tracking-wider uppercase">
              Curriculum
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
              Trois Piliers de Maîtrise
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed max-w-3xl">
              Notre approche est construite autour de trois piliers fondamentaux qui couvrent 
              toutes les compétences nécessaires pour devenir un builder moderne.
            </p>
          </div>

          <div className="space-y-12">
            {pillarsData.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Icon className="w-6 h-6 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <h2 className="text-2xl text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">{pillar.title}</h2>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-[72px]">
                    {pillar.features.map((feature, featureIdx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={featureIdx} className="p-5 rounded-xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/40 to-black/40 dark:from-gray-900/40 dark:to-black/40 light:from-gray-50/80 light:to-white/80 space-y-3">
                          <FeatureIcon className="w-5 h-5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                          <div>
                            <div className="text-gray-200 dark:text-gray-200 light:text-gray-900 font-mono text-sm mb-1">{feature.label}</div>
                            <div className="text-gray-500 dark:text-gray-500 light:text-gray-700 text-sm leading-relaxed">{feature.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {idx < pillarsData.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 dark:via-gray-800 light:via-gray-300 to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Benefits Section */}
      {activeSection === "benefits" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-xs font-mono tracking-wider uppercase">
              Ce Que Vous Recevez
            </div>
            <h1 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
              Écosystème Complet
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed max-w-3xl">
              Au-delà du contenu technique, vous bénéficiez d'un écosystème complet 
              de support, communauté et opportunités.
            </p>
          </div>

          <div className="space-y-8">
            {benefitsData.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="p-8 rounded-xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/40 to-black/40 dark:from-gray-900/40 dark:to-black/40 light:from-gray-50/80 light:to-white/80 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Icon className="w-6 h-6 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">{benefit.title}</h3>
                      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>

                  <div className="pl-[72px]">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {benefit.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="flex items-start gap-3 text-gray-500 dark:text-gray-500 light:text-gray-700">
                          <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600 shrink-0"></span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
