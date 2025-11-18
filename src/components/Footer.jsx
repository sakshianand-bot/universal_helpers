import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Universal-Helper</h3>
            <p className="text-gray-400">Empowering education through technology.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Lessons</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><Mail size={18} /> contact@universal-helper.com</li>
              <li className="flex items-center gap-2"><Phone size={18} /> +1 (555) 000-0000</li>
              <li className="flex items-center gap-2"><MapPin size={18} /> City, Country</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />
        <p className="text-center text-gray-400">&copy; 2024 Universal-Helper. All rights reserved.</p>
      </div>
    </footer>
  )
}
