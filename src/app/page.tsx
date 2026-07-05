import HeroSection from '@/components/HeroSection'
import MoodRecommender from '@/components/MoodRecommender'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <MoodRecommender />
      <Features />
      <Footer />
    </main>
  )
}
