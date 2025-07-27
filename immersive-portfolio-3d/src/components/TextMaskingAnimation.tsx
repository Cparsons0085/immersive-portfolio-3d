'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextMaskingAnimationProps {
  text: string
  className?: string
  animationType?: 'wipe' | 'slide' | 'gradient' | 'typewriter'
  duration?: number
  delay?: number
  onComplete?: () => void
}

export default function TextMaskingAnimation({
  text,
  className = '',
  animationType = 'wipe',
  duration = 2,
  delay = 0,
  onComplete
}: TextMaskingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  // Handle animation completion with useEffect
  useEffect(() => {
    if (isInView && !isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(true)
      }, (delay + duration) * 1000 + 100)

      return () => clearTimeout(timeout)
    }
  }, [isInView, delay, duration, isComplete])

  // Use direct animation instead of variants to avoid TypeScript errors
  if (animationType === 'wipe') {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          animate={isInView ? {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          } : {}}
          transition={{
            duration,
            delay,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>
      </div>
    )
  }

  if (animationType === 'slide') {
    return (
      <div ref={containerRef} className={className}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? {
            x: 0,
            opacity: 1
          } : {}}
          transition={{
            duration,
            delay,
            ease: "easeOut"
          }}
        >
          {text}
        </motion.div>
      </div>
    )
  }

  if (animationType === 'gradient') {
    return (
      <div ref={containerRef} className={className}>
        <motion.div
          style={{
            background: 'linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ backgroundPosition: '0% 50%' }}
          animate={isInView ? {
            backgroundPosition: '100% 50%'
          } : {}}
          transition={{
            duration,
            delay,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>
      </div>
    )
  }

  // typewriter animation
  const letters = text.split('')

  return (
    <div ref={containerRef} className={`${className} overflow-hidden`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, rotateX: -45 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              rotateX: 0
            } : {}}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              ease: "easeOut"
            }}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </div>
  )
}
