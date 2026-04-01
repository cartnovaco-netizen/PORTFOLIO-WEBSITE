import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import CustomCursor from './components/CustomCursor'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden bg-void-black cursor-none">
      <CustomCursor />
      <LoadingDots visible={!isLoaded} />
      
      <div className={`h-screen w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas camera={{ position: [0, 0, 5] }}>
           <ambientLight intensity={0.5} />
           <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
           </mesh>
        </Canvas>
      </div>
    </div>
  )
}

function LoadingDots({ visible }) {
  if (!visible) return null
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-void-black z-[100] orbitron">
      <div className="text-brand-blue text-4xl mb-8 glow-text animate-pulse uppercase">RECONNECTING...</div>
    </div>
  )
}

export default App
