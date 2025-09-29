import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        {/* Animated grid overlay */}
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Enhanced Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'linear-gradient(45deg, #8b5cf6, #06b6d4)' 
              : i % 3 === 1 
              ? 'linear-gradient(45deg, #06b6d4, #8b5cf6)'
              : 'linear-gradient(45deg, #a855f7, #0ea5e9)',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 200 - 100, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10,
          }}
        />
      ))}

      {/* Enhanced Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-cyan-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-cyan-600/30 to-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.7, 0.4, 0.7],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-600/25 to-purple-600/25 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0 100h50v-50h50v50h50v-50h50v100" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M100 0v50h-50v50h50v50h-50v50" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
              <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
              <circle cx="150" cy="50" r="4" fill="currentColor" opacity="0.8" />
              <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.8" />
              <circle cx="50" cy="150" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="150" cy="150" r="3" fill="currentColor" opacity="0.6" />
            </pattern>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" style={{ color: 'url(#circuitGradient)' }} />
        </svg>
      </div>

      {/* Data Stream Effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
          style={{
            height: '200px',
            left: `${10 + i * 12}%`,
            top: '-200px',
          }}
          animate={{
            y: ['0vh', '120vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Holographic Borders */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* Pulsing Corner Elements */}
      <motion.div
        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-400/50"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50"
        animate={{
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-400/50"
        animate={{
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};
