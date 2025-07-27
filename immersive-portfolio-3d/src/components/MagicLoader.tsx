'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MagicLoaderProps {
  isVisible: boolean
  onComplete?: () => void
  loadingText?: string
  type?: 'clover' | 'code' | 'neon' | 'matrix'
  duration?: number
}

export default function MagicLoader({
  isVisible,
  onComplete,
  loadingText = "Initializing Neon Matrix...",
  type = 'neon',
  duration = 3000
}: MagicLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const phases = [
    "Connecting to the Matrix...",
    "Loading Cyberpunk Protocols...",
    "Synchronizing Neon Elements...",
    "Establishing 3D Environment...",
    "Calibrating Luck Algorithms...",
    "Ready for Immersion..."
  ]

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      // Update phase based on progress
      const phaseIndex = Math.floor((newProgress / 100) * phases.length)
      setCurrentPhase(Math.min(phaseIndex, phases.length - 1))

      if (newProgress >= 100) {
        setIsComplete(true)
        clearInterval(interval)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isVisible, duration, onComplete, phases.length])

  const renderCloverLoader = () => (
    <div className="relative">
      {/* Central Clover */}
      <motion.div
        className="text-8xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        🍀
      </motion.div>

      {/* Orbiting Clovers */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            rotate: [0, 360],
            x: [0, Math.cos((i * 60) * Math.PI / 180) * 80],
            y: [0, Math.sin((i * 60) * Math.PI / 180) * 80],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )

  const renderCodeLoader = () => (
    <div className="font-mono relative">
      {/* Typing Animation */}
      <motion.div
        className="text-2xl text-green-400 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Array.from({ length: Math.floor(progress / 10) }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="inline-block"
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.span>
        ))}
        <motion.span
          className="text-cyan-400"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      </motion.div>

      {/* Code Blocks */}
      <div className="space-y-2 text-sm">
        {[
          "const portfolio = new Portfolio()",
          "portfolio.load3DEnvironment()",
          "portfolio.initializeNeonEffects()",
          "portfolio.startImmersiveExperience()"
        ].map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: progress > (index + 1) * 20 ? 1 : 0.3,
              x: 0
            }}
            transition={{ delay: index * 0.3 }}
            className={`${progress > (index + 1) * 20 ? 'text-cyan-400' : 'text-gray-600'}`}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderNeonLoader = () => (
    <div className="relative">
      {/* Central Ring */}
      <motion.div
        className="w-32 h-32 border-4 border-cyan-400 rounded-full relative"
        animate={{
          rotate: [0, 360],
          borderColor: ['#00ffff', '#ff00ff', '#00ff88', '#00ffff']
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          boxShadow: '0 0 30px currentColor, inset 0 0 30px currentColor'
        }}
      >
        {/* Inner Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 rounded-full"
            style={{
              width: `${80 - i * 20}%`,
              height: `${80 - i * 20}%`,
              top: `${10 + i * 10}%`,
              left: `${10 + i * 10}%`,
              borderColor: i === 0 ? '#ff00ff' : i === 1 ? '#00ff88' : '#ffff00'
            }}
            animate={{
              rotate: [0, -360],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              rotate: { duration: 3 - i * 0.5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}

        {/* Center Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 10px #fff',
              '0 0 30px #00ffff',
              '0 0 10px #fff'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 100}px`,
            top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 100}px`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const renderMatrixLoader = () => (
    <div className="relative w-64 h-64">
      {/* Matrix Rain Effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 text-green-400 font-mono text-xs"
          style={{ left: `${i * 10}%` }}
          animate={{
            y: [-100, 300],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j} className="block">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </motion.div>
      ))}

      {/* Central Logo */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-cyan-400"
        animate={{
          textShadow: [
            '0 0 10px #00ffff',
            '0 0 30px #00ffff',
            '0 0 10px #00ffff'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        C:\/&gt;
      </motion.div>
    </div>
  )

  const renderLoader = () => {
    switch (type) {
      case 'clover': return renderCloverLoader()
      case 'code': return renderCodeLoader()
      case 'matrix': return renderMatrixLoader()
      default: return renderNeonLoader()
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 cyber-grid opacity-10" />

          {/* Main Loader */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {renderLoader()}

            {/* Progress Text */}
            <motion.div
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-cyan-400 font-mono text-lg neon-text-cyan">
                {phases[currentPhase]}
              </div>

              {/* Progress Bar */}
              <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-400/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-magenta-500 to-green-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Percentage */}
              <div className="text-white/70 font-mono text-sm">
                {Math.round(progress)}% Complete
              </div>

              {/* Loading Dots */}
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Success Message */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80"
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1 }}
                >
                  ✨
                </motion.div>
                <h2 className="text-3xl font-bold neon-text-green mb-2">
                  Ready for Launch!
                </h2>
                <p className="text-green-400 font-mono">
                  Entering the Neon Dimension...
                </p>
              </div>
            </motion.div>
          )}

          {/* Scan Line Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-2"
            animate={{
              y: ['-100%', '100vh', '-100%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
