import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    const mouseEnter = () => setHovering(true)
    const mouseLeave = () => setHovering(false)

    window.addEventListener('mousemove', moveCursor)
    
    // Add event listeners for hover states
    const interactiveElements = document.querySelectorAll('button, a, .interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnter)
      el.addEventListener('mouseleave', mouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter)
        el.removeEventListener('mouseleave', mouseLeave)
      })
    }
  }, [])

  return (
    <div 
      id="custom-cursor" 
      className={`${hovering ? 'hovering' : ''}`}
    />
  )
}
