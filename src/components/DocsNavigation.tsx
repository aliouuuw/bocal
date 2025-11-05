import { motion } from "motion/react";
import { Brain, Wrench, TrendingUp, Gift, FileText } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "introduction", label: "Introduction", icon: FileText },
  { id: "pillars", label: "Trois Piliers", icon: Brain },
  { id: "benefits", label: "Avantages", icon: Gift },
  { id: "register", label: "Inscription", icon: FileText }
];

interface DocsNavigationProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function DocsNavigation({ activeSection, onSectionClick }: DocsNavigationProps) {
  return (
    <nav className="sticky top-24 space-y-1">
      <div className="mb-6">
        <div className="text-xs font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-600 tracking-wider uppercase mb-4">
          Documentation
        </div>
      </div>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onSectionClick(item.id)}
            className={`
              group relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
              ${isActive 
                ? 'bg-emerald-500/10 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 border border-emerald-500/30' 
                : 'text-gray-500 dark:text-gray-500 light:text-gray-600 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-900 hover:bg-gray-900/50 dark:hover:bg-gray-900/50 light:hover:bg-gray-100/50 border border-transparent'
              }
            `}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeSection"
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400 dark:bg-emerald-400 light:bg-emerald-600 rounded-r"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400 dark:text-emerald-400 light:text-emerald-600' : 'text-gray-600 dark:text-gray-600 light:text-gray-500'}`} />
            <span className="font-mono text-sm">{item.label}</span>
          </button>
        );
      })}
      
      {/* Decorative line */}
      <div className="pt-6 mt-6 border-t border-gray-800/50 dark:border-gray-800/50 light:border-gray-200/50">
        <div className="text-xs text-gray-600 dark:text-gray-600 light:text-gray-500 font-mono">
          <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">{"// "}</span>
          Scroll ou cliquez pour naviguer
        </div>
      </div>
    </nav>
  );
}
