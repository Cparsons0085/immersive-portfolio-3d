'use client'

import { motion } from 'framer-motion'
import {
  FiHome,
  FiCpu,
  FiFolder,
  FiZap,
  FiMail,
  FiChevronUp,
  FiChevronDown
} from 'react-icons/fi'

interface Room {
  id: number
  name: string
  component: React.ComponentType<{ onNavigate: (roomId: number) => void }>
  position: [number, number, number]
  color: string
}

interface RoomNavigationProps {
  rooms: Room[]
  currentRoom: number
  onNavigate: (roomId: number) => void
  isTransitioning: boolean
}

const roomIcons = [FiHome, FiCpu, FiFolder, FiMail, FiZap]

export default function RoomNavigation({
  rooms,
  currentRoom,
  onNavigate,
  isTransitioning
}: RoomNavigationProps) {
  const canGoUp = currentRoom < rooms.length - 1
  const canGoDown = currentRoom > 0

  const handleNavigate = (direction: 'up' | 'down') => {
    if (isTransitioning) return

    if (direction === 'up' && canGoUp) {
      onNavigate(currentRoom + 1)
    } else if (direction === 'down' && canGoDown) {
      onNavigate(currentRoom - 1)
    }
  }

  return (
    <>
      {/* Main Navigation Panel - FIXED: Elevator-style vertical navigation */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }} // FIXED: Faster appearance
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-15" // FIXED: Lower z-index to z-15
      >
        <div className="glass border-neon-gradient rounded-2xl p-4 backdrop-blur-xl neon-glow-cyan">
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-sm font-mono neon-text-cyan uppercase tracking-wider font-bold">
              ELEVATOR
            </h3>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2" />
          </div>

          {/* Elevator Shaft Visual */}
          <div className="relative mb-6">
            {/* Shaft Background */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-64 bg-gradient-to-b from-cyan-400/20 via-cyan-400/40 to-cyan-400/20 rounded-full" />

            {/* Floor Indicators */}
            <div className="relative z-10 space-y-3">
              {rooms.slice().reverse().map((room, index) => {
                const originalIndex = rooms.length - 1 - index
                const Icon = roomIcons[originalIndex]
                const isActive = currentRoom === originalIndex

                return (
                  <motion.button
                    key={room.id}
                    onClick={() => !isTransitioning && onNavigate(originalIndex)}
                    disabled={isTransitioning}
                    className={`
                      relative group w-14 h-14 rounded-full transition-all duration-300 shadow-lg mx-auto block
                      ${isActive
                        ? 'bg-cyan-400/30 border-2 border-cyan-400 neon-glow-cyan scale-110'
                        : 'bg-white/5 border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:scale-105'
                      }
                      ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    whileHover={!isTransitioning ? { scale: isActive ? 1.15 : 1.1 } : {}}
                    whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                  >
                    {/* Floor Icon */}
                    <div className={`
                      flex items-center justify-center w-full h-full
                      ${isActive ? 'text-cyan-400' : 'text-white/70 group-hover:text-cyan-400'}
                      transition-colors duration-300
                    `}>
                      <Icon size={22} />
                    </div>

                    {/* Floor Number Badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900/90 border border-cyan-400/50 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs text-cyan-400 font-mono font-bold">{originalIndex + 1}</span>
                    </div>

                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        className="absolute -right-8 top-1/2 transform -translate-y-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.4 }}
                      >
                        <div className="w-6 h-1 bg-cyan-400 rounded-full neon-glow-cyan shadow-lg" />
                      </motion.div>
                    )}

                    {/* Hover Tooltip */}
                    <motion.div
                      className="absolute left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <div className="glass border border-cyan-400/30 rounded-lg px-3 py-2 whitespace-nowrap neon-glow-cyan">
                        <span className="text-sm font-mono text-cyan-400 font-bold">
                          {room.name}
                        </span>
                      </div>
                    </motion.div>

                    {/* Glow Effect for Active Room */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-20 blur-md pointer-events-none"
                        style={{
                          backgroundColor: room.color,
                          boxShadow: `0 0 30px ${room.color}`
                        }}
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Elevator Car */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded border border-cyan-400 shadow-lg neon-glow-cyan"
              animate={{
                y: (rooms.length - 1 - currentRoom) * 68 + 18, // Position based on current room
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
              }}
            >
              {/* Elevator light */}
              <motion.div
                className="absolute inset-1 bg-cyan-400 rounded-sm"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Current Floor Display */}
          <div className="text-center border-t border-white/10 pt-4">
            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">
              Current Floor
            </div>
            <div className="text-lg font-bold neon-text-cyan">
              {rooms[currentRoom]?.name}
            </div>
            <div className="text-xs text-white/60 mt-1 font-mono">
              Level {currentRoom + 1} / {rooms.length}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute -top-2 -right-2">
            <motion.div
              className={`w-4 h-4 rounded-full shadow-lg ${
                isTransitioning ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              animate={isTransitioning ? {
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={isTransitioning ? {
                duration: 1,
                repeat: Infinity
              } : {}}
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation Arrows - Mobile Friendly */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-15 flex flex-col space-y-3"
      >
        {/* Up Arrow */}
        <motion.button
          onClick={() => handleNavigate('up')}
          disabled={!canGoUp || isTransitioning}
          className={`
            w-14 h-14 rounded-full glass border-2 flex items-center justify-center transition-all duration-300 shadow-lg
            ${canGoUp && !isTransitioning
              ? 'border-cyan-400 text-cyan-400 hover:border-cyan-300 hover:text-cyan-300 cursor-pointer neon-glow-cyan'
              : 'border-white/20 text-white/30 cursor-not-allowed'
            }
          `}
          whileHover={canGoUp && !isTransitioning ? { scale: 1.1 } : {}}
          whileTap={canGoUp && !isTransitioning ? { scale: 0.9 } : {}}
        >
          <FiChevronUp size={24} />
        </motion.button>

        {/* Down Arrow */}
        <motion.button
          onClick={() => handleNavigate('down')}
          disabled={!canGoDown || isTransitioning}
          className={`
            w-14 h-14 rounded-full glass border-2 flex items-center justify-center transition-all duration-300 shadow-lg
            ${canGoDown && !isTransitioning
              ? 'border-magenta-400 text-magenta-400 hover:border-magenta-300 hover:text-magenta-300 cursor-pointer neon-glow-magenta'
              : 'border-white/20 text-white/30 cursor-not-allowed'
            }
          `}
          whileHover={canGoDown && !isTransitioning ? { scale: 1.1 } : {}}
          whileTap={canGoDown && !isTransitioning ? { scale: 0.9 } : {}}
        >
          <FiChevronDown size={24} />
        </motion.button>
      </motion.div>

      {/* Mobile Room Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-15 md:hidden"
      >
        <div className="glass rounded-full px-6 py-3 border border-cyan-400/30 neon-glow-cyan shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="text-sm font-mono text-cyan-400 font-bold">
              {rooms[currentRoom]?.name}
            </div>
            <motion.div
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Connection Lines (Desktop Only) */}
      <div className="hidden md:block fixed left-16 top-1/2 transform -translate-y-1/2 w-px h-64 bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-cyan-400/50 z-10 shadow-sm" />

      {/* Vertical Navigation Light Trail */}
      <motion.div
        className="hidden md:block fixed left-12 top-1/2 transform -translate-y-1/2 w-1 h-80 rounded-full z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.3), transparent)'
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  )
}
