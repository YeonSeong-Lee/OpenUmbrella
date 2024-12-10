'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * 빗방울 생성 함수
 * @param count 빗방울 개수
 * @returns 빗방울 배열
 */
const createRaindrops = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.4,
    height: 15 + Math.random() * 10,
    width: 1 + Math.random() * 1
  }))
}

// TODO: 빗방울이 튕기는 효과 추가, 메인화면 글자를 우산 모양으로 변경

const RainEffect = () => {
  const [raindrops, setRaindrops] = useState(() => createRaindrops(100))

  useEffect(() => {
    const interval = setInterval(() => {
      setRaindrops(createRaindrops(100))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rain Pattern Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("/rain-pattern.png")',
          backgroundSize: '30%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />
      
      {/* Animated Raindrops */}
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute bg-gradient-to-b from-white/70 to-blue-200/50"
          style={{
            left: `${drop.left}%`,
            top: '-10px',
            height: `${drop.height}px`,
            width: `${drop.width}px`,
            filter: 'blur(0.3px)',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
          }}
          initial={{ y: '-10%', opacity: 0 }}
          animate={{ 
            y: '100vh',
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  )
} 

export { RainEffect }
