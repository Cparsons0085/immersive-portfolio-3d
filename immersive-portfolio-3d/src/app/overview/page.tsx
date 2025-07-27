'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FiGithub, FiExternalLink, FiCode, FiStar, FiGitBranch,
  FiMail, FiLinkedin, FiMapPin, FiDownload, FiArrowLeft,
  FiCpu, FiDatabase, FiCloud, FiZap, FiEye, FiSettings,
  FiHome, FiUser, FiMessageSquare, FiTerminal, FiShield
} from 'react-icons/fi'

const projects = [
  {
    id: 1,
    name: 'Neon Portfolio 3D',
    description: 'Immersive cyberpunk portfolio with Three.js and GSAP animations',
    tech: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    stars: 247,
    forks: 42,
    url: 'https://github.com/cristy/neon-portfolio',
    demo: 'https://neon-portfolio.vercel.app',
    color: '#00ffff'
  },
  {
    id: 2,
    name: 'GeoSpatial Analytics',
    description: 'Real-time geospatial data visualization platform with PostGIS',
    tech: ['React', 'PostGIS', 'Leaflet', 'Python', 'FastAPI'],
    stars: 189,
    forks: 31,
    url: 'https://github.com/cristy/geo-analytics',
    demo: 'https://geo-analytics.com',
    color: '#ff00ff'
  },
  {
    id: 3,
    name: 'AI Automation Suite',
    description: 'Intelligent workflow automation system with ML models',
    tech: ['Python', 'TensorFlow', 'Docker', 'Redis', 'PostgreSQL'],
    stars: 156,
    forks: 28,
    url: 'https://github.com/cristy/ai-automation',
    color: '#00ff88'
  },
  {
    id: 4,
    name: 'Neural Network Visualizer',
    description: 'Interactive ML model visualization tool with WebGL rendering',
    tech: ['D3.js', 'Python', 'WebGL', 'FastAPI', 'TensorFlow'],
    stars: 445,
    forks: 89,
    url: 'https://github.com/cristy/nn-visualizer',
    demo: 'https://nn-viz.vercel.app',
    color: '#ff6b35'
  },
  {
    id: 5,
    name: 'Cyberpunk Game Engine',
    description: 'WebGL-based 3D game engine with physics simulation',
    tech: ['WebGL', 'JavaScript', 'GLSL', 'Web Audio API'],
    stars: 324,
    forks: 67,
    url: 'https://github.com/cristy/cyber-engine',
    demo: 'https://cyber-engine-demo.vercel.app',
    color: '#8b5cf6'
  },
  {
    id: 6,
    name: 'Cloud Infrastructure Manager',
    description: 'Multi-cloud deployment orchestration with Terraform',
    tech: ['Terraform', 'Kubernetes', 'AWS', 'Azure', 'Monitoring'],
    stars: 98,
    forks: 19,
    url: 'https://github.com/cristy/cloud-manager',
    color: '#f59e0b'
  }
]

const skills = [
  { name: 'React/Next.js', level: 95, icon: FiCode, color: '#00ffff', category: 'Frontend' },
  { name: 'TypeScript', level: 90, icon: FiCode, color: '#00ffff', category: 'Frontend' },
  { name: 'Three.js', level: 85, icon: FiEye, color: '#00ffff', category: 'Frontend' },
  { name: 'Python', level: 90, icon: FiCpu, color: '#ff00ff', category: 'Backend' },
  { name: 'PostgreSQL', level: 85, icon: FiDatabase, color: '#ff00ff', category: 'Backend' },
  { name: 'FastAPI', level: 80, icon: FiDatabase, color: '#ff00ff', category: 'Backend' },
  { name: 'AWS', level: 82, icon: FiCloud, color: '#00ff88', category: 'DevOps' },
  { name: 'Docker', level: 85, icon: FiSettings, color: '#00ff88', category: 'DevOps' },
  { name: 'Terraform', level: 78, icon: FiSettings, color: '#00ff88', category: 'DevOps' },
  { name: 'QGIS', level: 90, icon: FiMapPin, color: '#ff6b35', category: 'GIS' },
  { name: 'PostGIS', level: 85, icon: FiMapPin, color: '#ff6b35', category: 'GIS' },
  { name: 'Leaflet', level: 80, icon: FiMapPin, color: '#ff6b35', category: 'GIS' }
]

const aiAgents = [
  {
    id: 1,
    name: 'Clover Intelligence System',
    description: 'AI-powered luck generation and probability manipulation using quantum algorithms',
    status: 'classified',
    capabilities: ['Quantum Probability', 'Luck Generation', 'Fortune Prediction'],
    classification: 'TOP_SECRET',
    cloverLevel: 5
  },
  {
    id: 2,
    name: 'GeoClover Analyzer',
    description: 'Geospatial AI that identifies optimal fortune zones in geographic data',
    status: 'active',
    capabilities: ['Spatial Analysis', 'Pattern Recognition', 'Route Optimization'],
    classification: 'CLASSIFIED',
    cloverLevel: 4
  },
  {
    id: 3,
    name: 'Neural Luck Predictor',
    description: 'ML model trained on 10,000+ successful outcomes to predict fortune',
    status: 'testing',
    capabilities: ['Predictive Analytics', 'Pattern Learning', 'Outcome Optimization'],
    classification: 'RESTRICTED',
    cloverLevel: 3
  },
  {
    id: 4,
    name: 'Automation Oracle',
    description: 'Workflow optimization AI that predicts the most fortunate automation paths',
    status: 'deployed',
    capabilities: ['Process Optimization', 'Decision Trees', 'Efficiency Analysis'],
    classification: 'CONFIDENTIAL',
    cloverLevel: 2
  }
]

const contactMethods = [
  { icon: FiMail, label: 'Email', value: 'cristy@example.com', link: 'mailto:cristy@example.com' },
  { icon: FiLinkedin, label: 'LinkedIn', value: '/in/cristy-parsons', link: 'https://linkedin.com/in/cristy-parsons' },
  { icon: FiGithub, label: 'GitHub', value: '@cristy', link: 'https://github.com/cristy' },
  { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA', link: '' }
]

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All')

  const skillCategories = ['All', ...new Set(skills.map(s => s.category))]
  const filteredSkills = selectedSkillCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedSkillCategory)

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP_SECRET': return 'text-red-400 border-red-400/50 bg-red-400/10'
      case 'CLASSIFIED': return 'text-orange-400 border-orange-400/50 bg-orange-400/10'
      case 'RESTRICTED': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
      case 'CONFIDENTIAL': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10'
      default: return 'text-green-400 border-green-400/50 bg-green-400/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'testing': return 'text-yellow-400'
      case 'classified': return 'text-red-400'
      case 'deployed': return 'text-cyan-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
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
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-cyan-400/30 bg-black/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="font-mono">Back to Immersive</span>
            </Link>

            <div className="flex items-center space-x-4 ml-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center text-2xl">
                👩‍💻
              </div>
              <div>
                <h1 className="text-2xl font-bold neon-text-cyan">Cristy Parsons</h1>
                <p className="text-magenta-400 font-mono">Software Engineer & Automation Specialist</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="mailto:cristy@example.com"
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:border-cyan-400 transition-all"
            >
              <FiMail size={18} />
            </a>
            <button className="px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-lg text-green-400 hover:border-green-400 transition-all">
              <FiDownload size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass border border-cyan-400/30 rounded-full p-2 neon-glow-cyan">
            {[
              { id: 'projects', label: 'Projects', icon: FiCode },
              { id: 'skills', label: 'Skills', icon: FiCpu },
              { id: 'agents', label: 'AI Agents', icon: FiShield },
              { id: 'contact', label: 'Contact', icon: FiUser }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-mono transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-cyan-400/20 text-cyan-400 neon-glow-cyan'
                      : 'text-white/70 hover:text-cyan-400'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Projects Section */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold neon-text-green text-center mb-8">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass border border-white/20 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
                    style={{
                      boxShadow: `0 0 20px ${project.color}20`
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}` }}
                        >
                          <FiCode style={{ color: project.color }} size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <FiStar size={14} />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>

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
            </div>
          )}

          {/* Skills Section */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold neon-text-magenta text-center mb-8">Technical Skills</h2>

              {/* Category Filter */}
              <div className="flex justify-center space-x-4 mb-8">
                {skillCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedSkillCategory(category)}
                    className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                      selectedSkillCategory === category
                        ? 'bg-magenta-500/20 border-2 border-magenta-400 text-magenta-400 neon-glow-magenta'
                        : 'bg-white/5 border border-white/20 text-white/70 hover:border-magenta-400/50 hover:text-magenta-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSkills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass border-2 rounded-xl p-6 hover:scale-105 transition-all duration-300`}
                      style={{ borderColor: skill.color + '40' }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg`} style={{ backgroundColor: skill.color + '20' }}>
                          <Icon size={24} style={{ color: skill.color }} />
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-mono font-bold`} style={{ color: skill.color }}>
                            {skill.level}%
                          </div>
                          <div className="text-xs text-white/50 uppercase">{skill.category}</div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3">{skill.name}</h3>

                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* AI Agents Section */}
          {activeTab === 'agents' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold neon-text-purple text-center mb-8">AI Agent Arsenal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aiAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass border-2 rounded-xl p-6 ${getClassificationColor(agent.classification)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-green-400">{agent.name}</h3>
                      <div className="flex space-x-1">
                        {Array.from({ length: agent.cloverLevel }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="text-green-400"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          >
                            🍀
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <p className="text-white/80 mb-4 leading-relaxed">{agent.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-xs font-mono text-green-400"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getClassificationColor(agent.classification)}`}>
                        {agent.classification}
                      </div>
                      <div className={`font-mono text-sm ${getStatusColor(agent.status)}`}>
                        STATUS: {agent.status.toUpperCase()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <div className="glass border border-green-400/30 rounded-lg p-6 inline-block neon-glow-green">
                  <p className="text-green-300 font-mono text-lg italic mb-2">
                    "Don't Pluck Your Luck - Let the AI handle it!" 🍀
                  </p>
                  <div className="text-green-400/60 font-mono text-sm">
                    All agents powered by quantum luck algorithms
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold neon-text-cyan text-center mb-8">Get In Touch</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="glass border border-cyan-400/30 rounded-xl p-6 neon-glow-cyan">
                    <h3 className="text-xl font-bold text-cyan-400 mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      {contactMethods.map((method, index) => {
                        const Icon = method.icon
                        return (
                          <motion.a
                            key={method.label}
                            href={method.link}
                            target={method.link.startsWith('http') ? '_blank' : '_self'}
                            rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg hover:bg-cyan-400/10 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <Icon size={24} className="text-cyan-400 group-hover:text-cyan-300" />
                            <div>
                              <div className="text-white font-medium">{method.label}</div>
                              <div className="text-cyan-400 font-mono text-sm">{method.value}</div>
                            </div>
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>

                  <div className="glass border border-green-400/30 rounded-xl p-4 neon-glow-green">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-3 h-3 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-green-400 font-semibold">Available for Projects</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-mono text-xs">Response: 24h</div>
                        <div className="text-green-400/70 font-mono text-xs">PST (UTC-8)</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Skills Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="glass border border-magenta-400/30 rounded-xl p-6 neon-glow-magenta">
                    <h3 className="text-xl font-bold text-magenta-400 mb-6">Quick Skills Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Frontend', value: '95%', color: '#00ffff' },
                        { label: 'Backend', value: '88%', color: '#ff00ff' },
                        { label: 'DevOps', value: '82%', color: '#00ff88' },
                        { label: 'GIS/Mapping', value: '85%', color: '#ff6b35' }
                      ].map((skill, index) => (
                        <motion.div
                          key={skill.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-center p-4 bg-black/30 rounded-lg"
                        >
                          <div className="text-2xl font-bold font-mono" style={{ color: skill.color }}>
                            {skill.value}
                          </div>
                          <div className="text-sm text-white/60">{skill.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="glass border border-purple-400/30 rounded-xl p-6 neon-glow-purple">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Current Focus</h3>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>AI-powered automation systems</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span>3D web experiences with Three.js</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Geospatial data visualization</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-magenta-400 rounded-full"></div>
                        <span>Cloud infrastructure optimization</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 border-t border-cyan-400/30 bg-black/50 backdrop-blur-sm mt-20"
      >
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
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
