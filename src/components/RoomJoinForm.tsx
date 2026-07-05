'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Users, Play } from 'lucide-react'

interface RoomJoinFormProps {
  onJoinRoom: (roomCode: string, userId: string) => void
}

export default function RoomJoinForm({ onJoinRoom }: RoomJoinFormProps) {
  const [roomCode, setRoomCode] = useState('')
  const [username, setUsername] = useState('')
  const [mode, setMode] = useState<'join' | 'create'>('join')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (roomCode.trim() && username.trim()) {
      onJoinRoom(roomCode, username)
    }
  }

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(code)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <div className="bg-dark-800 rounded-2xl border-2 border-neon-purple/30 p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-neon">Group Match</span>
        </h1>
        <p className="text-gray-400 mb-8">Watch together, decide together</p>

        {/* Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode('join')}
            className={`flex-1 py-3 rounded-lg font-bold transition-smooth ${
              mode === 'join'
                ? 'bg-neon text-dark'
                : 'bg-dark-900 text-gray-400 hover:text-white'
            }`}
          >
            Join Room
          </button>
          <button
            onClick={() => setMode('create')}
            className={`flex-1 py-3 rounded-lg font-bold transition-smooth ${
              mode === 'create'
                ? 'bg-neon text-dark'
                : 'bg-dark-900 text-gray-400 hover:text-white'
            }`}
          >
            Create Room
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-dark-900 border-2 border-neon-purple/30 rounded-lg focus:border-neon focus:outline-none text-white placeholder-gray-500 transition-smooth"
              required
            />
          </div>

          {/* Room Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold">Room Code</label>
              {mode === 'create' && (
                <button
                  type="button"
                  onClick={generateRoomCode}
                  className="text-xs text-neon hover:text-neon-purple transition-smooth"
                >
                  Generate
                </button>
              )}
            </div>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder={mode === 'join' ? 'Enter room code' : 'Generated code will appear here'}
              className="w-full px-4 py-3 bg-dark-900 border-2 border-neon-purple/30 rounded-lg focus:border-neon focus:outline-none text-white placeholder-gray-500 transition-smooth font-mono uppercase"
              required
            />
            {mode === 'create' && roomCode && (
              <p className="text-xs text-gray-400 mt-2">Share this code with friends to invite them</p>
            )}
          </div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neon/10 border border-neon/30 rounded-lg p-4 text-sm text-gray-300"
          >
            {mode === 'join' ? (
              <p>Enter the room code your friends shared with you.</p>
            ) : (
              <div>
                <p className="font-semibold mb-1 text-neon">✨ Creating a new room</p>
                <p>Generate a code above and share it with friends. Everyone who joins will swipe together!</p>
              </div>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!roomCode.trim() || !username.trim()}
            className="w-full py-4 bg-gradient-to-r from-neon to-neon-purple text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
          >
            <Play className="w-5 h-5" />
            {mode === 'join' ? 'Join Session' : 'Create & Join'}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">Tip: Room codes are temporary. Create a new one for each session.</p>
      </div>
    </motion.div>
  )
}
