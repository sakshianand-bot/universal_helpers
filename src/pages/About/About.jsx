import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-20 shiny-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              Universal-Helper is a modern online learning platform dedicated to providing high-quality education to students around the world.
            </p>
            
            <p className="text-lg">
              Our mission is to make education accessible, affordable, and enjoyable for everyone, regardless of their background or experience level.
            </p>
            
            <p className="text-lg">
              With experienced instructors and comprehensive courses, we help students achieve their learning goals and advance their careers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
