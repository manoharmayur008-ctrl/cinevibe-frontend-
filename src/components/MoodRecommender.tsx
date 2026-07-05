'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import MovieCard from './MovieCard'
import { useRecommendations } from '@/hooks/useRecommendations'

const MOOD_SUGGESTIONS = [
  "Lost in a sci-fi space adventure",
  "Need a good laugh and feel-good vibes",
  "Dark, mysterious, and thrilling",
  "Epic fantasy quest with magic",
  "Emotional rollercoaster drama",
  "Action-packed adrenaline rush",
]

export default function MoodRecommender() {
  const [mood, setMood] = useState('')
  const [region, setRegion] = useState('US')
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (mood.trim()) {
      await fetchRecommendations(mood, region)
      setMood('')
    }
  }

  const handleSuggestion = async (suggestion: string) => {
    setMood(suggestion)
    await fetchRecommendations(suggestion, region)
  }

  return (
    <section id="recommender" className="py-20 px-4 bg-dark-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-neon">Describe Your Vibe</span>
          </h2>
          <p className="text-gray-400 text-lg">Let AI match you with the perfect film</p>
        </motion.div>

        {/* Input Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., 'Cozy Sunday evening with a twist of adventure'"
              className="flex-1 px-6 py-4 bg-dark-800 border-2 border-neon-purple/30 rounded-lg focus:border-neon focus:outline-none text-white placeholder-gray-500 transition-smooth"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-neon to-neon-purple text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Finding...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Find Movies
                </>
              )}
            </button>
          </div>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-2 bg-dark-800 border border-neon-purple/30 rounded text-white"
          >
            <option value="US">🇺🇸 United States</option>
            <option value="UK">🇬🇧 United Kingdom</option>
            <option value="IN">🇮🇳 India</option>
            <option value="DE">🇩🇪 Germany</option>
            <option value="FR">🇫🇷 France</option>
          </select>
        </motion.form>

        {/* Mood Suggestions */}
        {!loading && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-gray-400 mb-4">Try these moods:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOOD_SUGGESTIONS.map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSuggestion(suggestion)}
                  className="px-4 py-3 bg-dark-800 border border-neon-purple/30 rounded-lg hover:border-neon hover:bg-neon/10 transition-smooth text-left"
                >
                  ✨ {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Recommendations Grid */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recommendations.map((movie, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
