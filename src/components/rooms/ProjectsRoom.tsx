'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGithub,
  FiExternalLink,
  FiCode,
  FiStar,
  FiGitBranch,
  FiCalendar,
  FiTag,
  FiEye,
  FiDownload,
  FiPlay,
  FiBook
} from 'react-icons/fi'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  readme: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  stars: number
  forks: number
  watchers: number
  category: string
  year: string
  status: 'completed' | 'in-progress' | 'archived'
  color: string
  image?: string
  language: string
  size: number // KB
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Neon Portfolio 3D',
    description: 'Immersive cyberpunk portfolio with Three.js',
    longDescription: 'A futuristic 3D portfolio experience built with Next.js, Three.js, and GSAP. Features vertical room navigation, neon aesthetics, and interactive 3D elements.',
    readme: `# Neon Portfolio 3D

## 🚀 Features
- **Immersive 3D Environment**: Built with Three.js for smooth navigation
- **Cyberpunk Aesthetic**: Neon colors and futuristic design
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Room Navigation**: Elevator-style transitions between floors

## 🛠️ Tech Stack
- Next.js 15 with TypeScript
- Three.js for 3D graphics
- GSAP for animations
- Tailwind CSS for styling
- Framer Motion for UI animations

## 📦 Installation
\`\`\`bash
npm install
npm run dev
\`\`\`

Built with ❤️ and lots of ☕`,
    technologies: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/username/neon-portfolio',
    liveUrl: 'https://neon-portfolio.vercel.app',
    stars: 247,
    forks: 42,
    watchers: 15,
    category: 'Web Development',
    year: '2024',
    status: 'completed',
    color: '#00ffff',
    language: 'TypeScript',
    size: 2840
  },
  {
    id: 2,
    title: 'GeoSpatial Analytics Platform',
    description: 'Real-time geospatial data visualization',
    longDescription: 'A comprehensive platform for analyzing and visualizing geospatial data with real-time updates, interactive maps, and advanced analytics capabilities.',
    readme: `# GeoSpatial Analytics Platform

## 📍 Overview
Advanced platform for geospatial data analysis and visualization.

## 🗺️ Features
- Real-time data processing
- Interactive mapping with Leaflet
- PostGIS integration
- Custom analytics dashboard
- Export capabilities

## 🔧 Technologies
- React & TypeScript
- PostGIS & PostgreSQL
- Leaflet for mapping
- Python backend with FastAPI
- Docker deployment

## 🚀 Quick Start
\`\`\`bash
docker-compose up -d
npm install && npm start
\`\`\``,
    technologies: ['React', 'PostGIS', 'Leaflet', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com/username/geo-analytics',
    liveUrl: 'https://geo-analytics.com',
    stars: 189,
    forks: 31,
    watchers: 8,
    category: 'GIS',
    year: '2024',
    status: 'completed',
    color: '#ff00ff',
    language: 'Python',
    size: 4560
  },
  {
    id: 3,
    title: 'AI-Powered Automation Suite',
    description: 'Intelligent workflow automation system',
    longDescription: 'An AI-driven automation platform that streamlines business processes using machine learning algorithms and natural language processing.',
    readme: `# AI Automation Suite

## 🤖 AI-Powered Workflows
Intelligent automation for modern businesses.

## ✨ Key Features
- Natural Language Processing
- Machine Learning Models
- Workflow Automation
- Real-time Analytics
- API Integration

## 🧠 AI Models
- GPT integration for text processing
- Computer vision for document analysis
- Predictive analytics
- Custom model training

## 📋 Usage
\`\`\`python
from ai_suite import AutomationEngine

engine = AutomationEngine()
engine.process_workflow(data)
\`\`\``,
    technologies: ['Python', 'TensorFlow', 'Docker', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/username/ai-automation',
    stars: 156,
    forks: 28,
    watchers: 12,
    category: 'AI/ML',
    year: '2023',
    status: 'in-progress',
    color: '#00ff88',
    language: 'Python',
    size: 6720
  },
  {
    id: 4,
    title: 'Cyberpunk Game Engine',
    description: 'WebGL-based 3D game engine',
    longDescription: 'A lightweight 3D game engine built with WebGL and modern JavaScript, featuring physics simulation, particle systems, and shader effects.',
    readme: `# Cyberpunk Game Engine

## 🎮 Game Development Made Easy
Modern WebGL engine for browser games.

## 🎯 Features
- WebGL 2.0 support
- Physics simulation
- Particle systems
- Custom shaders
- Audio engine
- Asset loading

## 🛠️ Engine Components
- Renderer: WebGL-based
- Physics: Custom engine
- Audio: Web Audio API
- Input: Keyboard/Mouse/Gamepad

## 🎨 Example
\`\`\`javascript
const engine = new CyberEngine();
engine.loadScene('cyberpunk_city');
engine.start();
\`\`\``,
    technologies: ['WebGL', 'JavaScript', 'GLSL', 'Web Audio API'],
    githubUrl: 'https://github.com/username/cyber-engine',
    liveUrl: 'https://cyber-engine-demo.vercel.app',
    stars: 324,
    forks: 67,
    watchers: 23,
    category: 'Game Development',
    year: '2023',
    status: 'completed',
    color: '#8b5cf6',
    language: 'JavaScript',
    size: 3200
  },
  {
    id: 5,
    title: 'Cloud Infrastructure Manager',
    description: 'Multi-cloud deployment orchestration',
    longDescription: 'A comprehensive tool for managing and orchestrating deployments across multiple cloud providers with automated scaling and monitoring.',
    readme: `# Cloud Infrastructure Manager

## ☁️ Multi-Cloud Orchestration
Manage infrastructure across AWS, Azure, and GCP.

## 📊 Features
- Multi-cloud support
- Terraform integration
- Kubernetes orchestration
- Monitoring & alerts
- Cost optimization
- Security scanning

## 🔧 Supported Providers
- AWS (EC2, RDS, S3, Lambda)
- Azure (VMs, Storage, Functions)
- GCP (Compute, Storage, Cloud Functions)

## 🚀 Deployment
\`\`\`bash
cim deploy --provider aws --config prod.yaml
cim scale --instances 5
cim monitor --dashboard
\`\`\``,
    technologies: ['Terraform', 'Kubernetes', 'AWS', 'Azure', 'Monitoring'],
    githubUrl: 'https://github.com/username/cloud-manager',
    stars: 98,
    forks: 19,
    watchers: 6,
    category: 'DevOps',
    year: '2024',
    status: 'in-progress',
    color: '#ff6b35',
    language: 'Go',
    size: 5120
  },
  {
    id: 6,
    title: 'Neural Network Visualizer',
    description: 'Interactive ML model visualization',
    longDescription: 'A web-based tool for visualizing and understanding neural network architectures with real-time training visualization and model analysis.',
    readme: `# Neural Network Visualizer

## 🧠 Visualize AI Models
Interactive tool for understanding neural networks.

## 📈 Visualization Features
- Network architecture display
- Real-time training metrics
- Layer activation visualization
- Weight and bias inspection
- Performance analytics

## 🎯 Supported Models
- Feedforward networks
- Convolutional Neural Networks
- Recurrent Neural Networks
- Transformer architectures

## 💻 Usage
\`\`\`python
from nn_visualizer import NetworkViz

viz = NetworkViz(model)
viz.show_architecture()
viz.animate_training()
\`\`\``,
    technologies: ['D3.js', 'Python', 'TensorFlow', 'WebGL', 'FastAPI'],
    githubUrl: 'https://github.com/username/nn-visualizer',
    liveUrl: 'https://nn-viz.vercel.app',
    stars: 445,
    forks: 89,
    watchers: 34,
    category: 'Machine Learning',
    year: '2023',
    status: 'completed',
    color: '#ff0080',
    language: 'Python',
    size: 7680
  }
]

export default function ProjectsRoom() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid')
  const [showReadme, setShowReadme] = useState(false)

  const categories = ['All', ...new Set(projectsData.map(p => p.category))]
  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'in-progress': return 'text-yellow-400'
      case 'archived': return 'text-gray-400'
      default: return 'text-white'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20 border-green-400/50'
      case 'in-progress': return 'bg-yellow-400/20 border-yellow-400/50'
      case 'archived': return 'bg-gray-400/20 border-gray-400/50'
      default: return 'bg-white/20 border-white/50'
    }
  }

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) return `${sizeInKB}KB`
    return `${(sizeInKB / 1024).toFixed(1)}MB`
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setShowReadme(false)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative min-h-screen py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-magenta-500' : 'bg-green-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.5,
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
        <h1 className="text-5xl font-bold neon-text-blue">
          PROJECT SHOWCASE
        </h1>
        <p className="text-xl text-white/70">
          Digital Creations & Technical Innovations
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mx-auto rounded-full" />
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative z-10">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`
                px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 shadow-lg
                ${filter === category
                  ? 'bg-blue-500/20 border-2 border-blue-400 text-blue-400 neon-glow-blue'
                  : 'bg-white/5 border border-white/20 text-white/70 hover:border-blue-400/50 hover:text-blue-400'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-2"
        >
          <span className="text-sm text-white/70 font-mono">View:</span>
          <div className="flex bg-black/30 rounded-lg p-1 border border-cyan-400/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-400/20 text-cyan-400'
                  : 'text-white/60 hover:text-cyan-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm font-mono transition-all ${
                viewMode === 'cards'
                  ? 'bg-cyan-400/20 text-cyan-400'
                  : 'text-white/60 hover:text-cyan-400'
              }`}
            >
              Cards
            </button>
          </div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className={`grid gap-8 relative z-10 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 lg:grid-cols-2'
        }`}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: hoveredProject === project.id ? 1.02 : 1
            }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="group relative glass border-2 border-white/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleProjectClick(project)}
            style={{
              borderColor: hoveredProject === project.id ? project.color : 'rgba(255, 255, 255, 0.2)',
              boxShadow: hoveredProject === project.id
                ? `0 0 40px ${project.color}40, 0 0 80px ${project.color}20`
                : 'none'
            }}
          >
            {/* Project Header */}
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              {/* Tech Pattern Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-cyan-400/10"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${project.color}20`, border: `2px solid ${project.color}` }}
                  animate={hoveredProject === project.id ? {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2 }}
                >
                  <FiCode style={{ color: project.color }} />
                </motion.div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <div className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${getStatusBg(project.status)} ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>

              {/* Language Badge */}
              <div className="absolute top-3 left-3">
                <div className="px-3 py-1 bg-black/60 border border-cyan-400/50 rounded-full text-xs font-mono text-cyan-400">
                  {project.language}
                </div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                  <span className="text-sm font-mono">Click to explore</span>
                  <FiEye size={18} />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title & Year */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center space-x-1 text-white/50">
                  <FiCalendar size={14} />
                  <span className="text-sm font-mono">{project.year}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 border border-cyan-400/30 rounded text-xs font-mono text-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/50">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-white/60">
                  <div className="flex items-center space-x-1">
                    <FiStar size={14} style={{ color: project.color }} />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiGitBranch size={14} style={{ color: project.color }} />
                    <span>{project.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiEye size={14} style={{ color: project.color }} />
                    <span>{project.watchers}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-white/40">
                  {formatSize(project.size)}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiTag size={14} className="text-white/40" />
                  <span className="text-white/60 text-xs font-mono">{project.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveUrl, '_blank')
                      }}
                      className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiPlay size={14} />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.githubUrl, '_blank')
                    }}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub size={14} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: `linear-gradient(45deg, transparent, ${project.color}40, transparent)`,
                backgroundSize: '200% 200%',
              }}
              animate={hoveredProject === project.id ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
              style={{ backgroundColor: project.color }}
              animate={hoveredProject === project.id ? {
                opacity: [0, 0.1, 0],
                scale: [1, 1.02, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass border-2 rounded-2xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto neon-glow-cyan"
              style={{ borderColor: selectedProject.color }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${selectedProject.color}20`, border: `2px solid ${selectedProject.color}` }}
                  >
                    <FiCode style={{ color: selectedProject.color }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold neon-text-cyan mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-white/60">
                      <span className="font-mono">{selectedProject.year}</span>
                      <span className={getStatusColor(selectedProject.status)}>
                        {selectedProject.status.toUpperCase()}
                      </span>
                      <span className="font-mono text-cyan-400">{selectedProject.language}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/60 hover:text-white text-2xl transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content Toggle */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setShowReadme(false)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    !showReadme
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                      : 'bg-white/5 text-white/70 border border-white/20'
                  }`}
                >
                  Project Info
                </button>
                <button
                  onClick={() => setShowReadme(true)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center space-x-2 ${
                    showReadme
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                      : 'bg-white/5 text-white/70 border border-white/20'
                  }`}
                >
                  <FiBook size={16} />
                  <span>README</span>
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {!showReadme ? (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                  >
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Description</h3>
                        <p className="text-white/80 leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-sm font-mono text-cyan-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="glass rounded-lg p-4 border border-cyan-400/30">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Project Stats</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Stars:</span>
                            <span className="text-white font-mono">{selectedProject.stars}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Forks:</span>
                            <span className="text-white font-mono">{selectedProject.forks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Watchers:</span>
                            <span className="text-white font-mono">{selectedProject.watchers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Size:</span>
                            <span className="text-white font-mono">{formatSize(selectedProject.size)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Language:</span>
                            <span className="text-white font-mono">{selectedProject.language}</span>
                          </div>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="space-y-3">
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                        >
                          <FiGithub size={18} />
                          <span>View on GitHub</span>
                        </a>
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                          >
                            <FiExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="readme"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-black/60 rounded-lg p-6 border border-cyan-400/30"
                  >
                    <pre className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                      {selectedProject.readme}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
