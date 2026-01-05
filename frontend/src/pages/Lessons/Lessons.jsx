import React from 'react'
import { motion } from 'framer-motion'

export default function Lessons() {
  const lessons = [
    { id: 1, title: 'React Basics', instructor: 'John Doe', level: 'Beginner' },
    { id: 2, title: 'Advanced React', instructor: 'Jane Smith', level: 'Advanced' },
    { id: 3, title: 'Web Design', instructor: 'Mike Johnson', level: 'Intermediate' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-20 shiny-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Our Lessons
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{lesson.title}</h3>
              <p className="text-gray-400 mb-4">By {lesson.instructor}</p>
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {lesson.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
