'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiExternalLink } from 'react-icons/fi'

interface CarouselItem {
  id: number
  title: string
  image: string
  description: string
  link?: string
  tech: string[]
}

interface Image3DCarouselProps {
  items: CarouselItem[]
  autoRotate?: boolean
  rotationSpeed?: number
  className?: string
  onItemClick?: (item: CarouselItem) => void // ADDED: Click handler
}

export default function Image3DCarousel({
  items,
  autoRotate = true,
  rotationSpeed = 3000,
  className = '',
  onItemClick
}: Image3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoRotate)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  const radius = 250
  const itemCount = items.length

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount)
      }, rotationSpeed)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, rotationSpeed, itemCount])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const getItemTransform = (index: number) => {
    const angle = (360 / itemCount) * (index - currentIndex)
    const rotateY = angle
    const translateZ = radius

    return {
      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
      opacity: Math.abs(angle) > 90 ? 0.3 : 1,
      zIndex: Math.abs(angle) > 90 ? 1 : 10
    }
  }

  return (
    <div className={`relative w-full h-[500px] perspective-1000 ${className}`}>
      {/* Main 3D Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative preserve-3d transition-transform duration-700 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${-currentIndex * (360 / itemCount)}deg)`
          }}
        >
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={item.id}
                className="absolute w-80 h-96 cursor-pointer"
                style={getItemTransform(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  goToSlide(index)
                  if (onItemClick) {
                    onItemClick(item)
                  }
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Container */}
                <div className={`
                  relative w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-300
                  ${isActive ? 'border-cyan-400 neon-glow-cyan' : 'border-white/20'}
                  ${isHovered ? 'border-magenta-400 neon-glow-magenta' : ''}
                `}>
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Cyber Grid Overlay */}
                  <div className="absolute inset-0 cyber-grid opacity-20" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2 neon-text-cyan">
                        {item.title}
                      </h3>

                      <p className="text-white/80 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded text-xs font-mono text-cyan-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.tech.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/50">
                            +{item.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Link Button */}
                      {item.link && isActive && (
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:border-cyan-400 transition-all text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <FiExternalLink size={14} />
                          <span>View Project</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  {/* Active Item Glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400 rounded-xl pointer-events-none"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                          '0 0 20px rgba(0, 255, 255, 0.5)',
                          '0 0 40px rgba(0, 255, 255, 0.8)',
                          '0 0 20px rgba(0, 255, 255, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Previous Button */}
        <motion.button
          onClick={prevSlide}
          className="p-3 glass border border-cyan-400/30 rounded-full text-cyan-400 hover:border-cyan-400 transition-all neon-glow-cyan"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft size={20} />
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlayPause}
          className="p-3 glass border border-magenta-400/30 rounded-full text-magenta-400 hover:border-magenta-400 transition-all neon-glow-magenta"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={nextSlide}
          className="p-3 glass border border-cyan-400/30 rounded-full text-cyan-400 hover:border-cyan-400 transition-all neon-glow-cyan"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight size={20} />
        </motion.button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-cyan-400 neon-glow-cyan'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Current Item Info */}
      <div className="absolute top-6 left-6">
        <div className="glass border border-cyan-400/30 rounded-lg p-4 neon-glow-cyan">
          <div className="text-cyan-400 font-mono text-sm">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
          <div className="text-white font-semibold mt-1">
            {items[currentIndex]?.title}
          </div>
        </div>
      </div>

      {/* CSS for 3D perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
