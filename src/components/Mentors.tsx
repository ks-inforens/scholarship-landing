'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Star } from 'lucide-react'

const mentors = [
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 1',
    review: "This program changed my life. I loved guiding students!",
    rating: 5,
  },
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 2',
    review: "Fantastic experience mentoring future leaders.",
    rating: 4,
  },
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 3',
    review: "Working with bright minds has been a highlight of my career.",
    rating: 5,
  },
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 4',
    review: "Great platform and brilliant students!",
    rating: 4,
  },
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 5',
    review: "Mentoring here has been deeply fulfilling.",
    rating: 5,
  },
  {
    src: '/universities/ucl.svg',
    alt: 'Mentor 6',
    review: "Love the community and the passion I see in students.",
    rating: 4,
  },
]

export function Mentors() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative grid grid-cols-3 items-center justify-items-center rounded-4xl w-full h-screen bg-black/3 overflow-hidden md:px-8">
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-4'>
        <h1 className="text-5xl md:text-7xl uppercase font-thin text-black/50 text-center">
          Meet Some Of Our Mentors
        </h1>
        <p className="font-medium text-black/50 text-center">
          Tap to see what they have to say!
        </p>
      </div>

      {mentors.map((mentor, index) => (
        <Popover key={index} open={hovered === index}>
          <PopoverTrigger asChild>
            <motion.div
              className="relative h-30 w-24 md:h-40 md:w-32 rounded-xl border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Image
                src={mentor.src}
                alt={mentor.alt}
                fill
                className="rounded-xl object-cover"
              />
            </motion.div>
          </PopoverTrigger>

          <PopoverContent
            side="top"
            align="center"
            className="w-64 text-sm space-y-2 z-50 pointer-events-none"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <p className="text-gray-700 font-medium">"{mentor.review}"</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < mentor.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
              ))}
              <span className="text-xs text-gray-500 ml-2">({mentor.rating}/5)</span>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </section>
  )
}