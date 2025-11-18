import React from 'react'
import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    { title: 'Live Chat Support', description: 'Get instant help from our AI-powered assistant and human experts.' },
    { title: 'Course Recommendations', description: 'Personalized course suggestions based on your interests and goals.' },
    { title: 'Progress Tracking', description: 'Monitor your learning journey and achievements in real time.' },
    { title: 'Resource Library', description: 'Access a curated library of articles, videos, and guides.' },
    { title: 'Community Forums', description: 'Connect with other learners and share knowledge.' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-20 shiny-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Our Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700"
            >
              <h2 className="text-2xl font-bold text-white mb-2">{service.title}</h2>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
