'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCpu,
  FiActivity,
  FiZap,
  FiDatabase,
  FiEye,
  FiTrendingUp,
  FiShield,
  FiLock,
  FiUnlock,
  FiTerminal,
  FiCode,
  FiStar
} from 'react-icons/fi'

interface AIModule {
  id: number
  name: string
  status: 'online' | 'processing' | 'offline' | 'classified'
  progress: number
  icon: React.ElementType
  description: string
  secretLevel: 'public' | 'restricted' | 'classified' | 'top_secret'
  metrics: {
    accuracy: number
    speed: number
    efficiency: number
  }
}

interface SecretProject {
  id: number
  codename: string
  description: string
  status: string
  classification: string
  cloverLevel: number
}

const aiModules: AIModule[] = [
  {
    id: 1,
    name: 'Neural Processing Core',
    status: 'online',
    progress: 94,
    icon: FiCpu,
    description: 'Advanced deep learning algorithms for pattern recognition and data analysis',
    secretLevel: 'public',
    metrics: { accuracy: 97.8, speed: 89.2, efficiency: 94.5 }
  },
  {
    id: 2,
    name: 'Computer Vision Module',
    status: 'processing',
    progress: 76,
    icon: FiEye,
    description: 'Real-time image processing and object detection systems',
    secretLevel: 'restricted',
    metrics: { accuracy: 95.3, speed: 92.1, efficiency: 88.7 }
  },
  {
    id: 3,
    name: 'Predictive Analytics Engine',
    status: 'online',
    progress: 88,
    icon: FiTrendingUp,
    description: 'Machine learning models for forecasting and trend analysis',
    secretLevel: 'classified',
    metrics: { accuracy: 91.6, speed: 85.4, efficiency: 96.2 }
  },
  {
    id: 4,
    name: 'Clover Intelligence System',
    status: 'classified',
    progress: 99,
    icon: FiZap,
    description: 'AI-powered luck generation and probability manipulation',
    secretLevel: 'top_secret',
    metrics: { accuracy: 99.9, speed: 100, efficiency: 99.7 }
  }
]

const secretProjects: SecretProject[] = [
  {
    id: 1,
    codename: 'PROJECT_CLOVER',
    description: 'AI system that generates optimal luck patterns based on quantum probability calculations',
    status: 'ACTIVE',
    classification: 'TOP_SECRET',
    cloverLevel: 5
  },
  {
    id: 2,
    codename: 'LUCKY_ALGORITHM_V3',
    description: 'Machine learning model trained on 10,000+ successful outcomes to predict fortune',
    status: 'TESTING',
    classification: 'CLASSIFIED',
    cloverLevel: 4
  },
  {
    id: 3,
    codename: 'PROBABILITY_ENHANCER',
    description: 'Quantum-based system that subtly influences random events in user\'s favor',
    status: 'DEPLOYED',
    classification: 'RESTRICTED',
    cloverLevel: 3
  },
  {
    id: 4,
    codename: 'FORTUNE_PREDICTOR',
    description: 'Neural network that analyzes cosmic patterns to forecast lucky moments',
    status: 'RESEARCH',
    classification: 'CONFIDENTIAL',
    cloverLevel: 2
  }
]

const dataStreams = [
  { id: 1, name: 'Luck Probability', value: '97.3%', trend: 'up', color: 'green' },
  { id: 2, name: 'Clover Network', value: 'ONLINE', trend: 'stable', color: 'cyan' },
  { id: 3, name: 'Fortune Buffer', value: '2.1K', trend: 'up', color: 'magenta' },
  { id: 4, name: 'Quantum State', value: 'STABLE', trend: 'stable', color: 'blue' },
  { id: 5, name: 'Lucky Events', value: '847', trend: 'up', color: 'green' },
  { id: 6, name: 'Probability Flux', value: '0.003ms', trend: 'down', color: 'yellow' }
]

export default function AILabRoom() {
  const [isLocked, setIsLocked] = useState(true)
  const [password, setPassword] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [selectedModule, setSelectedModule] = useState<AIModule | null>(null)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState('')
  const [showSecrets, setShowSecrets] = useState(false)

  const correctPassword = "clover123"
  const hints = [
    "What brings good luck? (hint: 🍀 + numbers)",
    "Four-leaf fortune + simple digits",
    "The mascot's name + lucky numbers"
  ]

  useEffect(() => {
    if (!isLocked && !showMatrix) {
      setShowMatrix(true)
      // Initialize terminal with startup sequence
      const startupSequence = [
        'AI LAB SYSTEMS ONLINE',
        'LOADING CLASSIFIED MODULES...',
        'SECURITY CLEARANCE: GRANTED',
        'WELCOME TO PROJECT CLOVER',
        'TYPE "help" FOR COMMANDS'
      ]

      let index = 0
      const interval = setInterval(() => {
        if (index < startupSequence.length) {
          setTerminalLines(prev => [...prev, startupSequence[index]])
          index++
        } else {
          clearInterval(interval)
          setCurrentLine('cristy@ai-lab:~$ ')
        }
      }, 800)

      return () => clearInterval(interval)
    }
  }, [isLocked, showMatrix])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === correctPassword) {
      setIsLocked(false)
    } else {
      setAttempts(prev => prev + 1)
      setPassword('')

      if (attempts >= 1) {
        setShowHint(true)
      }

      // Add failed attempt to terminal simulation
      setTerminalLines(prev => [...prev, `ACCESS DENIED - ATTEMPT ${attempts + 1}/3`])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/20'
      case 'processing': return 'text-yellow-400 bg-yellow-400/20'
      case 'classified': return 'text-purple-400 bg-purple-400/20'
      case 'offline': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getClassificationColor = (level: string) => {
    switch (level) {
      case 'TOP_SECRET': return 'text-red-400 border-red-400/50 bg-red-400/10'
      case 'CLASSIFIED': return 'text-orange-400 border-orange-400/50 bg-orange-400/10'
      case 'RESTRICTED': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
      case 'CONFIDENTIAL': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10'
      default: return 'text-green-400 border-green-400/50 bg-green-400/10'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400/30 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 600, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass border border-red-500/50 rounded-2xl p-8 text-center max-w-md w-full relative z-10 neon-glow-red shadow-2xl"
        >
          {/* Warning Header */}
          <div className="mb-8">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🔒
            </motion.div>
            <h2 className="text-3xl font-bold text-red-400 mb-2 neon-text-red">
              RESTRICTED ACCESS
            </h2>
            <p className="text-red-300/80 text-sm font-mono mb-2">
              AI LABORATORY - BASEMENT LEVEL B1
            </p>
            <div className="text-xs text-red-400/60 font-mono">
              SECURITY CLEARANCE REQUIRED
            </div>
          </div>

          {/* Security Interface */}
          <div className="glass border border-red-400/30 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FiShield className="text-red-400" size={20} />
              <span className="text-red-400 font-mono font-bold">QUANTUM ENCRYPTION</span>
            </div>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-red-300 mb-2">
                  ENTER ACCESS CODE:
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/70 border border-red-500/50 rounded text-red-300 font-mono placeholder-red-500/50 focus:border-red-400 focus:outline-none"
                    placeholder="••••••••"
                    autoComplete="off"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white font-mono py-3 rounded hover:from-red-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FiUnlock size={16} />
                <span>ACCESS SYSTEM</span>
              </button>
            </form>
          </div>

          {/* Attempts Warning */}
          {attempts > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-900/50 border border-red-600/50 rounded text-red-300 text-sm font-mono"
            >
              ⚠️ INVALID ACCESS CODE
              <br />
              ATTEMPTS: {attempts}/3
              {attempts >= 2 && <div className="text-red-400 mt-1">LOCKDOWN IMMINENT</div>}
            </motion.div>
          )}

          {/* Hint System */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-900/30 border border-green-600/50 rounded text-green-300 text-sm"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span>💡</span>
                  <span className="text-green-400 font-bold">SECURITY HINT:</span>
                </div>
                <div className="font-mono">{hints[Math.min(attempts - 1, hints.length - 1)]}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secret Clover Hint */}
          <motion.div
            className="mt-6 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
            onClick={() => setShowHint(true)}
            whileHover={{ scale: 1.2, rotate: 15 }}
            title="Lucky hint?"
          >
            <div className="text-3xl">🍀</div>
            <div className="text-xs text-green-400/60 font-mono mt-1">Need luck?</div>
          </motion.div>

          <div className="mt-6 text-xs text-gray-500 font-mono">
            SECURITY LEVEL: MAXIMUM • ENCRYPTION: AES-256
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative min-h-screen py-8">
      {/* Matrix Rain Effect */}
      {showMatrix && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-sm"
              style={{ left: `${(i * 3.33) % 100}%` }}
              animate={{
                y: [0, 900],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            >
              {Array.from({ length: 20 }, () =>
                String.fromCharCode(0x30A0 + Math.random() * 96)
              ).join('')}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 relative z-10"
      >
        <h1 className="text-5xl font-bold neon-text-purple font-mono">
          AI RESEARCH LAB
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
          <span className="text-purple-400 font-mono text-sm">BASEMENT LEVEL B1 • CLASSIFIED</span>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-red-400 text-sm font-mono">
          <FiShield size={16} />
          <span>SECURITY CLEARANCE: TOP SECRET</span>
        </div>
      </motion.div>

      {/* Main Control Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* AI Modules */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold neon-text-cyan mb-6">Classified AI Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiModules.map((module, index) => {
                const Icon = module.icon

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass border border-purple-500/30 rounded-xl p-6 cursor-pointer hover:border-purple-400 transition-all duration-300 group neon-glow-purple"
                    onClick={() => setSelectedModule(module)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg neon-glow-purple">
                          <Icon size={24} className="text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {module.name}
                          </h3>
                          <div className={`text-xs px-2 py-1 rounded-full font-mono border ${getStatusColor(module.status)}`}>
                            {module.status.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Security Badge */}
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded border font-mono ${
                          module.secretLevel === 'top_secret' ? 'text-red-400 border-red-400/50' :
                          module.secretLevel === 'classified' ? 'text-orange-400 border-orange-400/50' :
                          module.secretLevel === 'restricted' ? 'text-yellow-400 border-yellow-400/50' :
                          'text-green-400 border-green-400/50'
                        }`}>
                          {module.secretLevel.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Progress</span>
                        <span className="text-purple-400 font-mono">{module.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1.5 }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {module.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-green-400 font-mono">{module.metrics.accuracy}%</div>
                        <div className="text-white/40">Accuracy</div>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-cyan-400 font-mono">{module.metrics.speed}%</div>
                        <div className="text-white/40">Speed</div>
                      </div>
                      <div className="text-center p-2 bg-black/30 rounded">
                        <div className="text-magenta-400 font-mono">{module.metrics.efficiency}%</div>
                        <div className="text-white/40">Efficiency</div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Real-time Data & Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Real-time Data Streams */}
          <div className="glass border border-cyan-500/30 rounded-xl p-6 neon-glow-cyan">
            <h3 className="font-bold text-cyan-400 mb-4 flex items-center space-x-2">
              <FiActivity size={18} />
              <span>Live Data Streams</span>
            </h3>

            <div className="space-y-3">
              {dataStreams.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/10"
                >
                  <span className="text-white/70 text-sm font-mono">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-${item.color}-400 font-mono text-sm font-bold`}>{item.value}</span>
                    <span className={`text-xs ${
                      item.trend === 'up' ? 'text-green-400' :
                      item.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {getTrendIcon(item.trend)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mini Terminal */}
          <div className="glass border border-green-400/30 rounded-xl p-4 neon-glow-green">
            <div className="flex items-center space-x-2 mb-4 text-green-400">
              <FiTerminal size={16} />
              <span className="font-mono text-sm font-bold">AI-LAB Terminal</span>
            </div>

            <div className="bg-black/60 rounded p-3 h-32 overflow-y-auto font-mono text-xs">
              {terminalLines.map((line, index) => (
                <div key={index} className="text-green-400 mb-1">{line}</div>
              ))}
              <div className="text-green-400">
                {currentLine}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="bg-green-400 text-black"
                >
                  █
                </motion.span>
              </div>
            </div>
          </div>

          {/* Secret Projects Button */}
          <motion.button
            onClick={() => setShowSecrets(!showSecrets)}
            className="w-full glass border border-red-400/30 rounded-xl p-4 text-center transition-all duration-300 hover:border-red-400 group neon-glow-red"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <FiCode className="text-red-400 group-hover:text-red-300" size={20} />
              <span className="text-red-400 font-mono font-bold group-hover:text-red-300">
                {showSecrets ? 'HIDE' : 'REVEAL'} SECRET PROJECTS
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Secret Projects Section */}
      <AnimatePresence>
        {showSecrets && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="relative z-10"
          >
            <div className="glass border border-green-400/30 rounded-2xl p-8 neon-glow-green">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <span className="text-4xl">🍀</span>
                <h3 className="text-3xl font-bold neon-text-green font-mono">PROJECT CLOVER</h3>
                <span className="text-4xl">🍀</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secretProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`glass border-2 rounded-xl p-6 ${getClassificationColor(project.classification)} neon-glow-green`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-green-400 font-mono">
                        {project.codename}
                      </h4>
                      <div className="flex space-x-1">
                        {Array.from({ length: project.cloverLevel }).map((_, i) => (
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

                    <p className="text-white/80 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getClassificationColor(project.classification)}`}>
                        {project.classification}
                      </div>
                      <div className="text-green-400 font-mono text-sm">
                        STATUS: {project.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-green-300 font-mono text-lg italic">
                  "In AI we trust, in luck we code" 🍀
                </p>
                <div className="text-green-400/60 font-mono text-sm mt-2">
                  Don't Pluck Your Luck - Let the AI handle it!
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              className="glass border-2 border-purple-400 rounded-2xl p-8 max-w-2xl w-full neon-glow-purple"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <selectedModule.icon size={32} className="text-purple-400" />
                  <div>
                    <h2 className="text-2xl font-bold neon-text-purple">{selectedModule.name}</h2>
                    <div className={`text-sm px-2 py-1 rounded font-mono border ${getStatusColor(selectedModule.status)}`}>
                      {selectedModule.status.toUpperCase()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-white/60 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed">{selectedModule.description}</p>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/30">
                  <div className="text-3xl font-bold text-green-400 font-mono">
                    {selectedModule.metrics.accuracy}%
                  </div>
                  <div className="text-white/60 text-sm mt-1">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/30">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">
                    {selectedModule.metrics.speed}%
                  </div>
                  <div className="text-white/60 text-sm mt-1">Speed</div>
                </div>
                <div className="text-center p-4 bg-magenta-400/10 rounded-lg border border-magenta-400/30">
                  <div className="text-3xl font-bold text-magenta-400 font-mono">
                    {selectedModule.metrics.efficiency}%
                  </div>
                  <div className="text-white/60 text-sm mt-1">Efficiency</div>
                </div>
              </div>

              <div className="text-center">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(selectedModule.status)}`}>
                  <div className={`w-2 h-2 rounded-full ${
                    selectedModule.status === 'online' ? 'bg-green-400' :
                    selectedModule.status === 'processing' ? 'bg-yellow-400' :
                    selectedModule.status === 'classified' ? 'bg-purple-400' :
                    'bg-red-400'
                  }`} />
                  <span className="font-mono text-sm">{selectedModule.status.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
