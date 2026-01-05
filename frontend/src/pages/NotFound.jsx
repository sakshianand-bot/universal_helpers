import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center shiny-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Page not found</p>
        <Link to="/" className="btn-login inline-block">
          Go back home
        </Link>
      </div>
    </div>
  )
}
