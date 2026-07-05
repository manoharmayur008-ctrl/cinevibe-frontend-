# CineVibe Frontend

A unique AI-powered movie recommendation website with real-time group matching.

## Features

✨ **Mood-Based Recommendations** - Describe your vibe, get personalized movie suggestions powered by AI embeddings
🎬 **Group Match Sessions** - Swipe movies with friends in real-time and find collective picks
🎨 **Modern UI** - Smooth animations and a sleek dark theme
⚡ **Real-Time Updates** - WebSocket integration for instant group syncing

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/manoharmayur008-ctrl/cinevibe-frontend-.git
cd cinevibe-frontend-
npm install
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and update values:

```bash
cp .env.local.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **WebSocket** - Real-time communication

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and API clients
├── stores/             # Zustand state stores
└── types/              # TypeScript type definitions
```

## API Integration

Connects to the CineVibe FastAPI backend at `NEXT_PUBLIC_API_BASE_URL`.

### Available Endpoints

- `POST /api/recommend/mood` - Get mood-based recommendations
- `WS /ws/group-match/{room_code}/{user_id}` - Join a group matching session

## License

MIT
