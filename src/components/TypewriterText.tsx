import { useState, useEffect } from "react";
import { motion } from "motion/react";
import React from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting (ms)
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

export function TypewriterText({
  text,
  speed = 80,
  delay = 0,
  className = "",
  showCursor = true,
  cursorChar = "|",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, isTyping]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block ml-0.5 text-emerald-400 dark:text-emerald-400 light:text-emerald-600"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}
