'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiDownload,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiClock
} from 'react-icons/fi'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface TerminalLine {
  id: number
  text: string
  type: 'command' | 'output' | 'error' | 'success'
  delay: number
}

interface ContactRoomProps {
  onNavigate?: (roomIndex: number) => void
}

const cloverTips = [
  "Start by telling me your name! 🍀",
  "Don't forget your email so I can reach back! 📧",
  "What's on your mind? I'd love to hear from you! 💭",
  "A bit more detail would be great! ✨",
  "Looking good! Ready to send? 🚀",
  "Remember to double-check your email! 📝",
  "I bring good luck to all messages! 🍀",
  "Your message is almost perfect! ✨",
  "Time to hit that send button! 🎯"
]

export default function ContactRoom({ onNavigate }: ContactRoomProps = {}) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [showForm, setShowForm] = useState(false)
  const [currentField, setCurrentField] = useState<string | null>(null)
  const [cloverTip, setCloverTip] = useState(cloverTips[0])
  const [showClover, setShowClover] = useState(false)

  const initialTerminalSequence = [
    { id: 1, text: '$ initialize_contact_protocol', type: 'command' as const, delay: 0 },
    { id: 2, text: 'Loading communication systems...', type: 'output' as const, delay: 1000 },
    { id: 3, text: 'Encrypting transmission channel...', type: 'output' as const, delay: 2000 },
    { id: 4, text: 'Contact interface ready ✓', type: 'success' as const, delay: 3000 },
    { id: 5, text: '$ whoami', type: 'command' as const, delay: 4000 },
    { id: 6, text: 'Cristy Parsons | Software Engineer', type: 'output' as const, delay: 4500 },
    { id: 7, text: 'Location: San Francisco, CA', type: 'output' as const, delay: 5000 },
    { id: 8, text: 'Status: Available for opportunities', type: 'success' as const, delay: 5500 },
    { id: 9, text: '$ check_availability', type: 'command' as const, delay: 6500 },
    { id: 10, text: 'Currently accepting new projects ✓', type: 'success' as const, delay: 7000 },
    { id: 11, text: '$ open_communication_channel', type: 'command' as const, delay: 8000 },
    { id: 12, text: 'Ready to receive messages...', type: 'output' as const, delay: 8500 },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalLines(initialTerminalSequence)
      setTimeout(() => {
        setShowForm(true)
        setShowClover(true)
      }, 9000)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setCurrentField(field)

    // Update clover tip based on form state
    updateCloverTip({ ...formData, [field]: value })

    // Add terminal feedback
    const newLine: TerminalLine = {
      id: Date.now(),
      text: `> ${field}: ${value.slice(0, 30)}${value.length > 30 ? '...' : ''}`,
      type: 'output',
      delay: 0
    }

    setTerminalLines(prev => [...prev.slice(-8), newLine])
  }

  const updateCloverTip = (data: FormData) => {
    if (!data.name) setCloverTip(cloverTips[0])
    else if (!data.email) setCloverTip(cloverTips[1])
    else if (!data.message) setCloverTip(cloverTips[2])
    else if (data.message.length < 10) setCloverTip(cloverTips[3])
    else if (!data.subject) setCloverTip("A subject line would be helpful! 📋")
    else setCloverTip(cloverTips[4])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Add terminal output for submission
    const submissionLines: TerminalLine[] = [
      { id: Date.now(), text: '$ send_message --secure --priority=high', type: 'command', delay: 0 },
      { id: Date.now() + 1, text: 'Validating input data...', type: 'output', delay: 500 },
      { id: Date.now() + 2, text: 'Encrypting message with 256-bit AES...', type: 'output', delay: 1500 },
      { id: Date.now() + 3, text: 'Establishing secure connection...', type: 'output', delay: 2500 },
      { id: Date.now() + 4, text: 'Message transmitted successfully ✓', type: 'success', delay: 3500 },
      { id: Date.now() + 5, text: 'Lucky delivery guaranteed! 🍀', type: 'success', delay: 4000 },
    ]

    for (const line of submissionLines) {
      setTimeout(() => {
        setTerminalLines(prev => [...prev.slice(-8), line])
      }, line.delay)
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 4500)
  }

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-cyan-400'
      case 'output': return 'text-white/80'
      case 'error': return 'text-red-400'
      case 'success': return 'text-green-400'
      default: return 'text-white/80'
    }
  }

  const contactMethods = [
    { icon: FiMail, label: 'Email', value: 'cristy@example.com', link: 'mailto:cristy@example.com', color: 'cyan' },
    { icon: FiLinkedin, label: 'LinkedIn', value: '/in/cristy-parsons', link: 'https://linkedin.com/in/cristy-parsons', color: 'blue' },
    { icon: FiGithub, label: 'GitHub', value: '@cristy', link: 'https://github.com/cristy', color: 'purple' },
    { icon: FiTwitter, label: 'Twitter', value: '@cristy_codes', link: 'https://twitter.com/cristy_codes', color: 'cyan' },
    { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567', color: 'green' },
    { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA', link: '', color: 'orange' },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Success Animation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{
                x: Math.random() * 1200,
                y: 800,
                opacity: 0,
                rotate: 0
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            >
              🍀
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-8 relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <div className="text-8xl mb-6">🚀</div>
            <h1 className="text-5xl font-bold neon-text-green mb-4">
              MESSAGE TRANSMITTED
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-md mx-auto">
              Your message has been successfully sent through the neon network.
              I'll get back to you soon!
            </p>

            <motion.div
              className="glass border border-green-400/50 rounded-lg p-6 mb-8 neon-glow-green"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 136, 0.5)',
                  '0 0 40px rgba(0, 255, 136, 0.8)',
                  '0 0 20px rgba(0, 255, 136, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-green-400 font-mono text-lg">
                "Don't Pluck Your Luck - Your message is in good hands! 🍀"
              </div>
            </motion.div>
          </motion.div>

          <motion.button
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', subject: '', message: '' })
              setTerminalLines(initialTerminalSequence)
              setShowClover(true)
            }}
            className="px-8 py-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-400 rounded-full font-mono font-bold text-green-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 neon-glow-green"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Another Message
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative min-h-screen py-8">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-magenta-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 0.8,
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
        <h1 className="text-5xl font-bold neon-text-cyan">
          COMMUNICATION HUB
        </h1>
        <p className="text-xl text-white/70">
          Secure Connection Established • Encryption: Active
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-magenta-400 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Terminal Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Terminal Window */}
          <div className="glass border-neon-gradient rounded-xl overflow-hidden neon-glow-cyan shadow-2xl">
            <div className="bg-black/40 px-6 py-4 border-b border-cyan-400/30 flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
              </div>
              <span className="text-cyan-400 font-mono text-sm font-bold">contact-terminal-v2.1</span>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2 text-xs font-mono text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>SECURE</span>
              </div>
            </div>

            <div className="bg-black/60 p-6 h-80 overflow-y-auto font-mono text-sm">
              <AnimatePresence>
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: line.delay / 1000 }}
                    className={`${getLineColor(line.type)} mb-1 leading-relaxed`}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Cursor */}
              <motion.span
                className="terminal-cursor inline-block w-2 h-4 bg-cyan-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                █
              </motion.span>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass border border-cyan-500/30 rounded-xl p-6 neon-glow-cyan"
          >
            <h3 className="text-xl font-bold neon-text-cyan mb-6">Direct Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon

                return (
                  <motion.a
                    key={method.label}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`flex items-center space-x-3 p-4 bg-black/30 rounded-lg hover:bg-${method.color}-400/10 transition-all duration-300 group border border-transparent hover:border-${method.color}-400/30`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <Icon size={22} className={`text-${method.color}-400 group-hover:text-${method.color}-300`} />
                    <div>
                      <div className="text-white/80 font-medium">{method.label}</div>
                      <div className={`text-${method.color}-400 text-sm font-mono`}>{method.value}</div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass border border-green-400/30 rounded-xl p-4 neon-glow-green"
          >
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
                <div className="text-green-400 font-mono text-xs">Response Time: 24h</div>
                <div className="text-green-400/70 font-mono text-xs">Timezone: PST (UTC-8)</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form with Clover Mascot */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6 relative"
            >
              {/* Floating Clover Mascot */}
              {showClover && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="absolute -top-16 right-0 z-20"
                >
                  <div className="relative">
                    <motion.div
                      className="glass border border-green-400/50 rounded-2xl p-4 bg-green-900/20 neon-glow-green max-w-xs"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <motion.div
                          className="text-3xl"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          🍀
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-green-400 font-bold text-sm mb-1">Lucky the Clover</div>
                          <div className="text-green-300 text-xs font-mono leading-relaxed">
                            {cloverTip}
                          </div>
                        </div>
                      </div>

                      {/* Speech bubble pointer */}
                      <div className="absolute bottom-0 left-6 transform translate-y-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-green-400/50"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Contact Form */}
              <div className="glass border-neon-gradient rounded-xl p-8 neon-glow-magenta shadow-2xl">
                <h3 className="text-2xl font-bold neon-text-magenta mb-6">Send Secure Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                      Name_Input
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} />
                      <motion.input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300 font-mono"
                        placeholder="Enter your name"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                      Email_Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} />
                      <motion.input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300 font-mono"
                        placeholder="your.email@domain.com"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                      Subject_Line
                    </label>
                    <motion.input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300 font-mono"
                      placeholder="Message subject"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                      Message_Content
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-4 top-6 text-cyan-400" size={18} />
                      <motion.textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-lg text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300 font-mono resize-none"
                        placeholder="Type your message here..."
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-2 border-cyan-400 rounded-lg font-mono font-bold text-cyan-400 hover:border-magenta-400 hover:text-magenta-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-glow-cyan hover:neon-glow-magenta shadow-xl"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <FiSend size={20} />
                        <span>SEND_MESSAGE</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Download Resume */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <motion.button
                  className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg font-mono text-purple-400 hover:border-purple-400 hover:text-purple-300 transition-all duration-300 neon-glow-purple"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload size={18} />
                  <span>DOWNLOAD_RESUME</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
