'use client'

import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-neon-purple/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-neon">CineVibe</h3>
            <p className="text-gray-400 text-sm">AI-powered movie recommendations that understand your vibe</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon transition-smooth">Mood Recommendations</a></li>
              <li><a href="#" className="hover:text-neon transition-smooth">Group Matching</a></li>
              <li><a href="#" className="hover:text-neon transition-smooth">Trending</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon transition-smooth">About</a></li>
              <li><a href="#" className="hover:text-neon transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-neon transition-smooth">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-neon transition-smooth"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-neon transition-smooth"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-neon transition-smooth"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-neon-purple/20 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 CineVibe. All rights reserved. | Built with ✨ and AI</p>
        </div>
      </div>
    </footer>
  )
}
