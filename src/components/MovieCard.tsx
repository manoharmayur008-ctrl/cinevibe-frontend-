'use client'

import { motion } from 'framer-motion'
import { Star, Play } from 'lucide-react'
import { Movie } from '@/types'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-dark-800 rounded-xl overflow-hidden border border-neon-purple/20 hover:border-neon/50 transition-smooth cursor-pointer"
    >
      {/* Background Image */}
      <div className="relative h-64 bg-gradient-to-br from-neon-purple to-neon-pink overflow-hidden">
        <div className="absolute inset-0 bg-dark-800/40 group-hover:bg-dark-800/20 transition-smooth" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play className="w-16 h-16 text-neon opacity-50 group-hover:opacity-100 transition-smooth" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-white">
          {movie.title}
        </h3>

        {/* Score/Match percentage */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 bg-dark-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(movie.score * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-neon to-neon-purple"
            />
          </div>
          <span className="text-sm font-bold text-neon">
            {Math.round(movie.score * 100)}%
          </span>
        </div>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-neon-pink" />
            <span>Match Score</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent flex items-end p-4 pointer-events-none"
      >
        <button className="w-full py-2 bg-neon text-dark font-bold rounded pointer-events-auto hover:bg-neon-purple transition-smooth">
          View Details
        </button>
      </motion.div>
    </motion.div>
  )
}
