import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, useScroll, Stars, Sparkles, Environment, Text, MeshDistortMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import profileImg from '../assets/profile.jpg'
import fitnessPreview from '../assets/india_fitness.png'
import cartnovaLogo from '../assets/cartnova_logo.png'

export default function Experience() {
  const { width, height } = useThree((state) => state.viewport)
  const scroll = useScroll()
  const groupRef = useRef()
  const starsRef = useRef()
  
  const isMobile = width < height
  const responsiveScale = isMobile ? Math.min(width * 0.12, 1) : 1

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset
    const scrollVelocity = Math.abs(scroll.delta)
    
    // WARP SPEED EFFECT (Option #2) - Stabilized
    if (starsRef.current) {
      starsRef.current.rotation.z += delta * (0.02 + scrollVelocity * 0.5)
      // Stretch stars on Z axis for light-speed feel, but keep it within WebGL limits
      starsRef.current.scale.z = 1 + scrollVelocity * 20
      starsRef.current.scale.x = 1 + scrollVelocity * 2
      starsRef.current.scale.y = 1 + scrollVelocity * 2
    }

    // Camera movement based on scroll - DIVE DEEPER
    const zBase = isMobile ? 8 : 5
    const targetX = Math.sin(scrollOffset * Math.PI * 2) * (isMobile ? 1.5 : 3)
    const targetZ = zBase - (scrollOffset * 25) // Increased from 10 to 25 to pass all spheres
    const targetY = (isMobile ? 1.5 : 2) + Math.cos(scrollOffset * Math.PI) * 1.5

    const targetPos = new THREE.Vector3(targetX, targetY, targetZ)
    state.camera.position.lerp(targetPos, 0.05)
    
    // Look ahead slightly based on scroll
    const lookAtZ = -scrollOffset * 20
    state.camera.lookAt(0, 0, lookAtZ)

    // Parallax on mouse
    const mouseX = state.mouse.x * 0.5
    const mouseY = state.mouse.y * 0.5
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.2, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.1, 0.1)
    }
  })

  return (
    <group ref={groupRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <spotLight position={[-5, 5, 5]} angle={0.25} penumbra={1} intensity={2} color="#a855f7" castShadow />
      
      <group ref={starsRef}>
         <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={1} />
      </group>
      <Sparkles count={200} scale={[20, 20, 10]} size={2} speed={0.5} opacity={0.3} color="#00d4ff" />
      <fog attach="fog" args={['#0a0a0a', 5, 15]} />

      {/* Floating 3D Elements - Restored without textures for now */}
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
  const profileTexture = useTexture(profileImg)
  const cartnovaTexture = useTexture(cartnovaLogo)

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
         <mesh position={[0, 0.4, 0.03]}>
            <planeGeometry args={[0.7, 0.7]} />
            <meshStandardMaterial map={cartnovaTexture} emissive="#ffffff" emissiveIntensity={1} transparent />
            <pointLight position={[0, 0, 0.1]} intensity={0.5} color="#ffd400" distance={1} />
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
          <meshStandardMaterial map={profileTexture} emissive="#ffffff" emissiveIntensity={0.2} />
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
