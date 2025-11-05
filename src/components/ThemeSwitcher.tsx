import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg border border-gray-800 dark:border-gray-800 light:border-gray-200 bg-gray-900/50 dark:bg-gray-900/50 light:bg-white/80 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100 backdrop-blur-sm transition-colors group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 180
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-emerald-400" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -180
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-emerald-600" />
        </motion.div>
      </div>
    </button>
  );
}
