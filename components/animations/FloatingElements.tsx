"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Seed-based random number generator for consistent SSR/client values
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function FloatingElements() {
  // Generate consistent random values using useMemo
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const seed = i * 1000;
      return {
        id: i,
        x1: (seededRandom(seed + 1) - 0.5) * 100,
        x2: (seededRandom(seed + 2) - 0.5) * 100,
        duration: seededRandom(seed + 3) * 10 + 10,
        delay: seededRandom(seed + 4) * 5,
        left: seededRandom(seed + 5) * 100
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle 1 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: "20%", left: "10%" }}
      />

      {/* Circle 2 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ top: "40%", right: "10%" }}
      />

      {/* Circle 3 */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ bottom: "20%", left: "30%" }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          animate={{
            y: [0, -1000],
            x: [particle.x1, particle.x2],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
          style={{
            left: `${particle.left}%`,
            bottom: 0
          }}
        />
      ))}
    </div>
  );
}
