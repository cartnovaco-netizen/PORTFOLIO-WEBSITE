import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Initially hide on touch devices until first touch
    if (isTouchDevice) {
      gsap.set(cursor, { opacity: 0, scale: 0 })
      setIsVisible(false)
    }

    const moveCursor = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      
      gsap.to(cursor, {
        x: clientX - 10,
        y: clientY - 10,
        duration: isTouchDevice ? 0 : 0.1, // Instant for touch, smooth for mouse
        opacity: 1,
        scale: hovering ? 2.5 : 1,
        ease: 'power2.out'
      })
    }

    const showCursor = () => {
      setIsVisible(true)
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 })
    }

    const hideCursor = () => {
      if (isTouchDevice) {
        setIsVisible(false)
        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 })
      }
    }

    const mouseEnter = () => setHovering(true)
    const mouseLeave = () => setHovering(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('touchstart', showCursor)
    window.addEventListener('touchmove', moveCursor)
    window.addEventListener('touchend', hideCursor)
    
    // Add event listeners for hover states
    const interactiveElements = document.querySelectorAll('button, a, .interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnter)
      el.addEventListener('mouseleave', mouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('touchstart', showCursor)
      window.removeEventListener('touchmove', moveCursor)
      window.removeEventListener('touchend', hideCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter)
        el.removeEventListener('mouseleave', mouseLeave)
      })
    }
  }, [hovering])

  return (
    <div 
      id="custom-cursor" 
      className={`${hovering ? 'hovering' : ''} pointer-events-none`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  )
}
