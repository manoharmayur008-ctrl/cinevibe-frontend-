'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, LogOut, Heart, X } from 'lucide-react'
import MovieCard from './MovieCard'
import { Movie } from '@/types'

interface GroupMatchRoomProps {
  roomCode: string
  userId: string
  onLeave: () => void
}

interface RoomMessage {
  type: 'USER_JOINED' | 'USER_LEFT' | 'MATCH_FOUND' | 'SWIPE'
  user_id?: string
  movie_id?: number
  message?: string
}

export default function GroupMatchRoom({ roomCode, userId, onLeave }: GroupMatchRoomProps) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [users, setUsers] = useState<Set<string>>(new Set([userId]))
  const [matches, setMatches] = useState<Movie[]>([])
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesRef = useRef<RoomMessage[]>([])

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/group-match/${roomCode}/${userId}`
    const websocket = new WebSocket(wsUrl)

    websocket.onopen = () => {
      console.log('Connected to group match room')
      setLoading(false)
    }

    websocket.onmessage = (event) => {
      const data: RoomMessage = JSON.parse(event.data)
      messagesRef.current.push(data)

      switch (data.type) {
        case 'USER_JOINED':
          setUsers((prev) => new Set([...prev, data.user_id || '']))
          break
        case 'USER_LEFT':
          setUsers((prev) => {
            const newSet = new Set(prev)
            newSet.delete(data.user_id || '')
            return newSet
          })
          break
        case 'MATCH_FOUND':
          if (data.movie_id) {
            setMatches((prev) => [
              ...prev,
              {
                movie_id: data.movie_id,
                title: data.message || 'Perfect Match!',
                score: 1.0,
              },
            ])
          }
          break
      }
    }

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
      setLoading(false)
    }

    websocket.onclose = () => {
      console.log('Disconnected from room')
    }

    setWs(websocket)

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close()
      }
    }
  }, [roomCode, userId])

  const handleSwipe = (direction: 'like' | 'dislike') => {
    if (ws && ws.readyState === WebSocket.OPEN && currentMovie) {
      ws.send(
        JSON.stringify({
          action: 'swipe',
          movie_id: currentMovie.movie_id,
          direction,
        })
      )
      setCurrentMovie(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-4xl font-bold">
              <span className="gradient-neon">Group Match</span>
            </h1>
            <p className="text-gray-400 mt-2">Room: <span className="font-mono text-neon">{roomCode}</span></p>
          </div>
          <button
            onClick={onLeave}
            className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition-smooth flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Leave Room
          </button>
        </motion.div>

        {/* Users Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-800 rounded-lg p-4 border border-neon-purple/20 flex items-center gap-4"
        >
          <Users className="w-5 h-5 text-neon" />
          <div className="flex-1">
            <p className="font-semibold">Users in Room: {users.size}</p>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              {Array.from(users).map((u, i) => (
                <span key={i}>
                  {u === userId ? (
                    <span className="text-neon font-bold">You</span>
                  ) : (
                    u
                  )}
                  {i < users.size - 1 && ','}
                </span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Swipe Area */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="h-96 bg-dark-800 rounded-xl border border-neon-purple/20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <MessageCircle className="w-12 h-12 text-neon" />
              </motion.div>
            </div>
          ) : currentMovie ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-dark-800 rounded-xl overflow-hidden border border-neon-purple/20 h-96">
                <div className="w-full h-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-6xl font-bold text-dark/20">
                  🎬
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{currentMovie.title}</h2>
                <p className="text-gray-400 mb-6">Everyone swipe together!</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSwipe('dislike')}
                  className="flex-1 py-4 bg-dark-800 border-2 border-neon-pink text-neon-pink font-bold rounded-lg hover:bg-neon-pink/10 transition-smooth flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Skip
                </button>
                <button
                  onClick={() => handleSwipe('like')}
                  className="flex-1 py-4 bg-gradient-to-r from-neon to-neon-purple text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-smooth flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Love It!
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-96 bg-dark-800 rounded-xl border border-neon-purple/20 flex items-center justify-center text-center p-6">
              <div>
                <p className="text-gray-400 mb-4">Waiting for movies...</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  🍿
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Matches Sidebar */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-800 rounded-xl border border-neon-purple/20 p-6 h-full"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-neon-pink" />
              Matches Found
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {matches.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No matches yet. Start swiping!</p>
              ) : (
                matches.map((match, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-dark-900 rounded border border-neon/30 text-sm"
                  >
                    <p className="font-semibold text-neon mb-1">✨ Match #{idx + 1}</p>
                    <p className="text-gray-300">{match.title}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
