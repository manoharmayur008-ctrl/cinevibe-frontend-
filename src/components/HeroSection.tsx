'use client'

import { motion } from 'framer-motion'
import { Sparkles, Film } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark via-dark-900 to-dark">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-neon-purple to-neon rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: '-10%', top: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ right: '-10%', bottom: '-10%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-6 h-6 text-neon" />
          <span className="text-neon font-semibold text-lg">Welcome to CineVibe</span>
          <Sparkles className="w-6 h-6 text-neon" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-neon">Discover Movies</span>
          <br />
          <span className="text-white">That Match Your </span>
          <span className="glow-pink">Vibe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Tell us your mood, and our AI will recommend the perfect movies for you. Or invite friends for real-time group matching sessions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="#recommender">
            <button className="px-8 py-4 bg-gradient-to-r from-neon to-neon-purple text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-smooth text-lg">
              Get Recommendations
            </button>
          </Link>
          <Link href="/group-match">
            <button className="px-8 py-4 border-2 border-neon text-neon font-bold rounded-lg hover:bg-neon/10 transition-smooth text-lg flex items-center gap-2">
              <Film className="w-5 h-5" />
              Group Match
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
