import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, PerspectiveCamera, useScroll, Stars, Sparkles, Environment, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

export default function Experience() {
  const { width, height } = useThree((state) => state.viewport)
  const scroll = useScroll()
  const cameraRef = useRef()
  const groupRef = useRef()

  useFrame((state) => {
    const scrollOffset = scroll.offset
    // Camera movement based on scroll
    // 0 -> 1 scroll range
    // Section 1: Intro (0-0.25)
    // Section 2: Skills (0.25-0.5)
    // Section 3: Project (0.5-0.75)
    // Section 4: Contact (0.75-1)
    
    const targetX = Math.sin(scrollOffset * Math.PI * 4) * 3
    const targetZ = 5 - (scrollOffset * 10)
    const targetY = 2 + Math.cos(scrollOffset * Math.PI * 2) * 1.5

    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)
    state.camera.lookAt(0, 0, -scrollOffset * 5)

    // Parallax on mouse
    const mouseX = state.mouse.x * 0.5
    const mouseY = state.mouse.y * 0.5
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.1)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.1, 0.1)
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <spotLight position={[-5, 5, 5]} angle={0.25} penumbra={1} intensity={2} color="#a855f7" castShadow />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={[20, 20, 10]} size={2} speed={0.5} opacity={0.3} color="#00d4ff" />
      <fog attach="fog" args={['#0a0a0a', 5, 15]} />

      {/* Floating 3D Elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Desk />
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={2} position={[3, 2, -2]}>
        <SkillSphere color="#00d4ff" name="React" />
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5} position={[-4, 1, -1]}>
        <SkillSphere color="#a855f7" name="Node" />
      </Float>

      <Float speed={4} rotationIntensity={1.5} floatIntensity={2.5} position={[2, 0, -6]}>
        <SkillSphere color="#00d4ff" name="Next.js" />
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-3, 3, -10]}>
        <SkillSphere color="#a855f7" name="PostgreSQL" />
      </Float>

      <Float speed={3.5} rotationIntensity={2} floatIntensity={1} position={[4, -1, -14]}>
        <SkillSphere color="#00d4ff" name="Docker" />
      </Float>

      <Environment preset="city" />
    </group>
  )
}

function Desk() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Table Top */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Laptop Base */}
      <mesh position={[0, 0.1, 0.2]}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Laptop Screen */}
      <group position={[0, 0.12, -0.15]} rotation={[-0.2, 0, 0]}>
         <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial color="#222" />
         </mesh>
         {/* Live Screen Content - Emit glow */}
         <mesh position={[0, 0.4, 0.03]}>
            <planeGeometry args={[1.1, 0.7]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.05}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              INDIA FITNESS LIVE
            </Text>
            <pointLight position={[0, 0, 0.1]} intensity={0.5} color="#00d4ff" distance={1} />
         </mesh>
      </group>

      {/* Floating Vertical Monitor */}
      <group position={[-1.5, 0.8, -0.5]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 1.2, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.5, 1.1]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  )
}

function SkillSphere({ color, name }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          distort={0.4}
          speed={2}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.15}
        color="white"
      >
        {name}
      </Text>
    </group>
  )
}
