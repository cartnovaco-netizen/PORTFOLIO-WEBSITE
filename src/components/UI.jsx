import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpg'
import fitnessLogo from '../assets/india_fitness.png'

export default function UI() {
  const [status, setStatus] = useState("")
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null)
  const clickSoundRef = useRef(null)
  const warpSoundRef = useRef(null)

  useEffect(() => {
    // Ambient Background Loop
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/01/21/audio_3108df04db.mp3") // Cyber ambient
    audioRef.current.loop = true
    audioRef.current.volume = 0.2

    // UI Click Sound
    clickSoundRef.current = new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3") // UI Click
    clickSoundRef.current.volume = 0.4

    // Warp Sound
    warpSoundRef.current = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_c3c3a0b4e0.mp3") // Space Whoosh
    warpSoundRef.current.volume = 0.3

    return () => {
      audioRef.current.pause()
    }
  }, [])

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        console.log("User interaction required for audio")
        setIsMuted(true)
      })
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isMuted])

  const playClick = () => {
    if (audioRef.current && clickSoundRef.current && !isMuted) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(() => {})
    }
  }

  const handleSubmit = async (e) => {
    playClick()
    e.preventDefault()
    setStatus("TRANSMITTING...")
    const formData = new FormData(e.target)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      
      const data = await response.json()
      if (data.success) {
        setStatus("TRANSMISSION SUCCESSFUL ✓")
        e.target.reset()
      } else {
        setStatus("FAILURE DETECTED. RETRY.")
      }
    } catch (error) {
      setStatus("ERROR IN CHANNEL. RETRY.")
    }
  }

  const sections = [
    {
      id: 'hero',
      content: (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-10 text-center select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl orbitron font-bold glow-text mb-4 border-b-4 border-brand-blue pb-2"
          >
            PRATYUSH KUMAR
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm sm:text-lg md:text-2xl font-light tracking-[0.2em] mb-10 text-brand-blue"
          >
            FULL STACK DEVELOPER
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="flex flex-col items-center gap-4 mt-8"
          >
            <div className="text-xs sm:text-sm border border-brand-blue/30 px-6 py-2 rounded-full flex items-center gap-2 group hover:bg-brand-blue/10 transition-colors pointer-events-auto cursor-help">
               <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
               SCROLL FAST FOR WARP SPEED
            </div>
            <div className="text-[10px] sm:text-xs text-brand-purple orbitron animate-pulse">
               TAP THE PURPLE HUB TOP-RIGHT FOR SYSTEM SOUNDS
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'about',
      content: (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-screen px-6 md:px-32 py-20 select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img src={profileImg} alt="Pratyush Kumar" className="relative w-48 sm:w-64 md:w-80 rounded-2xl border-2 border-brand-purple/50 object-cover shadow-2xl shadow-brand-purple/20" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl glass p-6 md:p-8 rounded-2xl border-l-4 border-brand-purple"
          >
            <h2 className="text-2xl sm:text-3xl orbitron font-bold text-brand-purple mb-4 md:mb-6 uppercase tracking-wider">The Vision</h2>
            <p className="text-md sm:text-lg leading-relaxed text-gray-300 font-light">
              I’m <span className="text-white font-bold">Pratyush Kumar</span>, a full stack developer focused on building fast, scalable, and visually engaging web experiences. I combine logic with design to create products that actually stand out.
            </p>
             <div className="mt-6 md:mt-8 flex gap-4 pointer-events-auto">
               <a 
                 href="https://www.instagram.com/knownaspratyush_/" 
                 target="_blank" 
                 onClick={playClick}
                 className="bg-brand-purple/20 hover:bg-brand-purple/40 text-brand-purple border border-brand-purple/30 px-6 py-3 rounded-lg transition-all interactive text-sm sm:text-base cursor-pointer"
               >
                 Follow Journal
               </a>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'projects',
      content: (
        <div className="flex items-center justify-center md:justify-end min-h-screen px-6 md:px-32 py-20 select-none">
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl glass p-6 md:p-8 rounded-2xl border-r-4 border-brand-blue text-center md:text-right relative overflow-hidden"
          >
            {/* Blended Logo */}
            <img 
              src={fitnessLogo} 
              alt="India Fitness" 
              className="absolute -top-10 -right-10 w-40 h-40 opacity-10 pointer-events-none grayscale hover:grayscale-0 transition-all duration-500" 
            />

            <h2 className="text-2xl sm:text-3xl orbitron font-bold text-brand-blue mb-4 md:mb-6 uppercase tracking-wider">Elite Project</h2>
            <div className="flex items-center justify-center md:justify-end gap-4 mb-2">
              <img src={fitnessLogo} alt="Logo" className="w-8 h-8 rounded-full border border-brand-blue/30" />
              <h3 className="text-3xl sm:text-4xl font-bold">INDIA FITNESS</h3>
            </div>
            <p className="text-sm sm:text-md font-light text-gray-400 mb-6 italic">Where Strength Meets Aesthetics</p>
            <p className="text-md sm:text-lg leading-relaxed text-gray-300 mb-8 font-light">
              A modern fitness platform with clean UI and structured plans. Built with high-performance frameworks to ensure 60FPS user engagement and fluid animations.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 mb-8 pointer-events-none">
              {['React', 'GSAP', 'Next.js', 'PostgreSQL'].map(tech => (
                <span key={tech} className="bg-brand-blue/10 text-brand-blue text-[10px] sm:text-xs px-3 py-1 rounded-full border border-brand-blue/20">{tech}</span>
              ))}
            </div>
            <div className="pointer-events-auto">
               <a 
                 href="https://india-fitness.vercel.app/" 
                 target="_blank" 
                 onClick={playClick}
                 className="inline-block bg-brand-blue/80 hover:bg-brand-blue text-black font-bold orbitron px-6 py-3 sm:px-8 sm:py-4 rounded transition-all transform hover:scale-105 interactive shadow-[0_0_20px_rgba(0,212,255,0.4)] text-sm sm:text-base cursor-pointer"
               >
                 LIVE BROADCAST
               </a>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'skills_detail',
      content: (
        <div className="flex items-center justify-center min-h-screen px-6 md:px-10 py-20 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl glass p-6 md:p-10 rounded-3xl border border-brand-blue/10"
          >
            <h2 className="text-2xl sm:text-3xl orbitron font-bold text-brand-blue mb-8 md:mb-10 text-center uppercase tracking-widest">Core Arsenal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Frontend', items: ['React', 'Next.js', 'Three.js', 'Tailwind'] },
                { name: 'Backend', items: ['Node.js', 'Express', 'Python', 'Go'] },
                { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'] },
                { name: 'Tools', items: ['Docker', 'AWS', 'GIT', 'Figma'] }
              ].map(cat => (
                <div key={cat.name} className="border-l border-brand-blue/30 pl-4 py-2 hover:bg-brand-blue/5 transition-colors group">
                  <h3 className="text-brand-blue font-bold mb-2 md:mb-3 group-hover:glow-text text-sm sm:text-base">{cat.name}</h3>
                  <ul className="text-[10px] sm:text-xs text-gray-400 space-y-1">
                    {cat.items.map(item => <li key={item} className="hover:text-white transition-colors">• {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'journey',
      content: (
        <div className="flex items-center justify-start min-h-screen px-6 md:px-32 py-20 select-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl orbitron font-bold text-brand-purple mb-8 md:mb-12 uppercase tracking-tighter">Galactic Journey</h2>
            <div className="space-y-10 md:space-y-12">
              {[
                { year: '2024 - PRESENT', role: 'Full Stack Excellence', company: 'Freelance / Elite Projects', desc: 'Crafting high-end immersive web experiences like India Fitness and 3D interfaces.' },
                { year: '2022 - 2023', role: 'Frontend Architect', company: 'Tech Innovators', desc: 'Spearheaded modern UI overhauls and optimized performance for enterprise dashboards.' }
              ].map(job => (
                <div key={job.year} className="relative pl-6 md:pl-8 border-l-2 border-brand-purple/20 hover:border-brand-purple/60 transition-all group">
                  <div className="absolute top-0 left-[-7px] w-3 h-3 bg-brand-purple rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_#a855f7]"></div>
                  <span className="text-[10px] orbitron text-brand-purple/60">{job.year}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-brand-purple transition-colors">{job.role}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{job.company}</p>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'blueprint',
      content: (
        <div className="flex items-center justify-center md:justify-end min-h-screen px-6 md:px-32 py-20 select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl glass p-8 md:p-10 rounded-3xl border-r-4 md:border-r-8 border-brand-blue text-center md:text-right"
          >
            <h2 className="text-2xl sm:text-3xl orbitron font-bold text-brand-blue mb-6 md:mb-8 text-center md:text-right">THE BLUEPRINT</h2>
            <div className="space-y-5 md:space-y-6 text-center md:text-right">
              {[
                { title: 'Performance First', desc: 'Every line of code is written with speed in mind. I aim for 60FPS animations and lightning-fast load times.' },
                { title: 'Visual Poetry', desc: 'Interfaces should tell a story. I combine vibrant aesthetics with clean, functional design.' },
                { title: 'Scalable Logic', desc: 'Building for the future. I design robust architectures that can grow with the product.' }
              ].map(doc => (
                <div key={doc.title} className="hover:translate-x-[-10px] transition-transform group">
                   <h3 className="text-brand-blue font-bold text-md sm:text-lg mb-1">{doc.title}</h3>
                   <p className="text-gray-400 text-xs sm:text-sm">{doc.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: 'contact',
      content: (
         <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-10 py-20 text-center select-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="glass p-8 md:p-12 rounded-3xl border border-brand-blue/20 w-full max-w-lg"
          >
            <h2 className="text-2xl sm:text-4xl orbitron font-bold mb-8 md:mb-10 glow-text text-brand-blue">INITIATE CONNECTION</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 pointer-events-auto">
               <input type="hidden" name="access_key" value="c1cefa47-9b89-476b-8bd1-ada665d42bea" />
               <input type="email" name="email" placeholder="TRANSMISSION CHANNEL (EMAIL)" className="bg-black/50 border border-brand-blue/30 px-6 py-4 rounded-xl outline-none focus:border-brand-blue text-brand-blue text-center interactive text-sm md:text-base" required />
               <textarea name="message" rows="3" placeholder="YOUR MESSAGE TO PRATYUSH" className="bg-black/50 border border-brand-blue/30 px-6 py-4 rounded-xl outline-none focus:border-brand-blue text-brand-blue text-center resize-none interactive text-sm md:text-base" required />
               <button type="submit" onClick={playClick} className="bg-brand-blue text-black font-bold orbitron py-4 rounded-xl hover:bg-brand-purple hover:text-white transition-all transform hover:scale-105 interactive text-sm md:text-base cursor-pointer">
                 {status || "SEND PACKET"}
               </button>
               {status && <p className="text-[10px] orbitron text-brand-blue animate-pulse mt-2">{status}</p>}
            </form>
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 pointer-events-auto text-[10px] sm:text-xs">
               <a href="https://www.instagram.com/knownaspratyush_/" target="_blank" onClick={playClick} className="text-brand-blue hover:text-brand-purple transition-all interactive cursor-pointer">INSTAGRAM</a>
               <a href="https://github.com/cartnovaco-netizen" target="_blank" onClick={playClick} className="text-brand-blue hover:text-brand-purple transition-all interactive cursor-pointer">GITHUB</a>
               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cartnova.co@gmail.com" target="_blank" onClick={playClick} className="text-brand-blue hover:text-brand-purple transition-all interactive cursor-pointer">EMAIL</a>
            </div>
          </motion.div>
          <p className="mt-8 md:mt-12 text-brand-blue font-bold orbitron text-[10px] md:text-[12px] tracking-[0.3em] md:tracking-[0.5em] glow-text">MADE UNDER CARTNOVA BY PRATYUSH</p>
        </div>
      )
    }
  ]

  return (
    <div className="w-screen overflow-hidden">
      {/* Audio Control (Option #3) - Highly Visible Neon Ripple */}
      <div className="fixed top-8 right-8 z-[100] pointer-events-auto">
        <button 
          onClick={() => {
            setIsMuted(!isMuted)
            if (isMuted) playClick()
          }}
          className={`glass p-4 rounded-full border-2 ${isMuted ? 'border-brand-blue/30' : 'border-brand-purple animate-pulse shadow-[0_0_20px_#a855f7]'} text-brand-blue hover:bg-brand-blue/20 transition-all flex items-center gap-2 group interactive`}
        >
          {isMuted ? (
            <span className="orbitron text-[10px] tracking-widest hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity">ENGAGE SYSTEM SOUNDS</span>
          ) : (
            <span className="orbitron text-[10px] tracking-widest hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity">SYSTEM ONLINE</span>
          )}
          <span className="text-lg animate-bounce">{isMuted ? "🔈" : "🔊"}</span>
        </button>
      </div>

      {sections.map(section => (
        <section key={section.id} id={section.id}>
          {section.content}
        </section>
      ))}
    </div>
  )
}
