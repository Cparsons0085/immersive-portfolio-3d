'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiCode,
  FiGlobe,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiZap,
  FiMap,
  FiSettings,
  FiLayers,
  FiGitBranch
} from 'react-icons/fi'

interface Skill {
  id: number
  name: string
  category: string
  level: number
  icon: React.ElementType
  color: string
  description: string
}

const skillsData: Skill[] = [
  // Web Development
  { id: 1, name: 'React/Next.js', category: 'Web Dev', level: 95, icon: FiCode, color: 'cyan', description: 'Advanced React patterns & Next.js optimization' },
  { id: 2, name: 'TypeScript', category: 'Web Dev', level: 90, icon: FiCode, color: 'cyan', description: 'Type-safe application development' },
  { id: 3, name: 'Node.js', category: 'Web Dev', level: 85, icon: FiGlobe, color: 'cyan', description: 'Server-side JavaScript & APIs' },
  { id: 4, name: 'Three.js', category: 'Web Dev', level: 80, icon: FiCpu, color: 'cyan', description: '3D graphics and interactive experiences' },

  // Backend & Database
  { id: 5, name: 'Python', category: 'Backend', level: 90, icon: FiDatabase, color: 'magenta', description: 'Backend development & data processing' },
  { id: 6, name: 'PostgreSQL', category: 'Backend', level: 85, icon: FiDatabase, color: 'magenta', description: 'Database design & optimization' },
  { id: 7, name: 'GraphQL', category: 'Backend', level: 80, icon: FiGlobe, color: 'magenta', description: 'Efficient API development' },
  { id: 8, name: 'Redis', category: 'Backend', level: 75, icon: FiZap, color: 'magenta', description: 'Caching & session management' },

  // Automation & DevOps
  { id: 9, name: 'Docker', category: 'Automation', level: 88, icon: FiCloud, color: 'green', description: 'Containerization & deployment' },
  { id: 10, name: 'CI/CD', category: 'Automation', level: 85, icon: FiSettings, color: 'green', description: 'Automated deployment pipelines' },
  { id: 11, name: 'AWS', category: 'Automation', level: 82, icon: FiCloud, color: 'green', description: 'Cloud infrastructure & services' },
  { id: 12, name: 'Terraform', category: 'Automation', level: 78, icon: FiSettings, color: 'green', description: 'Infrastructure as Code' },

  // GIS & Specialized
  { id: 13, name: 'QGIS', category: 'GIS', level: 90, icon: FiMap, color: 'orange', description: 'Geographic information systems' },
  { id: 14, name: 'PostGIS', category: 'GIS', level: 85, icon: FiMap, color: 'orange', description: 'Spatial database extensions' },
  { id: 15, name: 'Leaflet', category: 'GIS', level: 80, icon: FiMap, color: 'orange', description: 'Interactive web mapping' },
  { id: 16, name: 'GeoServer', category: 'GIS', level: 75, icon: FiGlobe, color: 'orange', description: 'Geospatial data serving' },
]

const techKeywords = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
  'Python', 'FastAPI', 'Automation', 'CI/CD', 'GraphQL', 'REST',
  'Tailwind', 'Three.js', 'GSAP', 'Framer Motion', 'Jest', 'Cypress',
  'QGIS', 'PostGIS', 'Leaflet', 'GeoServer', 'Redis', 'Terraform',
  'GitHub Actions', 'Azure', 'GCP', 'Prisma', 'tRPC', 'Zustand'
]

const categories = ['All', 'Web Dev', 'Backend', 'Automation', 'GIS']

export default function SkillsRoom() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [orbitingSkills, setOrbitingSkills] = useState<Skill[]>([])
  const [animatedKeywords, setAnimatedKeywords] = useState<string[]>([])

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory)

  // Initialize orbiting skills and keywords
  useEffect(() => {
    // Select 8 skills for orbiting animation
    const topSkills = skillsData
      .sort((a, b) => b.level - a.level)
      .slice(0, 8)
    setOrbitingSkills(topSkills)

    // Animate keywords in sequence
    techKeywords.forEach((keyword, index) => {
      setTimeout(() => {
        setAnimatedKeywords(prev => [...prev, keyword])
      }, index * 150)
    })
  }, [])

  const getColorClasses = (color: string) => {
    const colorMap = {
      cyan: 'border-cyan-400 text-cyan-400 neon-glow-cyan',
      magenta: 'border-magenta-500 text-magenta-400 neon-glow-magenta',
      green: 'border-green-500 text-green-400 neon-glow-green',
      orange: 'border-orange-500 text-orange-400 neon-glow-orange',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan
  }

  const getCategoryColor = (category: string) => {
    const colorMap = {
      'Web Dev': 'cyan',
      'Backend': 'magenta',
      'Automation': 'green',
      'GIS': 'orange',
    }
    return colorMap[category as keyof typeof colorMap] || 'cyan'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative min-h-screen py-8">
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 ? 'bg-cyan-400' :
              i % 4 === 1 ? 'bg-magenta-500' :
              i % 4 === 2 ? 'bg-green-400' : 'bg-orange-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 relative z-10"
      >
        <h1 className="text-5xl font-bold neon-text-magenta">
          SKILLS LABORATORY
        </h1>
        <p className="text-xl text-white/70">
          Technical Expertise & Digital Mastery
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-magenta-500 to-green-400 mx-auto rounded-full" />
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center space-x-4 relative z-10"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-3 rounded-full font-mono text-sm transition-all duration-300 shadow-lg
              ${selectedCategory === category
                ? 'bg-magenta-500/20 border-2 border-magenta-400 text-magenta-400 neon-glow-magenta'
                : 'bg-white/5 border border-white/20 text-white/70 hover:border-magenta-400/50 hover:text-magenta-400'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Orbiting Tech Icons & Skills */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Orbiting Animation Container */}
          <div className="relative">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Technology Orbit</h2>
            <div className="relative w-96 h-96 mx-auto">
              {/* Central Core */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400 via-magenta-500 to-green-400 rounded-full flex items-center justify-center text-3xl shadow-2xl neon-glow-cyan"
                animate={{
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.8)',
                    '0 0 40px rgba(255, 0, 255, 0.8)',
                    '0 0 20px rgba(0, 255, 255, 0.8)'
                  ]
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                💻
              </motion.div>

              {/* Orbiting Skill Icons */}
              {orbitingSkills.map((skill, index) => {
                const angle = (index / orbitingSkills.length) * 2 * Math.PI
                const radius = 140
                const Icon = skill.icon

                return (
                  <motion.div
                    key={skill.id}
                    className={`absolute w-16 h-16 glass border-2 ${getColorClasses(skill.color)} rounded-full flex items-center justify-center text-xl shadow-lg backdrop-blur-sm`}
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: Math.cos(angle + Date.now() * 0.0005) * radius - 32,
                      y: Math.sin(angle + Date.now() * 0.0005) * radius - 32,
                    }}
                    transition={{
                      duration: 0,
                      repeat: Infinity,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    <Icon className={`text-${skill.color}-400`} />

                    {/* Skill Level Indicator */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-black/80 border border-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-xs text-cyan-400 font-mono">{skill.level}</span>
                    </div>

                    {/* Orbit Trail */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-cyan-400/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                )
              })}

              {/* Orbital Rings */}
              {[120, 160, 200].map((radius, index) => (
                <motion.div
                  key={radius}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-cyan-400/20 rounded-full"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated Keywords Cloud */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-magenta-400 text-center">Tech Stack Cloud</h2>

          {/* Keywords Cloud Container */}
          <div className="glass border border-magenta-400/30 rounded-xl p-8 neon-glow-magenta min-h-[400px] relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-magenta-500/5 via-cyan-500/5 to-green-500/5 rounded-xl"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255, 0, 255, 0.05), rgba(0, 255, 255, 0.05), rgba(0, 255, 136, 0.05))",
                  "linear-gradient(45deg, rgba(0, 255, 136, 0.05), rgba(255, 0, 255, 0.05), rgba(0, 255, 255, 0.05))",
                  "linear-gradient(45deg, rgba(0, 255, 255, 0.05), rgba(0, 255, 136, 0.05), rgba(255, 0, 255, 0.05))"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              {animatedKeywords.map((keyword, index) => {
                const colors = ['cyan', 'magenta', 'green', 'orange']
                const color = colors[index % colors.length]

                return (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      delay: index * 0.05,
                      y: {
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }
                    }}
                    className={`
                      px-4 py-2 glass rounded-full text-sm font-mono font-bold cursor-pointer
                      transition-all duration-300 shadow-lg backdrop-blur-sm
                      border border-${color}-400/30 text-${color}-400
                      hover:border-${color}-400 hover:scale-110 hover:neon-glow-${color}
                    `}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {keyword}
                  </motion.span>
                )
              })}
            </div>

            {/* Floating tech symbols */}
            <div className="absolute inset-0 pointer-events-none">
              {['⚛️', '🔷', '🟢', '🟠', '🟣', '⚙️', '🚀', '💎'].map((symbol, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl opacity-20"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {symbol}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {filteredSkills.map((skill, index) => {
          const Icon = skill.icon
          const isHovered = hoveredSkill === skill.id

          return (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className={`
                relative group glass border-2 rounded-xl p-6 cursor-pointer
                transition-all duration-300 transform hover:scale-105 shadow-xl
                ${getColorClasses(skill.color)}
              `}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Skill Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${skill.color}-500/10 shadow-lg`}>
                  <Icon size={28} className={`text-${skill.color}-400`} />
                </div>
                <div className="text-right">
                  <div className={`text-lg font-mono text-${skill.color}-400 font-bold`}>
                    {skill.level}%
                  </div>
                  <div className="text-xs text-white/50 uppercase font-mono tracking-wider">
                    {skill.category}
                  </div>
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-xl font-bold text-white mb-3">
                {skill.name}
              </h3>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className={`h-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-600 rounded-full shadow-lg`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Description */}
              <motion.p
                className="text-sm text-white/70 leading-relaxed"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                {skill.description}
              </motion.p>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-${skill.color}-400 pointer-events-none`}
                initial={false}
                animate={{ opacity: isHovered ? 0.15 : 0 }}
              />

              {/* Category Badge */}
              <div className={`absolute -top-2 -right-2 px-2 py-1 bg-${getCategoryColor(skill.category)}-500/20 border border-${getCategoryColor(skill.category)}-400/50 rounded-full`}>
                <span className={`text-xs font-mono text-${getCategoryColor(skill.category)}-400 font-bold`}>
                  {skill.category}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
      >
        {[
          { label: 'Technologies', value: skillsData.length, color: 'cyan', icon: '🛠️' },
          { label: 'Average Level', value: Math.round(skillsData.reduce((acc, skill) => acc + skill.level, 0) / skillsData.length), color: 'magenta', icon: '📊' },
          { label: 'Categories', value: new Set(skillsData.map(s => s.category)).size, color: 'green', icon: '📁' },
          { label: 'Years Experience', value: '5+', color: 'orange', icon: '⏰' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            className="glass border border-white/10 rounded-xl p-6 text-center neon-glow-cyan shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className={`text-3xl font-bold neon-text-${stat.color} font-mono`}>
              {typeof stat.value === 'number' && stat.label !== 'Years Experience' ? stat.value : stat.value}
              {stat.label === 'Average Level' ? '%' : ''}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wider mt-2 font-mono">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
