'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  angle: number
  radius: number
  speed: number
  life: number
  maxLife: number
  color: string
  size: number
  trail: { x: number; y: number; opacity: number }[]
}

export default function ParticleOrbitEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [isActive, setIsActive] = useState(false)

  const neonColors = [
    '#00ffff', // cyan
    '#ff00ff', // magenta
    '#00ff88', // green
    '#ff6b35', // orange
    '#8b5cf6', // purple
    '#ffff00', // yellow
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (mouseX: number, mouseY: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 40
      const speed = 0.02 + Math.random() * 0.04
      const life = 0
      const maxLife = 100 + Math.random() * 50
      const color = neonColors[Math.floor(Math.random() * neonColors.length)]
      const size = 1 + Math.random() * 3

      return {
        x: mouseX + Math.cos(angle) * radius,
        y: mouseY + Math.sin(angle) * radius,
        angle,
        radius,
        speed,
        life,
        maxLife,
        color,
        size,
        trail: []
      }
    }

    const updateParticles = () => {
      const mouse = mouseRef.current

      // Add new particles when mouse is active
      if (isActive && particlesRef.current.length < 30) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push(createParticle(mouse.x, mouse.y))
        }
      }

      // Update existing particles
      particlesRef.current = particlesRef.current.filter(particle => {
        // Update particle position (orbit around mouse)
        particle.angle += particle.speed
        particle.x = mouse.x + Math.cos(particle.angle) * particle.radius
        particle.y = mouse.y + Math.sin(particle.angle) * particle.radius

        // Add current position to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: 1
        })

        // Limit trail length and fade
        if (particle.trail.length > 10) {
          particle.trail.shift()
        }

        // Update trail opacity
        particle.trail.forEach((point, index) => {
          point.opacity = index / particle.trail.length * 0.8
        })

        // Update particle life
        particle.life++
        particle.radius += 0.2 // Slowly expand orbit

        // Remove dead particles
        return particle.life < particle.maxLife
      })
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        // Draw particle trail
        particle.trail.forEach((point, index) => {
          const alpha = point.opacity * (1 - particle.life / particle.maxLife)
          if (alpha <= 0) return

          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = particle.color
          ctx.shadowBlur = 15
          ctx.shadowColor = particle.color

          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * (index / particle.trail.length), 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        // Draw main particle
        const alpha = 1 - particle.life / particle.maxLife
        if (alpha <= 0) return

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color

        // Draw particle with glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Additional glow layer
        ctx.shadowBlur = 40
        ctx.globalAlpha = alpha * 0.5
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    const handleMouseEnter = () => {
      setIsActive(true)
    }

    // Initialize
    resizeCanvas()
    animate()

    // Event listeners
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen' // This creates beautiful blending with the background
      }}
    />
  )
}
