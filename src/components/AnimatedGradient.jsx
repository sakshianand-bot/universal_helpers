import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedGradient() {
  return (
    <motion.div
      className="absolute inset-0 opacity-30"
      animate={{
        background: [
          'linear-gradient(45deg, #1e40af 0%, #7c3aed 100%)',
          'linear-gradient(45deg, #7c3aed 0%, #ec4899 100%)',
          'linear-gradient(45deg, #ec4899 0%, #1e40af 100%)',
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  )
}
