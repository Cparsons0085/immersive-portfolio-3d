'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiGithub, FiExternalLink, FiCode, FiStar, FiGitBranch,
  FiMail, FiLinkedin, FiMapPin, FiDownload, FiTerminal,
  FiCpu, FiDatabase, FiCloud, FiZap, FiEye, FiSettings
} from 'react-icons/fi'

interface OverviewPageProps {
  onToggleView: () => void
}

const pinnedProjects = [
  {
    id: 1,
    name: 'Neon Portfolio 3D',
    description: 'Immersive cyberpunk portfolio with Three.js',
    tech: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    stars: 247,
    forks: 42,
    url: 'https://github.com/cristy/neon-portfolio',
    demo: 'https://neon-portfolio.vercel.app',
    color: '#00ffff'
  },
  {
    id: 2,
    name: 'GeoSpatial Analytics',
    description: 'Real-time geospatial data visualization platform',
    tech: ['React', 'PostGIS', 'Leaflet', 'Python'],
    stars: 189,
    forks: 31,
    url: 'https://github.com/cristy/geo-analytics',
    demo: 'https://geo-analytics.com',
    color: '#ff00ff'
  },
  {
    id: 3,
    name: 'AI Automation Suite',
    description: 'Intelligent workflow automation system',
    tech: ['Python', 'TensorFlow', 'Docker', 'Redis'],
    stars: 156,
    forks: 28,
    url: 'https://github.com/cristy/ai-automation',
    color: '#00ff88'
  },
  {
    id: 4,
    name: 'Neural Network Visualizer',
    description: 'Interactive ML model visualization tool',
    tech: ['D3.js', 'Python', 'WebGL', 'FastAPI'],
    stars: 445,
    forks: 89,
    url: 'https://github.com/cristy/nn-visualizer',
    demo: 'https://nn-viz.vercel.app',
    color: '#ff6b35'
  }
]

const sidebarSections = [
  {
    title: 'README.md',
    icon: FiCode,
    content: `# Cristy Parsons
Software Engineer & Automation Specialist

## 🚀 Currently Building
- AI-powered automation systems
- 3D web experiences with Three.js
- Geospatial data visualization tools

## 💻 Tech Stack
- **Frontend**: React, Next.js, TypeScript, Three.js
- **Backend**: Python, Node.js, PostgreSQL, Redis
- **Cloud**: AWS, Docker, Terraform, Kubernetes
- **GIS**: QGIS, PostGIS, Leaflet, ArcGIS

## 🍀 Philosophy
"Don't Pluck Your Luck" - Building reliable systems
through thoughtful automation and clean code.`
  },
  {
    title: 'GeoClover.js',
    icon: FiMapPin,
    content: `// Lucky GIS utilities for spatial analysis
export const GeoClover = {
  // Generate optimal luck patterns using spatial algorithms
  generateLuckZones: (bounds) => {
    return calculateFortunateCoordinates(bounds)
  },

  // Find the luckiest route between two points
  findLuckyPath: (start, end) => {
    return optimizeForSerendipity(start, end)
  },

  // Detect probability hotspots in geospatial data
  detectLuckClusters: (data) => {
    return clusterByFortune(data)
  }
}`
  },
  {
    title: 'ArcGIS Integration',
    icon: FiDatabase,
    content: `// Enterprise GIS solutions with ArcGIS
class LuckyGISProcessor {
  constructor(arcgisConfig) {
    this.service = new ArcGISService(arcgisConfig)
    this.cloverEngine = new CloverLuckEngine()
  }

  async processLayers(layers) {
    const fortifiedLayers = await this.cloverEngine
      .enhanceWithLuck(layers)

    return this.service.publishLayers(fortifiedLayers)
  }

  generateFortunateVisualization(data) {
    return this.cloverEngine.visualizeLuck(data)
  }
}`
  }
]

const skills = [
  { name: 'React/Next.js', level: 95, icon: FiCode, color: '#00ffff' },
  { name: 'Python', level: 90, icon: FiCpu, color: '#ff00ff' },
  { name: 'Three.js', level: 85, icon: FiEye, color: '#00ff88' },
  { name: 'AWS/Cloud', level: 82, icon: FiCloud, color: '#ff6b35' },
  { name: 'PostGIS', level: 88, icon: FiDatabase, color: '#8b5cf6' },
  { name: 'Docker', level: 85, icon: FiSettings, color: '#f59e0b' }
]

export default function OverviewPage({ onToggleView }: OverviewPageProps) {
  const [terminalText, setTerminalText] = useState('')
  const [selectedSection, setSelectedSection] = useState(0)
  const [showContent, setShowContent] = useState(false)

  const terminalCommands = [
    '$ whoami',
    'cristy@portfolio:~$ Cristy Parsons',
    'Software Engineer | AI & Automation Specialist',
    'Location: San Francisco, CA',
    'Focus: Intelligent automation, 3D web experiences, GIS systems',
    '',
    '$ ls -la projects/',
    'total 4 repositories',
    'drwxr-xr-x  neon-portfolio-3d/',
    'drwxr-xr-x  geospatial-analytics/',
    'drwxr-xr-x  ai-automation-suite/',
    'drwxr-xr-x  neural-network-viz/',
    '',
    '$ cat motto.txt',
    '"Don\'t Pluck Your Luck" 🍀',
    '',
    'cristy@portfolio:~$ _'
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < terminalCommands.length) {
        setTerminalText(prev => prev + (index > 0 ? '\n' : '') + terminalCommands[index])
        index++
      } else {
        setShowContent(true)
        clearInterval(interval)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-magenta-500' : 'bg-green-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-cyan-400/30"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center text-2xl">
              👩‍💻
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-text-cyan">Cristy Parsons</h1>
              <p className="text-magenta-400 font-mono">Software Engineer & Automation Specialist</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onToggleView}
              className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-lg font-mono text-purple-400 hover:border-purple-400 transition-all neon-glow-purple"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Enter 3D Mode
            </motion.button>

            <a
              href="mailto:cristy@example.com"
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:border-cyan-400 transition-all"
            >
              <FiMail size={18} />
            </a>

            <a
              href="#"
              className="px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-lg text-green-400 hover:border-green-400 transition-all"
            >
              <FiDownload size={18} />
            </a>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* Terminal Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass border border-cyan-400/30 rounded-xl overflow-hidden neon-glow-cyan">
            <div className="bg-black/60 px-4 py-3 border-b border-cyan-400/30 flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <FiTerminal className="text-cyan-400" size={16} />
              <span className="text-cyan-400 font-mono text-sm">overview-terminal</span>
            </div>

            <div className="bg-black/80 p-6 font-mono text-sm h-80 overflow-y-auto">
              <pre className="neon-text-cyan whitespace-pre-wrap leading-relaxed">
                {terminalText}
                <motion.span
                  className="terminal-cursor inline-block w-2 h-5 bg-cyan-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  █
                </motion.span>
              </pre>
            </div>
          </div>

          {/* Skills Grid */}
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass border border-magenta-400/30 rounded-xl p-6 neon-glow-magenta"
            >
              <h3 className="text-xl font-bold neon-text-magenta mb-4">Core Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-white/10"
                    >
                      <Icon size={20} style={{ color: skill.color }} />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{skill.name}</div>
                        <div className="h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-mono" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Pinned Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl font-bold neon-text-green mb-6">📌 Pinned Projects</h2>
          <div className="space-y-4">
            {pinnedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer neon-glow-green"
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: `0 0 20px ${project.color}20`
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}` }}
                    >
                      <FiCode style={{ color: project.color }} size={16} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-white/60">
                    <FiStar size={14} />
                    <span className="text-sm">{project.stars}</span>
                    <FiGitBranch size={14} />
                    <span className="text-sm">{project.forks}</span>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/10 border border-cyan-400/30 rounded text-xs font-mono text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={project.url}
                    className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Sections */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-4 mt-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Section Tabs */}
              <div className="space-y-2">
                {sidebarSections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <motion.button
                      key={section.title}
                      onClick={() => setSelectedSection(index)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        selectedSection === index
                          ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:text-cyan-400'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span className="font-mono text-sm">{section.title}</span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Section Content */}
              <div className="lg:col-span-3">
                <div className="glass border border-cyan-400/30 rounded-xl p-6 neon-glow-cyan">
                  <pre className="text-cyan-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {sidebarSections[selectedSection].content}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 border-t border-cyan-400/30 p-6 mt-12"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="https://github.com/cristy" className="text-white/60 hover:text-cyan-400 transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/cristy-parsons" className="text-white/60 hover:text-cyan-400 transition-colors">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:cristy@example.com" className="text-white/60 hover:text-cyan-400 transition-colors">
              <FiMail size={20} />
            </a>
          </div>

          <div className="text-white/40 font-mono text-sm">
            "Don't Pluck Your Luck" 🍀 • Built with Next.js & Three.js
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
