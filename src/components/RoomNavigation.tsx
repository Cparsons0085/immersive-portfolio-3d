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
      {/* Main Navigation Panel - FIXED: Lower z-index to not block elevator button */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20" // REDUCED z-index from z-30 to z-20
      >
        <div className="glass border-neon-gradient rounded-2xl p-4 backdrop-blur-xl neon-glow-cyan">
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-sm font-mono neon-text-cyan uppercase tracking-wider font-bold">
              Navigation
            </h3>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2" />
          </div>

          {/* Room Buttons */}
          <div className="space-y-3">
            {rooms.map((room, index) => {
              const Icon = roomIcons[index]
              const isActive = currentRoom === index

              return (
                <motion.button
                  key={room.id}
                  onClick={() => !isTransitioning && onNavigate(index)}
                  disabled={isTransitioning}
                  className={`
                    relative group w-16 h-16 rounded-xl transition-all duration-300 shadow-lg
                    ${isActive
                      ? 'bg-cyan-400/20 border-2 border-cyan-400 neon-glow-cyan'
                      : 'bg-white/5 border border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10'
                    }
                    ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  whileHover={!isTransitioning ? { scale: 1.05 } : {}}
                  whileTap={!isTransitioning ? { scale: 0.95 } : {}}
                >
                  {/* Icon */}
                  <div className={`
                    flex items-center justify-center w-full h-full
                    ${isActive ? 'text-cyan-400' : 'text-white/70 group-hover:text-cyan-400'}
                    transition-colors duration-300
                  `}>
                    <Icon size={24} />
                  </div>

                  {/* Room Number Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900/90 border border-cyan-400/50 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs text-cyan-400 font-mono font-bold">{index + 1}</span>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <div className="w-3 h-10 bg-cyan-400 rounded-full neon-glow-cyan shadow-lg" />
                    </motion.div>
                  )}

                  {/* Hover Tooltip */}
                  <motion.div
                    className="absolute left-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
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
                      className="absolute inset-0 rounded-xl opacity-20 blur-md pointer-events-none"
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

          {/* Progress Indicator */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                Progress
              </div>
              <div className="flex space-x-1">
                {rooms.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      index <= currentRoom ? 'bg-cyan-400 shadow-sm' : 'bg-white/20'
                    }`}
                    animate={index <= currentRoom ? {
                      boxShadow: ['0 0 5px rgba(0, 255, 255, 0.5)', '0 0 10px rgba(0, 255, 255, 0.8)', '0 0 5px rgba(0, 255, 255, 0.5)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ))}
              </div>
              <div className="text-xs text-cyan-400 mt-2 font-mono font-bold">
                {currentRoom + 1} / {rooms.length}
              </div>
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

      {/* Quick Navigation Arrows - Mobile Friendly - FIXED: Lower z-index */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-20 flex flex-col space-y-3" // REDUCED z-index from z-30 to z-20
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

      {/* Mobile Room Indicator - FIXED: Lower z-index */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20 md:hidden" // REDUCED z-index from z-30 to z-20
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
