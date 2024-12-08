'use client'

import { useState, useRef, useEffect } from 'react'
import ContributorCard from '@/components/contributor/ContributorCard'

const contributors = {
  donators: [
    { name: 'jmaing', detail: '24.10.24 기부' },
    { name: 'juha', detail: '24.10.24 기부' },
    { name: 'jihokim2', detail: '24.10.24 기부' },
    { name: 'seongyle', detail: '24.10.24 기부' },
    { name: 'sokwon', detail: '24.10.24 기부' },
    { name: 'hhwang', detail: '24.10.24 기부' },
    { name: 'yukim', detail: '24.10.24 기부' },
    { name: 'kiyolee', detail: '24.10.24 기부' }
  ],
  operators: [
    { name: 'seongyle', detail: '24.12.04 노력 기부' },
    { name: 'yonghyle', detail: '24.12.04 노력 기부' },
    { name: 'sunhwang', detail: '24.12.04 노력 기부' },
    { name: 'sooyokim', detail: '24.12.04 노력 기부' },
    { name: 'hhwang', detail: '24.12.04 노력 기부' },
    { name: 'wochae', detail: '24.12.04 노력 기부' },
    { name: 'seonhoki', detail: '24.12.04 노력 기부' },
    { name: 'jaewchoi', detail: '24.12.04 노력 기부' },
    { name: 'juha', detail: '24.12.04 노력 기부' },
    { name: 'jimin', detail: '24.12.04 노력 기부' },
    { name: 'sangmipa', detail: '24.12.04 노력 기부' },
    { name: 'junmoon', detail: '24.12.04 노력 기부' },
    { name: 'sujikim', detail: '24.12.04 노력 기부' },
    { name: 'hyeunkim', detail: '24.12.04 노력 기부' },
    { name: 'dongyenuk', detail: '24.12.04 노력 기부' },
    { name: 'sayoon', detail: '24.12.04 노력 기부' }
  ],
  designers: [
    { name: 'junmoon', detail: '디자인 총괄' }
  ]
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const ContributorPage = () => {
  const [items, setItems] = useState<Array<{
    name: string
    detail: string
    type: string
  }>>([])
  const [isDragging, setIsDragging] = useState(false)
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  useEffect(() => {
    const initialItems = shuffleArray([
      ...contributors.operators.map(c => ({ ...c, type: 'operator' })),
      ...contributors.donators.map(c => ({ ...c, type: 'donator' })),
      ...contributors.designers.map(c => ({ ...c, type: 'designer' }))
    ])
    setItems(initialItems)
  }, [])

  const handleDragStart = (index: number) => {
    dragItem.current = index
    setIsDragging(true)
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
    
    if (dragItem.current !== null) {
      const itemsCopy = [...items]
      const draggedItem = itemsCopy[dragItem.current]
      itemsCopy.splice(dragItem.current, 1)
      itemsCopy.splice(index, 0, draggedItem)
      setItems(itemsCopy)
      dragItem.current = index
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Thanks to</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((contributor, index) => (
            <div
              key={`${contributor.type}-${contributor.name}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`
                transform transition-all duration-300 ease-in-out
                hover:scale-[1.02] 
                active:scale-[0.98] 
                cursor-grab 
                active:cursor-grabbing
                ${isDragging ? 'z-50' : 'z-0'}
              `}
              style={{
                transform: `translateY(${isDragging && dragOverItem.current === index ? '20px' : '0px'})`,
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <ContributorCard
                name={contributor.name}
                role={contributor.type === 'operator' ? 'Operator' : 
                      contributor.type === 'donator' ? 'Donator' : 'Designer'}
                contributions={contributor.detail}
                cardType={contributor.type === 'operator' ? 'electric' :
                         contributor.type === 'donator' ? 'psychic' : 'fairy'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContributorPage
