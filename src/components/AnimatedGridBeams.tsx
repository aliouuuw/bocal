import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GridBeam {
  id: number;
  direction: "horizontal" | "vertical";
  gridLine: number;
  startDelay: number;
  duration: number;
  beamLength: number;
  opacity: number;
}

interface AnimatedGridBeamsProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export function AnimatedGridBeams({ containerRef }: AnimatedGridBeamsProps) {
  // Grid configuration
  const GRID_SIZE = 40;
  const BASE_BEAM_LENGTH = 120;
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Generate random beams once on mount
  const [beams, setBeams] = useState<GridBeam[]>([]);

  useEffect(() => {
    const generateBeams = () => {
      const gridCols = Math.ceil(dimensions.width / GRID_SIZE) + 4;
      const gridRows = Math.ceil(dimensions.height / GRID_SIZE) + 4;
      
      const newBeams: GridBeam[] = [];
      const beamCount = 8; // More beams for richer effect

      for (let i = 0; i < beamCount; i++) {
        const isHorizontal = Math.random() > 0.5;
        const maxGridLine = isHorizontal ? gridRows : gridCols;
        
        newBeams.push({
          id: i,
          direction: isHorizontal ? "horizontal" : "vertical",
          gridLine: Math.floor(Math.random() * maxGridLine),
          startDelay: Math.random() * 5, // Random delay 0-5s
          duration: 5 + Math.random() * 6, // Random duration 5-11s
          beamLength: BASE_BEAM_LENGTH + (Math.random() * 60 - 30), // ±30px variation
          opacity: 0.3 + Math.random() * 0.5, // Opacity 0.3-0.8
        });
      }

      setBeams(newBeams);
    };

    generateBeams();
  }, [dimensions]);

  // Update dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      } else {
        // Fallback to window size if no container ref
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    // Initial update
    updateDimensions();

    // Use ResizeObserver if available for better accuracy
    let resizeObserver: ResizeObserver | null = null;
    
    if (containerRef?.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      resizeObserver.observe(containerRef.current);
    }

    // Fallback to window resize listener
    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (resizeObserver && containerRef?.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {beams.map((beam) => {
        const isHorizontal = beam.direction === "horizontal";
        const beamPosition = beam.gridLine * GRID_SIZE;
        const maxDimension = isHorizontal ? dimensions.width : dimensions.height;
        const startPos = -beam.beamLength;
        const endPos = maxDimension + beam.beamLength;
        
        return (
          <motion.div
            key={beam.id}
            className="absolute"
            style={{
              ...(isHorizontal 
                ? {
                    top: beamPosition,
                    left: 0,
                    width: beam.beamLength,
                    height: "1px",
                  }
                : {
                    left: beamPosition,
                    top: 0,
                    width: "1px",
                    height: beam.beamLength,
                  }
              ),
            }}
            initial={{
              ...(isHorizontal ? { x: startPos } : { y: startPos }),
            }}
            animate={{
              ...(isHorizontal ? { x: endPos } : { y: endPos }),
            }}
            transition={{
              duration: beam.duration,
              delay: beam.startDelay,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2 + Math.random() * 2, // Random pause 2-4s
            }}
          >
            {/* Subtle beam with soft glow */}
            <div
              className="w-full h-full relative"
              style={{
                background: isHorizontal
                  ? `linear-gradient(to right, transparent 0%, rgba(16, 185, 129, ${beam.opacity * 0.5}) 30%, rgba(16, 185, 129, ${beam.opacity}) 50%, rgba(16, 185, 129, ${beam.opacity * 0.5}) 70%, transparent 100%)`
                  : `linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, ${beam.opacity * 0.5}) 30%, rgba(16, 185, 129, ${beam.opacity}) 50%, rgba(16, 185, 129, ${beam.opacity * 0.5}) 70%, transparent 100%)`,
                boxShadow: `0 0 8px rgba(16, 185, 129, ${beam.opacity * 0.4}), 0 0 16px rgba(16, 185, 129, ${beam.opacity * 0.2})`,
                filter: "blur(0.3px)",
              }}
            />
            
            {/* Core subtle line */}
            <div
              className="absolute inset-0"
              style={{
                background: isHorizontal
                  ? `linear-gradient(to right, transparent 0%, rgba(16, 185, 129, ${beam.opacity * 0.75}) 40%, rgba(16, 185, 129, ${beam.opacity}) 50%, rgba(16, 185, 129, ${beam.opacity * 0.75}) 60%, transparent 100%)`
                  : `linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, ${beam.opacity * 0.75}) 40%, rgba(16, 185, 129, ${beam.opacity}) 50%, rgba(16, 185, 129, ${beam.opacity * 0.75}) 60%, transparent 100%)`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
