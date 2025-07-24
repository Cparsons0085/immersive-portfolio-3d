'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from 'gsap'

// Room Components
import HeroRoom from './rooms/HeroRoom'
import SkillsRoom from './rooms/SkillsRoom'
import ProjectsRoom from './rooms/ProjectsRoom'
import AILabRoom from './rooms/AILabRoom'
import ContactRoom from './rooms/ContactRoom'
import RoomNavigation from './RoomNavigation'

interface Room {
  id: number
  name: string
  component: React.ComponentType<{ onNavigate: (roomId: number) => void; onTerminalComplete?: () => void }>
  position: [number, number, number]
  color: string
  depth: number
}

interface ImmersivePortfolioProps {
  onToggleView?: () => void
}

const rooms: Room[] = [
  { id: 0, name: 'LOBBY', component: HeroRoom, position: [0, 0, 0], color: '#00ffff', depth: 0 },
  { id: 1, name: 'SKILLS', component: SkillsRoom, position: [0, 20, -10], color: '#ff00ff', depth: -10 },
  { id: 2, name: 'PROJECTS', component: ProjectsRoom, position: [0, 40, -20], color: '#0066ff', depth: -20 },
  { id: 3, name: 'CONTACT', component: ContactRoom, position: [0, 60, -30], color: '#00ff88', depth: -30 },
  { id: 4, name: 'AI LAB', component: AILabRoom, position: [0, -20, -40], color: '#8b5cf6', depth: -40 },
]

export default function ImmersivePortfolio({ onToggleView }: ImmersivePortfolioProps) {
  const [currentRoom, setCurrentRoom] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [terminalComplete, setTerminalComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const controlsRef = useRef<OrbitControls>()
  const buildingGroupRef = useRef<THREE.Group>()
  const lastScrollTime = useRef(0)

  useEffect(() => {
    initThreeJS()
    setupScrollHandling()
    setupMouseHandling()
    return () => cleanup()
  }, [])

  const setupMouseHandling = () => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneReady) return

      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })

      // Apply subtle parallax to building group
      if (buildingGroupRef.current && cameraRef.current) {
        const targetRotationY = x * 0.05
        const targetRotationX = y * 0.02

        gsap.to(buildingGroupRef.current.rotation, {
          duration: 2,
          x: targetRotationX,
          y: targetRotationY,
          ease: "power2.out"
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }

  const setupScrollHandling = () => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()

      // Only allow scroll navigation when navigation is visible and not transitioning
      const now = Date.now()
      if (!showNavigation || isTransitioning || now - lastScrollTime.current < 300) return
      lastScrollTime.current = now

      const delta = e.deltaY
      const scrollThreshold = 50

      if (Math.abs(delta) > scrollThreshold) {
        if (delta > 0 && currentRoom < rooms.length - 1) {
          // Scroll down - go to next room
          navigateToRoom(currentRoom + 1)
        } else if (delta < 0 && currentRoom > 0) {
          // Scroll up - go to previous room
          navigateToRoom(currentRoom - 1)
        }
      }
    }

    const handleKeyboard = (e: KeyboardEvent) => {
      if (!showNavigation || isTransitioning) return

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        navigateToRoom(Math.max(0, currentRoom - 1))
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        navigateToRoom(Math.min(rooms.length - 1, currentRoom + 1))
      }
    }

    if (typeof window !== 'undefined') {
      // Use passive: false to allow preventDefault
      window.addEventListener('wheel', handleScroll, { passive: false })
      window.addEventListener('keydown', handleKeyboard)

      return () => {
        window.removeEventListener('wheel', handleScroll)
        window.removeEventListener('keydown', handleKeyboard)
      }
    }
  }

  const initThreeJS = () => {
    if (!mountRef.current) return

    // Enhanced scene setup with cyberpunk atmosphere
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a0f, 20, 200)
    scene.background = new THREE.Color(0x0a0a0f)
    sceneRef.current = scene

    // Improved camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(
      75,
      typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 1,
      0.1,
      1000
    )
    camera.position.set(0, 10, 40)
    cameraRef.current = camera

    // Enhanced renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    })
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200
    const height = typeof window !== 'undefined' ? window.innerHeight : 800
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0a0a0f, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Enhanced controls with better interaction
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enableZoom = false // Keep zoom disabled for navigation
    controls.enablePan = false
    controls.maxPolarAngle = Math.PI * 0.8
    controls.minPolarAngle = Math.PI * 0.2
    controls.autoRotate = false
    controls.enableRotate = true
    controls.rotateSpeed = 0.5
    controls.target.set(0, 20, 0) // Look at center of building
    controlsRef.current = controls

    // Create the enhanced 3D environment with proper depth
    createCyberpunkEnvironment(scene)
    createVerticalBuildingWithStairs(scene)
    addEnhancedLighting(scene)
    addAdvancedParticles(scene)

    // Enhanced animation loop with proper depth handling
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      // Update particles and effects with depth-aware movement
      scene.traverse((object) => {
        if (object.name === 'particles') {
          object.rotation.y += 0.001
          if ('position' in object && object.position) {
            object.position.x += Math.sin(Date.now() * 0.001) * 0.01
          }
        }
        if (object.name.includes('neonRing')) {
          object.rotation.z += 0.02
        }
        if (object.name.includes('stairGlow')) {
          const material = (object as THREE.Mesh).material as THREE.MeshBasicMaterial
          material.opacity = 0.3 + Math.sin(Date.now() * 0.003) * 0.2
        }
      })

      // Apply subtle camera bobbing based on mouse position
      if (cameraRef.current && mousePosition) {
        const targetX = mousePosition.x * 2
        const targetY = mousePosition.y * 1

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 10 + targetY, 0.02)
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer || typeof window === 'undefined') return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    setSceneReady(true)

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }

  const createCyberpunkEnvironment = (scene: THREE.Scene) => {
    // Enhanced grid floor with proper depth
    const gridSize = 150
    const gridDivisions = 75
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ffff, 0x00ffff)
    gridHelper.material.opacity = 0.15
    gridHelper.material.transparent = true
    gridHelper.position.y = -15
    scene.add(gridHelper)

    // Secondary grid for added depth
    const gridHelper2 = new THREE.GridHelper(gridSize, gridDivisions, 0xff00ff, 0xff00ff)
    gridHelper2.material.opacity = 0.08
    gridHelper2.material.transparent = true
    gridHelper2.position.y = -14.5
    gridHelper2.rotation.y = Math.PI / 4
    scene.add(gridHelper2)

    // Enhanced skybox with depth gradient
    const skyGeometry = new THREE.SphereGeometry(300, 32, 32)
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0a0a0f) },
        bottomColor: { value: new THREE.Color(0x1a1a2e) },
        offset: { value: 33 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    })
    const sky = new THREE.Mesh(skyGeometry, skyMaterial)
    scene.add(sky)
  }

  const createVerticalBuildingWithStairs = (scene: THREE.Scene) => {
    // Create main building group for easy manipulation
    const buildingGroup = new THREE.Group()
    buildingGroupRef.current = buildingGroup
    scene.add(buildingGroup)

    rooms.forEach((room, index) => {
      // Enhanced floor platform with depth
      const platformGeometry = new THREE.CylinderGeometry(12, 12, 2, 32)
      const platformMaterial = new THREE.MeshPhongMaterial({
        color: room.color,
        transparent: true,
        opacity: 0.4,
        emissive: room.color,
        emissiveIntensity: 0.3
      })
      const platform = new THREE.Mesh(platformGeometry, platformMaterial)
      platform.position.set(...room.position)
      platform.receiveShadow = true
      platform.castShadow = true
      buildingGroup.add(platform)

      // Enhanced glowing neon ring with animation
      const ringGeometry = new THREE.TorusGeometry(13, 0.5, 16, 100)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: room.color,
        transparent: true,
        opacity: 0.9
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(room.position[0], room.position[1] + 1.5, room.position[2])
      ring.rotation.x = Math.PI / 2
      ring.name = `neonRing_${index}`
      buildingGroup.add(ring)

      // Visible stair/level transitions between floors
      if (index < rooms.length - 1 && index !== 3) { // Skip basement connection
        const nextRoom = rooms[index + 1]
        const stairHeight = Math.abs(nextRoom.position[1] - room.position[1])
        const stairDepth = Math.abs(nextRoom.position[2] - room.position[2])

        // Create visible staircase geometry
        const stairGeometry = new THREE.BoxGeometry(4, stairHeight, stairDepth)
        const stairMaterial = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.3,
          emissive: 0x004444,
          emissiveIntensity: 0.5
        })
        const stair = new THREE.Mesh(stairGeometry, stairMaterial)
        stair.position.set(
          room.position[0] + 15,
          room.position[1] + stairHeight / 2,
          room.position[2] + (nextRoom.position[2] - room.position[2]) / 2
        )
        stair.name = `stairGlow_${index}`
        buildingGroup.add(stair)

        // Add stair steps for detail
        const stepCount = 8
        for (let s = 0; s < stepCount; s++) {
          const stepGeometry = new THREE.BoxGeometry(5, 0.5, 2)
          const stepMaterial = new THREE.MeshPhongMaterial({
            color: room.color,
            transparent: true,
            opacity: 0.6,
            emissive: room.color,
            emissiveIntensity: 0.2
          })
          const step = new THREE.Mesh(stepGeometry, stepMaterial)
          step.position.set(
            room.position[0] + 15,
            room.position[1] + (s * stairHeight / stepCount),
            room.position[2] + (s * (nextRoom.position[2] - room.position[2]) / stepCount)
          )
          buildingGroup.add(step)
        }
      }

      // Special basement elevator with enhanced visuals
      if (room.name === 'AI LAB') {
        const elevatorGeometry = new THREE.CylinderGeometry(2, 2, 40)
        const elevatorMaterial = new THREE.MeshPhongMaterial({
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.7,
          emissive: 0x2d1b69,
          emissiveIntensity: 0.6
        })
        const elevator = new THREE.Mesh(elevatorGeometry, elevatorMaterial)
        elevator.position.set(room.position[0] - 18, 0, room.position[2])
        buildingGroup.add(elevator)

        // Elevator glow effect
        const elevatorGlowGeometry = new THREE.CylinderGeometry(2.5, 2.5, 42)
        const elevatorGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.2
        })
        const elevatorGlow = new THREE.Mesh(elevatorGlowGeometry, elevatorGlowMaterial)
        elevatorGlow.position.set(room.position[0] - 18, 0, room.position[2])
        elevatorGlow.name = `stairGlow_basement`
        buildingGroup.add(elevatorGlow)
      }

      // Room identifier hologram with depth
      const textGeometry = new THREE.PlaneGeometry(10, 3)
      const textMaterial = new THREE.MeshBasicMaterial({
        color: room.color,
        transparent: true,
        opacity: 0.8
      })
      const textMesh = new THREE.Mesh(textGeometry, textMaterial)
      textMesh.position.set(room.position[0], room.position[1] + 10, room.position[2] + 5)
      textMesh.lookAt(0, room.position[1] + 10, 40)
      buildingGroup.add(textMesh)
    })
  }

  const addEnhancedLighting = (scene: THREE.Scene) => {
    // Enhanced ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    // Main directional light with better shadows
    const directionalLight = new THREE.DirectionalLight(0x9999ff, 0.6)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 4096
    directionalLight.shadow.mapSize.height = 4096
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 300
    directionalLight.shadow.camera.left = -100
    directionalLight.shadow.camera.right = 100
    directionalLight.shadow.camera.top = 100
    directionalLight.shadow.camera.bottom = -100
    scene.add(directionalLight)

    // Enhanced neon point lights for each room with depth awareness
    rooms.forEach((room) => {
      const pointLight = new THREE.PointLight(room.color, 2.5, 40)
      pointLight.position.set(room.position[0], room.position[1] + 8, room.position[2] + 10)
      pointLight.castShadow = true
      scene.add(pointLight)

      // Additional accent lights for depth
      const accentLight1 = new THREE.PointLight(room.color, 1, 25)
      accentLight1.position.set(room.position[0] + 10, room.position[1] + 5, room.position[2] + 15)
      scene.add(accentLight1)

      const accentLight2 = new THREE.PointLight(room.color, 0.8, 20)
      accentLight2.position.set(room.position[0] - 10, room.position[1] + 3, room.position[2] + 5)
      scene.add(accentLight2)
    })
  }

  const addAdvancedParticles = (scene: THREE.Scene) => {
    const particleCount = 1000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    const neonColors = [
      new THREE.Color(0x00ffff), // cyan
      new THREE.Color(0xff00ff), // magenta
      new THREE.Color(0x00ff88), // green
      new THREE.Color(0xff6b35), // orange
      new THREE.Color(0x8b5cf6), // purple
    ]

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Distribute particles in 3D space with proper depth
      positions[i3] = (Math.random() - 0.5) * 120
      positions[i3 + 1] = Math.random() * 140 - 50
      positions[i3 + 2] = (Math.random() - 0.5) * 100 - 20

      // Random velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = Math.random() * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01

      const colorIndex = Math.floor(Math.random() * neonColors.length)
      const color = neonColors[colorIndex]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    particleSystem.name = 'particles'
    scene.add(particleSystem)
  }

  const navigateToRoom = async (roomId: number) => {
    if (isTransitioning || roomId === currentRoom || roomId < 0 || roomId >= rooms.length) return

    setIsTransitioning(true)

    const targetRoom = rooms[roomId]
    const camera = cameraRef.current

    if (camera) {
      // Enhanced smooth camera transition with proper depth awareness
      await new Promise<void>((resolve) => {
        gsap.to(camera.position, {
          duration: 2.5,
          y: targetRoom.position[1] + 15,
          z: 40 + targetRoom.depth * 0.3, // Adjust z based on room depth
          ease: "power3.inOut",
          onUpdate: () => {
            // Smooth look-at transition
            camera.lookAt(targetRoom.position[0], targetRoom.position[1], targetRoom.position[2])
          },
          onComplete: () => resolve()
        })

        // Animate building group for added depth effect
        if (buildingGroupRef.current) {
          gsap.to(buildingGroupRef.current.position, {
            duration: 2.5,
            z: -targetRoom.depth * 0.1,
            ease: "power3.inOut"
          })
        }
      })
    }

    setCurrentRoom(roomId)
    setIsTransitioning(false)
  }

  const handleTerminalComplete = () => {
    setTerminalComplete(true)
    // Delay showing navigation to ensure terminal animation is fully complete
    setTimeout(() => {
      setShowNavigation(true)
    }, 1000)
  }

  const cleanup = () => {
    if (rendererRef.current && mountRef.current) {
      mountRef.current.removeChild(rendererRef.current.domElement)
      rendererRef.current.dispose()
    }
  }

  const CurrentRoomComponent = rooms[currentRoom]?.component

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Enhanced 3D Scene Background with proper depth */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Toggle View Button */}
      {onToggleView && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onToggleView}
          className="fixed top-6 left-6 z-40 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 rounded-lg font-mono text-cyan-400 hover:border-cyan-400 transition-all neon-glow-cyan"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📊 Overview Mode
        </motion.button>
      )}

      {/* Room Navigation - ONLY shows after terminal completes, positioned to not overlap */}
      <AnimatePresence>
        {showNavigation && (
          <RoomNavigation
            rooms={rooms}
            currentRoom={currentRoom}
            onNavigate={navigateToRoom}
            isTransitioning={isTransitioning}
          />
        )}
      </AnimatePresence>

      {/* Room Content Overlay - Enhanced positioning to prevent overlap */}
      <AnimatePresence mode="wait">
        {sceneReady && CurrentRoomComponent && (
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            <div className="w-full h-full flex items-center justify-center safe-area-inset">
              <div className="max-w-6xl w-full px-4 pointer-events-auto">
                <CurrentRoomComponent
                  onNavigate={navigateToRoom}
                  onTerminalComplete={currentRoom === 0 ? handleTerminalComplete : undefined}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floor Indicator with depth awareness */}
      {showNavigation && (
        <div className="fixed top-6 right-6 z-30">
          <div className="glass rounded-lg p-4 border border-cyan-400/30 neon-glow-cyan">
            <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              Current Floor
            </div>
            <div className="text-xl font-bold neon-text-cyan">
              {rooms[currentRoom]?.name}
            </div>
            <div className="text-sm text-white/60 mt-1">
              Level {currentRoom + 1} / {rooms.length}
            </div>
            <div className="text-xs text-cyan-400/70 font-mono mt-1">
              Depth: {rooms[currentRoom]?.depth}m
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Scroll Instructions - Desktop Only */}
      {showNavigation && !isTransitioning && (
        <div className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <motion.div
            animate={{
              y: [0, -5, 0],
              boxShadow: [
                '0 0 20px rgba(255, 0, 255, 0.5)',
                '0 0 40px rgba(255, 0, 255, 0.8)',
                '0 0 20px rgba(255, 0, 255, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="glass rounded-full px-6 py-3 border border-magenta-400/30 neon-glow-magenta cursor-pointer"
            onClick={() => navigateToRoom(Math.min(rooms.length - 1, currentRoom + 1))}
          >
            <div className="flex items-center space-x-3 text-magenta-400 font-mono text-sm">
              <span>Scroll or click to navigate floors</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-lg"
              >
                ⟫
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading State */}
      {!sceneReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <div className="loading-dots mb-4">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="text-cyan-400 font-mono text-lg neon-text-cyan">
              Initializing 3D Cyberpunk Environment...
            </div>
            <div className="text-cyan-400/60 font-mono text-sm mt-2">
              Building depth-aware scenes...
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Transition Loading */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
        >
          <div className="glass rounded-lg p-6 border border-cyan-400/30 neon-glow-cyan">
            <div className="flex items-center space-x-3">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="text-cyan-400 font-mono">
                Transitioning to {rooms[currentRoom]?.name}...
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Cyberpunk Scan Line Effect */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-1 pointer-events-none z-10"
        animate={{
          y: ['-100%', '100vh', '-100%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Depth Indicator Lines */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-cyan-400/50 z-10 pointer-events-none" />
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-magenta-400/50 via-magenta-400/20 to-magenta-400/50 z-10 pointer-events-none" />
    </div>
  )
}
