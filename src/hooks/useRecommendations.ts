'use client'

import { useState } from 'react'
import { Movie } from '@/types'
import apiClient from '@/lib/api'

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = async (mood: string, region: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/api/recommend/mood', {
        user_prompt: mood,
        region,
      })
      setRecommendations(response.data.recommendations || [])
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch recommendations')
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  return { recommendations, loading, error, fetchRecommendations }
}
