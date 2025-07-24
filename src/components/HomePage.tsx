'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HomePageProps {
  onExploreStart: () => void
}

export default function HomePage({ onExploreStart }: HomePageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [cloversCollected, setCloversCollected] = useState(0)
  const [gameScore, setGameScore] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState<'initial' | 'minigame' | 'complete'>('initial')

  // Show button after initial animations
  useEffect(() => {
    setTimeout(() => {
      if (!showButton) setShowButton(true)
    }, 2000)
  }, [showButton])

  const handleExplore = () => {
    setIsLoading(true)
    setLoadingPhase('initial')
    setLoadingProgress(0)

    // Start loading simulation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15

        // At 30%, show mini-game
        if (newProgress >= 30 && loadingPhase === 'initial') {
          setLoadingPhase('minigame')
          setShowMiniGame(true)
        }

        // At 100%, complete loading
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setLoadingPhase('complete')
          setTimeout(() => {
            onExploreStart()
          }, 1500)
          return 100
        }

        return newProgress
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }

  const handleCloverClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setCloversCollected(prev => prev + 1)
    setGameScore(prev => prev + 100)

    // Boost loading progress when collecting clovers
    setLoadingProgress(prev => Math.min(prev + 10, 100))

    // Visual feedback
    const cloverElement = e.target as HTMLElement
    cloverElement.style.transform = 'scale(1.5) rotate(360deg)'
    cloverElement.style.opacity = '0'

    setTimeout(() => {
      cloverElement.style.transform = 'scale(1) rotate(0deg)'
      cloverElement.style.opacity = '1'
    }, 300)
  }

  const getLoadingMessage = () => {
    if (loadingProgress < 20) return "Initializing Neon Systems..."
    if (loadingProgress < 40) return "Loading Three.js Environment..."
    if (loadingProgress < 60) return "Don't Pluck Your Luck - Collect Clovers!"
    if (loadingProgress < 80) return "Compiling Cyberpunk Shaders..."
    if (loadingProgress < 95) return "Establishing Secure Connection..."
    return "Ready for Launch!"
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black">
        {/* Loading Background Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Floating Loading Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#00ff88',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200, 0],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full safe-area-inset">
          <div className="w-full max-w-2xl px-6">

            {/* Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-6xl md:text-8xl font-bold neon-text-cyan mb-4">
                LOADING
              </h1>
              <div className="text-2xl md:text-3xl neon-text-magenta font-mono mb-6">
                "Don't Pluck Your Luck"
              </div>
              <div className="text-lg text-green-400 font-mono italic">
                Cristy Parsons • Software Engineer
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className="glass rounded-full p-2 border border-cyan-400/30 neon-glow-cyan">
                <div className="h-4 bg-gray-900 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-magenta-500 to-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Progress Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-magenta-500/30 to-green-400/30 rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="text-cyan-400 font-mono text-sm">
                  {getLoadingMessage()}
                </div>
                <div className="text-cyan-400 font-mono text-sm font-bold">
                  {Math.round(loadingProgress)}%
                </div>
              </div>
            </motion.div>

            {/* Mini-Game Section */}
            <AnimatePresence>
              {showMiniGame && loadingPhase === 'minigame' && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  className="glass border border-green-400/30 rounded-2xl p-8 mb-8 neon-glow-green text-center"
                >
                  <motion.h3
                    className="text-2xl font-bold text-green-400 mb-4 neon-text-green"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    🍀 LUCK BOOSTER MINI-GAME 🍀
                  </motion.h3>

                  <p className="text-green-300 mb-6 font-mono">
                    Quick! Collect lucky clovers to boost loading speed!
                  </p>

                  {/* Clover Collection Game */}
                  <div className="grid grid-cols-5 gap-4 mb-6 max-w-md mx-auto">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={(e) => handleCloverClick(e, i)}
                        className="text-4xl hover:scale-125 transition-transform cursor-pointer p-2 rounded-lg hover:bg-green-400/20"
                        whileHover={{
                          scale: 1.3,
                          rotate: [0, 10, -10, 0],
                          boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        🍀
                      </motion.button>
                    ))}
                  </div>

                  {/* Game Stats */}
                  <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
                    <div className="glass rounded-lg p-4 border border-green-400/30">
                      <div className="text-2xl font-bold text-green-400 font-mono">
                        {cloversCollected}
                      </div>
                      <div className="text-green-300 text-sm">Clovers Collected</div>
                    </div>
                    <div className="glass rounded-lg p-4 border border-cyan-400/30">
                      <div className="text-2xl font-bold text-cyan-400 font-mono">
                        {gameScore}
                      </div>
                      <div className="text-cyan-300 text-sm">Luck Points</div>
                    </div>
                  </div>

                  {/* Bonus Message */}
                  {cloversCollected >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 text-yellow-400 font-mono font-bold"
                    >
                      🎉 LUCK OVERLOAD! Loading speed boosted! 🎉
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Complete Animation */}
            {loadingPhase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1 }}
                >
                  🚀
                </motion.div>
                <h2 className="text-4xl font-bold neon-text-green mb-4">
                  READY FOR LAUNCH!
                </h2>
                <p className="text-green-400 font-mono">
                  Entering the Neon Dimension...
                </p>
              </motion.div>
            )}

            {/* Tech Stack Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center space-x-8 text-3xl mt-8"
            >
              {['⚛️', '🔷', '🟢', '🟣', '🔵'].map((icon, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                  className="opacity-60"
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>

            {/* Loading Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center mt-8"
            >
              <div className="glass rounded-lg p-4 border border-white/10">
                <div className="text-white/70 font-mono text-sm">
                  💡 Tip: Use scroll wheel to navigate between floors once loaded
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scan Line Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-2 pointer-events-none"
          animate={{
            y: ['-100%', '100vh', '-100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
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
                  className="group relative w-full py-4 px-8 bg-black/70 border-2 border-cyan-400 rounded-lg font-mono text-lg font-bold text-cyan-400 overflow-hidden transition-all duration-300 hover:border-magenta-400 hover:text-magenta-400 active:scale-95 no-zoom"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
                  }}
                  whileTap={{ scale: 0.98 }}
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

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-gray-400 text-sm">
              Click the button above to enter the immersive portfolio
            </div>

            {/* Mobile Optimized Instructions */}
            <div className="text-xs text-gray-500 space-y-2">
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
