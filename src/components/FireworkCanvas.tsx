'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface Firework {
  x: number
  y: number
  targetY: number
  vy: number
  color: string
  exploded: boolean
  particles: Particle[]
}

const COLORS = [
  '#F5A623', '#FFD166', '#C0392B', '#E74C3C',
  '#27AE60', '#2ECC71', '#8E44AD', '#3498DB',
  '#E67E22', '#F1C40F', '#EC407A', '#00BCD4',
]

export default function FireworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const fireworks: Firework[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function createFirework() {
      if (!canvas) return
      const x = Math.random() * canvas.width
      const targetY = Math.random() * canvas.height * 0.6
      fireworks.push({
        x,
        y: canvas.height,
        targetY,
        vy: -8 - Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
        particles: [],
      })
    }

    function explode(fw: Firework) {
      const count = 60 + Math.floor(Math.random() * 40)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const speed = 1.5 + Math.random() * 4
        fw.particles.push({
          x: fw.x,
          y: fw.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.4,
          color: fw.color,
          size: 2 + Math.random() * 2,
        })
      }
    }

    let lastFirework = 0

    function loop(time: number) {
      if (!canvas || !ctx) return
      ctx.fillStyle = 'rgba(11, 13, 26, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Launch new fireworks periodically
      if (time - lastFirework > 600 + Math.random() * 800) {
        createFirework()
        lastFirework = time
      }

      for (let fi = fireworks.length - 1; fi >= 0; fi--) {
        const fw = fireworks[fi]

        if (!fw.exploded) {
          fw.y += fw.vy
          fw.vy += 0.15 // gravity

          // Draw rocket trail
          ctx.save()
          ctx.globalAlpha = 0.8
          ctx.fillStyle = fw.color
          ctx.beginPath()
          ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          if (fw.y <= fw.targetY) {
            fw.exploded = true
            explode(fw)
          }
        } else {
          // Update particles
          for (let pi = fw.particles.length - 1; pi >= 0; pi--) {
            const p = fw.particles[pi]
            p.life -= 0.018
            if (p.life <= 0) {
              fw.particles.splice(pi, 1)
              continue
            }
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.08 // gravity
            p.vx *= 0.98 // drag

            ctx.save()
            ctx.globalAlpha = p.life / p.maxLife
            ctx.fillStyle = p.color
            ctx.shadowColor = p.color
            ctx.shadowBlur = 4
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }

          if (fw.particles.length === 0) {
            fireworks.splice(fi, 1)
          }
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
