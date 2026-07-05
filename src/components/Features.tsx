'use client'

import { motion } from 'framer-motion'
import { Sparkles, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Mood Analysis',
    description: 'Describe any mood or vibe, and our AI understands exactly what movie you need',
  },
  {
    icon: Users,
    title: 'Real-Time Group Matching',
    description: 'Swipe movies with friends and instantly find the perfect movie everyone loves',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Results',
    description: 'Get personalized recommendations in milliseconds with semantic search',
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 bg-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-neon">CineVibe</span>?
          </h2>
          <p className="text-gray-400 text-lg">Experience movies like never before</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 bg-dark-900 rounded-xl border border-neon-purple/20 hover:border-neon/50 transition-smooth group hover:bg-dark-800"
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-neon to-neon-purple flex items-center justify-center group-hover:shadow-lg group-hover:shadow-neon/30 transition-smooth">
                  <Icon className="w-6 h-6 text-dark" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
