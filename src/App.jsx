import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import UI from './components/UI'
import CustomCursor from './components/CustomCursor'
import profileImg from './assets/profile.jpg'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 1500)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden bg-void-black cursor-none">
      <CustomCursor />
      <LoadingDots visible={!isLoaded} />
      
      {/* PERSISTENT FLOATING AVATAR - BOTTOM RIGHT */}
      <div className="fixed bottom-8 right-8 z-[200] pointer-events-auto">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
          <img 
            src={profileImg} 
            alt="Pratyush" 
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-brand-blue/50 object-cover shadow-2xl transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-void-black animate-pulse"></div>
        </div>
      </div>

      <div className={`h-screen w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 45 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0a0a0a')
          }}
        >
          <Suspense fallback={<group><mesh><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#00d4ff" /></mesh></group>}>
            <ScrollControls pages={7} damping={0.2}>
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-void-black z-[100] orbitron">
      <div className="text-brand-blue text-4xl mb-8 glow-text animate-pulse">PRATYUSH</div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-brand-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-brand-purple rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-brand-blue rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}

export default App
