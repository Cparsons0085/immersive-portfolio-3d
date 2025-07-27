'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiExternalLink, FiGithub, FiStar, FiZap } from 'react-icons/fi'

interface CardData {
  id: string
  title: string
  description: string
  icon?: React.ElementType
  link?: string
  tags?: string[]
  stats?: { label: string; value: string | number }[]
  color?: string
  type?: 'skill' | 'project' | 'tool' | 'achievement'
}

interface CodeHoverCardsProps {
  trigger: React.ReactNode
  data: CardData
  direction?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

interface HoverCardGroupProps {
  children: React.ReactNode
  className?: string
}

export function HoverCardGroup({ children, className = '' }: HoverCardGroupProps) {
  return <div className={`relative ${className}`}>{children}</div>
}

export function CodeHoverCard({
  trigger,
  data,
  direction = 'top',
  delay = 0,
  className = ''
}: CodeHoverCardsProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true)
    updateMousePosition(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    updateMousePosition(e)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const updateMousePosition = (e: React.MouseEvent) => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const getCardPosition = () => {
    switch (direction) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        }
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        }
      default:
        return {}
    }
  }

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }

    switch (direction) {
      case 'top':
        return {
          hidden: { ...baseVariants.hidden, y: 10 },
          visible: { ...baseVariants.visible, y: 0 }
        }
      case 'bottom':
        return {
          hidden: { ...baseVariants.hidden, y: -10 },
          visible: { ...baseVariants.visible, y: 0 }
        }
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: 10 },
          visible: { ...baseVariants.visible, x: 0 }
        }
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -10 },
          visible: { ...baseVariants.visible, x: 0 }
        }
      default:
        return baseVariants
    }
  }

  const getTypeIcon = () => {
    if (data.icon) {
      return data.icon
    }

    switch (data.type) {
      case 'skill': return FiZap
      case 'project': return FiCode
      case 'tool': return FiStar
      case 'achievement': return FiZap
      default: return FiCode
    }
  }

  const getTypeColor = () => {
    if (data.color) return data.color

    switch (data.type) {
      case 'skill': return '#00ffff'
      case 'project': return '#ff00ff'
      case 'tool': return '#00ff88'
      case 'achievement': return '#ffff00'
      default: return '#00ffff'
    }
  }

  const IconComponent = getTypeIcon()
  const typeColor = getTypeColor()

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={getCardPosition()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getAnimationVariants()}
            transition={{
              duration: 0.2,
              delay: delay / 1000,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Card Container */}
            <div
              className="relative glass border-2 rounded-xl p-4 min-w-80 max-w-sm backdrop-blur-xl"
              style={{
                borderColor: typeColor + '40',
                boxShadow: `0 0 20px ${typeColor}40, 0 0 40px ${typeColor}20`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 cyber-grid opacity-10 rounded-xl" />

              {/* Header */}
              <div className="relative z-10 flex items-start space-x-3 mb-3">
                <div
                  className="p-2 rounded-lg border"
                  style={{
                    backgroundColor: typeColor + '20',
                    borderColor: typeColor + '40'
                  }}
                >
                  <IconComponent size={20} style={{ color: typeColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-lg leading-tight"
                    style={{ color: typeColor }}
                  >
                    {data.title}
                  </h3>
                  {data.type && (
                    <div className="text-xs text-white/60 uppercase tracking-wider mt-1">
                      {data.type}
                    </div>
                  )}
                </div>

                {data.link && (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded hover:bg-white/10 transition-colors pointer-events-auto"
                    style={{ color: typeColor }}
                  >
                    <FiExternalLink size={16} />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed mb-3 relative z-10">
                {data.description}
              </p>

              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3 relative z-10">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs font-mono border"
                      style={{
                        backgroundColor: typeColor + '15',
                        borderColor: typeColor + '30',
                        color: typeColor
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats */}
              {data.stats && data.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {data.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-2 rounded border"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderColor: typeColor + '20'
                      }}
                    >
                      <div
                        className="font-bold font-mono"
                        style={{ color: typeColor }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${typeColor}15 0%, transparent 50%)`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Arrow/Pointer */}
              <div
                className="absolute w-3 h-3 border-2 transform rotate-45"
                style={{
                  borderColor: typeColor + '40',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  ...(direction === 'top' && {
                    top: '100%',
                    left: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px',
                    borderTop: 'none',
                    borderLeft: 'none'
                  }),
                  ...(direction === 'bottom' && {
                    bottom: '100%',
                    left: '50%',
                    marginLeft: '-6px',
                    marginBottom: '-6px',
                    borderBottom: 'none',
                    borderRight: 'none'
                  }),
                  ...(direction === 'left' && {
                    left: '100%',
                    top: '50%',
                    marginTop: '-6px',
                    marginLeft: '-6px',
                    borderTop: 'none',
                    borderLeft: 'none'
                  }),
                  ...(direction === 'right' && {
                    right: '100%',
                    top: '50%',
                    marginTop: '-6px',
                    marginRight: '-6px',
                    borderBottom: 'none',
                    borderRight: 'none'
                  })
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Export both as named exports and default export for convenience
export default CodeHoverCard
