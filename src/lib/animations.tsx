'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0.1, duration = 1, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}