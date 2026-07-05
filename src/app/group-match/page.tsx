'use client'

import { useState } from 'react'
import GroupMatchRoom from '@/components/GroupMatchRoom'
import RoomJoinForm from '@/components/RoomJoinForm'

export default function GroupMatchPage() {
  const [roomCode, setRoomCode] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const handleJoinRoom = (code: string, user: string) => {
    setRoomCode(code)
    setUserId(user)
  }

  const handleLeaveRoom = () => {
    setRoomCode(null)
    setUserId(null)
  }

  if (roomCode && userId) {
    return (
      <GroupMatchRoom 
        roomCode={roomCode} 
        userId={userId}
        onLeave={handleLeaveRoom}
      />
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <RoomJoinForm onJoinRoom={handleJoinRoom} />
    </div>
  )
}
