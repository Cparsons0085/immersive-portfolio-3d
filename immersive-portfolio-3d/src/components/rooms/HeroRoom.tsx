'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTerminal, FiArrowUp, FiUser, FiMapPin, FiMail, FiCode, FiZap } from 'react-icons/fi'
import TextMaskingAnimation from '../TextMaskingAnimation'
import { CodeHoverCard } from '../CodeHoverCards'

interface HeroRoomProps {
  onNavigate: (roomId: number) => void
  onTerminalComplete?: () => void
}

export default function HeroRoom({ onNavigate, onTerminalComplete }: HeroRoomProps) {
  const [terminalText, setTerminalText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  // FIXED: Show elevator button after terminal completes, but allow interaction during typing
  const [showElevatorButton, setShowElevatorButton] = useState(false)

  // FIXED: Shortened and faster terminal sequence
  const terminalLines = [
    '$ whoami',
    'cristy@neon-portfolio:~$ ',
    '',
    'Cristy Parsons | Software Engineer',
    'Specializing in Automation & 3D Experiences',
    '',
    'Systems Online:',
    '├── SKILLS Lab      [✓]',
    '├── PROJECTS        [✓]',
    '├── CONTACT         [✓]',
    '└── AI LAB          [✓]',
    '',
    '$ explore --elevator',
    'Elevator ready ↑ Welcome aboard!',
    'cristy@neon-portfolio:~$ _'
  ]

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine]
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex <= line.length) {
          setTerminalText(prev =>
            terminalLines.slice(0, currentLine).join('\n') +
            (currentLine > 0 ? '\n' : '') +
            line.slice(0, charIndex)
          )
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setCurrentLine(prev => prev + 1)
          }, currentLine === 0 ? 500 : 50) // FIXED: Much faster line progression
        }
      }, currentLine === 0 ? 60 : 15) // FIXED: Much faster typing speed

      return () => clearInterval(typeInterval)
    } else {
      // Terminal typing complete
      setIsComplete(true)
      setShowElevatorButton(true) // FIXED: Show button when terminal is done

      // Notify parent that terminal is complete (to show navigation)
      setTimeout(() => {
        if (onTerminalComplete) {
          onTerminalComplete()
        }
      }, 300) // FIXED: Faster navigation show delay
    }
  }, [currentLine, onTerminalComplete])

  useEffect(() => {
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // FIXED: Faster cursor blink

    return () => clearInterval(cursorInterval)
  }, [])

  const personalInfo = [
    { icon: FiCode, label: 'Focus', value: 'Full-Stack Development' },
    { icon: FiZap, label: 'Specialty', value: 'Automation & AI' },
    { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA' },
    { icon: FiMail, label: 'Status', value: 'Available for Projects' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl px-6 items-center">
        {/* Terminal Section - Centered and Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }} // FIXED: Faster initial animation
          className="space-y-6 relative z-10"
        >
          {/* Terminal Window */}
          <div className="glass border-neon-gradient rounded-xl overflow-hidden neon-glow-cyan shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-black/60 px-6 py-4 border-b border-cyan-400/30 flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
              </div>
              <div className="flex items-center space-x-2 text-cyan-400">
                <FiTerminal size={18} />
                <span className="text-sm font-mono">neon-portfolio-terminal</span>
              </div>
              <div className="flex-1"></div>
              <div className="text-xs font-mono text-cyan-400/70">SECURE CONNECTION</div>
            </div>

            {/* Terminal Content */}
            <div className="bg-black/80 p-8 font-mono text-sm h-[380px] overflow-y-auto"> {/* FIXED: Reduced height */}
              <pre className="neon-text-cyan whitespace-pre-wrap leading-relaxed">
                {terminalText}
                {showCursor && !isComplete && (
                  <motion.span
                    className="terminal-cursor inline-block w-2 h-5 ml-1 bg-cyan-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }} // FIXED: Faster cursor
                  >
                    █
                  </motion.span>
                )}
                {isComplete && (
                  <motion.span
                    className="terminal-cursor inline-block w-2 h-5 bg-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                )}
              </pre>
            </div>
          </div>

          {/* System Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }} // FIXED: Faster appearance
            className="glass rounded-lg p-4 border border-green-400/30 neon-glow-green"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 font-mono text-sm font-bold">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-mono text-xs">UPTIME: 99.9%</div>
                <div className="text-green-400/70 font-mono text-xs">LAST BOOT: 2025.01.24</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Welcome & Navigation Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }} // FIXED: Faster appearance
          className="space-y-8 relative z-10"
        >
          {/* Hero Card with Enhanced Holographic Effects */}
          <div className="glass rounded-2xl p-8 border-neon-gradient relative overflow-hidden neon-glow-magenta">
            {/* Animated Holographic Background */}
            <div className="absolute inset-0 holographic opacity-20 pointer-events-none" />

            {/* Scan Lines Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-4"
              animate={{
                y: [0, '200%', 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative z-10 text-center space-y-6">
              {/* Avatar with Rotating Border */}
              <motion.div
                className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-magenta-500 to-green-400 p-1 shadow-2xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    👩‍💻
                  </motion.div>
                </div>
              </motion.div>

              {/* Name & Title */}
              <div className="space-y-4">
                <TextMaskingAnimation
                  text="Cristy Parsons"
                  className="text-4xl font-bold neon-text-cyan"
                  animationType="wipe"
                  duration={1.5} // FIXED: Faster animation
                  delay={1}
                />
                <TextMaskingAnimation
                  text="Software Engineer & Automation Specialist"
                  className="text-xl text-magenta-400 font-semibold"
                  animationType="typewriter"
                  duration={2} // FIXED: Faster animation
                  delay={2}
                />
                <p className="text-gray-300 leading-relaxed max-w-md mx-auto text-sm">
                  Building intelligent automation solutions and immersive digital experiences.
                  Specializing in full-stack development, 3D web applications, and GIS systems.
                </p>
              </div>

              {/* Personal Info Grid with Hover Cards */}
              <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
                {personalInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <CodeHoverCard
                      key={info.label}
                      trigger={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }} // FIXED: Faster stagger
                          className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer"
                        >
                          <Icon size={18} className="text-cyan-400" />
                          <div className="flex-1 text-left">
                            <div className="text-white/80 font-medium text-sm">{info.label}</div>
                            <div className="text-cyan-400 text-xs font-mono">{info.value}</div>
                          </div>
                        </motion.div>
                      }
                      data={{
                        id: `personal-${index}`,
                        title: info.label,
                        description: `Professional ${info.label.toLowerCase()}: ${info.value}`,
                        type: 'skill',
                        color: '#00ffff',
                        tags: info.label === 'Focus' ? ['React', 'Next.js', 'TypeScript'] :
                              info.label === 'Specialty' ? ['Python', 'ML', 'Automation'] :
                              info.label === 'Location' ? ['Remote', 'Hybrid', 'On-site'] :
                              ['Available', 'Responsive', 'Professional']
                      }}
                      direction="right"
                      delay={100}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Enter Elevator Button - FIXED: Enhanced styling and positioning */}
          {showElevatorButton && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }} // FIXED: Faster appearance
              className="text-center relative z-50"
            >
              <motion.button
                onClick={() => onNavigate(1)}
                className="group relative inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-2 border-cyan-400 rounded-full font-mono font-bold text-cyan-400 transition-all duration-300 hover:border-magenta-400 hover:text-magenta-400 neon-glow-cyan hover:neon-glow-magenta shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black no-zoom"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 60px rgba(0, 255, 255, 0.8)',
                  borderColor: '#ff00ff'
                }}
                whileTap={{ scale: 0.95 }}
                style={{ zIndex: 100 }}
                tabIndex={0}
              >
                <FiArrowUp size={28} />
                <span className="text-xl">ENTER ELEVATOR</span>

                {/* Enhanced Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-magenta-400/15 rounded-full"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Multiple Pulse Ring Animations */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <motion.div
                  className="absolute inset-0 border-2 border-magenta-400 rounded-full"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />

                <motion.div
                  className="absolute inset-0 border-2 border-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />

                {/* Glowing particles around button */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: `${50 + Math.cos((i / 8) * 2 * Math.PI) * 50}%`,
                      top: `${50 + Math.sin((i / 8) * 2 * Math.PI) * 50}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }} // FIXED: Faster text appearance
                className="text-sm text-white/50 mt-4 font-mono"
              >
                Begin your journey through the digital floors
              </motion.p>
            </motion.div>
          )}

          {/* Stats Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }} // FIXED: Faster appearance
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Experience', value: '5Y+', color: 'cyan' },
              { label: 'Projects', value: '50+', color: 'magenta' },
              { label: 'Technologies', value: '20+', color: 'green' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.05 }} // FIXED: Faster stagger
                className="glass rounded-lg p-4 text-center border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className={`text-2xl font-bold neon-text-${stat.color} font-mono`}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
