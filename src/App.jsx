import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import UI from './components/UI'
import CustomCursor from './components/CustomCursor'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 2500)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden bg-void-black cursor-none">
      <CustomCursor />
      <LoadingDots visible={!isLoaded} />
      
      <div className={`h-screen w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 45 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0a')
          }}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={7} damping={0.1} distance={1}>
              <Experience />
              <Scroll html>
                <UI />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

function LoadingDots({ visible }) {
  if (!visible) return null
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-void-black z-[100] orbitron overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="text-brand-blue text-[10px] md:text-xs tracking-[0.6em] mb-4 opacity-50 uppercase animate-pulse">
          Establishing Connection...
        </div>
        <div className="relative">
          <div className="text-white text-xl md:text-4xl font-bold tracking-[0.3em] md:tracking-[0.5em] glow-text text-center px-4">
            ENTERING PRATYUSH WORLD
          </div>
          {/* Animated Scanning Line */}
          <div className="absolute inset-0 border-y border-brand-blue/30 scale-y-125 pointer-events-none">
            <div className="w-full h-[2px] bg-brand-blue shadow-[0_0_15px_#00d4ff] absolute top-0 animate-scan"></div>
          </div>
        </div>
        <div className="flex space-x-3 mt-12">
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}

export default App
