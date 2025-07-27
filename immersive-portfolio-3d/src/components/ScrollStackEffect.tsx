'use client'

import { useRef, useMemo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollStackItem {
  id: number
  title: string
  description: string
  year: string
  tech: string[]
  color: string
  icon?: string
}

interface ScrollStackEffectProps {
  items: ScrollStackItem[]
  className?: string
  spacing?: number
}

export default function ScrollStackEffect({
  items,
  className = '',
  spacing = 200
}: ScrollStackEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Pre-calculate item data without hooks
  const itemData = useMemo(() => {
    return items.map((_, index) => ({
      start: index / items.length,
      end: (index + 1) / items.length,
      index
    }))
  }, [items])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen ${className}`}
      style={{ height: items.length * spacing + 400 }}
    >
      {/* Background Timeline */}
      <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-magenta-500 to-green-400 opacity-50" />

      {/* Progress Indicator */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-cyan-400 via-magenta-500 to-green-400 origin-top"
        style={{ scaleY: smoothProgress }}
      />

      {/* Stack Items */}
      <div className="relative z-10">
        {items.map((item, index) => {
          const itemInfo = itemData[index]

          return (
            <motion.div
              key={item.id}
              className="sticky top-1/2 -translate-y-1/2 mb-32"
              style={{
                top: `${50 + index * 10}%`,
                zIndex: items.length - index
              }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <div className="flex items-center space-x-8 pl-16">
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 w-6 h-6 rounded-full border-2 border-cyan-400 bg-black"
                  style={{ backgroundColor: item.color }}
                  whileInView={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />

                {/* Content Card */}
                <motion.div
                  className="glass rounded-2xl p-8 border border-white/20 max-w-2xl neon-glow-cyan"
                  style={{
                    borderColor: item.color,
                    boxShadow: `0 0 20px ${item.color}20`
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 40px ${item.color}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg font-mono" style={{ color: item.color }}>
                        {item.year}
                      </p>
                    </div>
                    {item.icon && (
                      <div className="text-4xl">{item.icon}</div>
                    )}
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-mono text-white/90"
                        style={{ borderColor: `${item.color}50` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
