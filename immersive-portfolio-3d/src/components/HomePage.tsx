'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import MagicLoader from './MagicLoader'

interface HomePageProps {
  onExploreStart: () => void
}

export default function HomePage({ onExploreStart }: HomePageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showMagicLoader, setShowMagicLoader] = useState(false)

  // Show button after initial animations
  useEffect(() => {
    setTimeout(() => {
      if (!showButton) setShowButton(true)
    }, 2000)
  }, [showButton])

  const handleExplore = () => {
    setIsLoading(true)
    setShowMagicLoader(true)
  }

  const handleMagicLoaderComplete = () => {
    setShowMagicLoader(false)
    setIsLoading(false)
    onExploreStart()
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Magic Loader */}
      <MagicLoader
        isVisible={showMagicLoader}
        onComplete={handleMagicLoaderComplete}
        loadingText="Initializing Neon Cyberpunk Matrix..."
        type="neon"
        duration={4000}
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#00ff88',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* FIXED: Skip to Overview Button - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute top-6 right-6 z-30"
      >
        <Link href="/overview">
          <motion.button
            className="group relative px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-lg font-mono text-purple-400 hover:border-purple-400 transition-all neon-glow-purple text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>Skip to Overview</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>

            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full safe-area-inset">
        <div className="w-full max-w-md px-6">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold neon-text-cyan mb-4">
              PORTFOLIO
            </h1>
            <div className="text-lg md:text-xl neon-text-magenta font-mono">
              IMMERSIVE EXPERIENCE
            </div>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-magenta-500 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>

          {/* Explore Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mb-8"
          >
            <AnimatePresence>
              {showButton && !isLoading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={handleExplore}
                  className="group relative w-full py-4 px-8 bg-black/70 border-2 border-cyan-400 rounded-lg font-mono text-lg font-bold text-cyan-400 overflow-hidden transition-all duration-300 hover:border-magenta-400 hover:text-magenta-400 active:scale-95 no-zoom focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  tabIndex={0}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-magenta-400/10 to-cyan-400/10"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <motion.span
                      animate={{
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      &gt;
                    </motion.span>
                    <span className="tracking-wider">EXPLORE</span>
                    <motion.span
                      animate={{
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      &lt;
                    </motion.span>
                  </div>

                  {/* Glowing Border Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'linear-gradient(45deg, transparent, #00ffff, transparent, #ff00ff, transparent)',
                      backgroundSize: '300% 300%',
                      padding: '2px',
                      margin: '-2px',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/20 rounded-lg"
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* FIXED: Instructions with Skip Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-gray-400 text-sm">
              Experience the full 3D immersive portfolio or
            </div>
            <Link href="/overview">
              <motion.span
                className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer font-mono text-sm underline"
                whileHover={{ scale: 1.05 }}
              >
                skip to simple overview →
              </motion.span>
            </Link>

            {/* Mobile Optimized Instructions */}
            <div className="text-xs text-gray-500 space-y-2 mt-6">
              <div className="md:hidden">📱 Optimized for mobile interaction</div>
              <div className="hidden md:block">💻 Fully responsive across all devices</div>
              <div>🎮 Navigate through 5 interactive rooms</div>
            </div>
          </motion.div>

          {/* Stats Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {[
              { label: 'Rooms', value: '05', color: 'cyan' },
              { label: 'Projects', value: '12+', color: 'magenta' },
              { label: 'Skills', value: '20+', color: 'green' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.2 }}
                className="glass rounded-lg p-3 text-center border border-white/10"
              >
                <div className={`text-xl font-bold neon-text-${stat.color} font-mono`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal-Style Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 text-center"
          >
            <div className="glass rounded-lg p-3 border border-cyan-400/30">
              <div className="text-cyan-400 font-mono text-xs">
                <span className="text-green-400">●</span> SYSTEM READY
                <span className="ml-4 text-magenta-400">●</span> MOBILE OPTIMIZED
                <span className="ml-4 text-blue-400">●</span> 3D ENABLED
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-magenta-400"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-400"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-400"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.5 }}
      />

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-1 pointer-events-none"
        animate={{
          y: ['-100%', '100vh', '-100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Mobile Touch Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-12 h-8 border-2 border-cyan-400/50 rounded-lg flex items-end justify-center pb-1"
          animate={{
            borderColor: ['rgba(0, 255, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <motion.div
            className="w-1 h-3 bg-cyan-400 rounded-full"
            animate={{
              y: [0, -4, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
        <div className="text-xs text-cyan-400 font-mono text-center mt-2">
          TAP TO START
        </div>
      </motion.div>
    </div>
  )
}
