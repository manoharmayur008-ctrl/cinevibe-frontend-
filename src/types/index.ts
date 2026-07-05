export interface Movie {
  movie_id: number
  title: string
  score: number
}

export interface Recommendation {
  status: string
  recommendations: Movie[]
}
