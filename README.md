# Inner Map

A unified self-insight and coaching platform that combines **Astrology**, **Human Design**, **MBTI**, and **Enneagram** into one integrated experience.

## 📱 Two Versions Available

This repository contains both **Web** and **Mobile** versions:

- **Web App** (Next.js) - Full-featured with AI integration → [Setup Guide](#setup-instructions)
- **Mobile App** (React Native + Expo) - Native mobile experience → [Mobile README](./mobile/README.md)

Both versions share the same Supabase backend and user accounts!

## Features

### ✅ Implemented in MVP

1. **User Authentication**
   - Email/password sign up and login via Supabase Auth
   - Secure session management

2. **Onboarding Flow**
   - Welcome screen with app introduction
   - Birth data collection (name, date, time, location)
   - Known types collection (MBTI, Enneagram)
   - Summary screen showing profile preview

3. **Dashboard**
   - Clarity Progress metric (0-100% based on profile completion)
   - Cards for each system (Astrology, Human Design, MBTI, Enneagram)
   - Quick access to Life Purpose Map and AI Coach
   - Beautiful, responsive UI with Tailwind CSS

4. **Life Purpose Map (Premium Feature)**
   - Rule-based draft generation from user profile
   - AI enhancement via OpenAI API
   - Premium preview/gate (for MVP, set to allow access for testing)
   - Synthesis of all four systems into cohesive insights

5. **AI Coach**
   - Real-time chat interface
   - Context-aware responses based on complete user profile
   - Trauma-aware, compassionate guidance
   - Support for relationships, emotions, purpose, and daily life

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript, App Router
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment Ready**: Can be deployed to Vercel or similar platforms

## Project Structure

```
inner-map/
├── app/
│   ├── api/
│   │   ├── coach/          # AI coach chat API
│   │   └── generate-purpose/ # Life Purpose Map generation API
│   ├── coach/              # AI Coach page
│   ├── dashboard/          # User dashboard
│   ├── login/              # Login page
│   ├── onboarding/         # 4-screen onboarding flow
│   ├── purpose-map/        # Life Purpose Map page
│   ├── signup/             # Signup page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── Card.tsx            # Card components
│   ├── Input.tsx           # Input and Select components
│   └── Layout.tsx          # Authenticated app layout
├── lib/
│   ├── astrology.ts        # Sun sign calculation & descriptions
│   ├── humanDesign.ts      # HD type calculation (mocked for MVP)
│   ├── lifePurpose.ts      # Purpose map generation logic
│   └── supabase.ts         # Supabase client config
├── types/
│   └── index.ts            # TypeScript types and constants
├── supabase-schema.sql     # Database schema
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- An OpenAI API key (optional for AI features)

### 2. Clone and Install

```bash
git clone <your-repo-url>
cd inner-map
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase-schema.sql`
3. Go to Settings > API to get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# OpenAI API Key (optional - app will work without it, but AI features will be limited)
OPENAI_API_KEY=sk-your-openai-api-key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Flow

1. **Landing Page** → Sign up or log in
2. **Onboarding** → Complete 4-step profile setup
3. **Dashboard** → View your clarity progress and system cards
4. **Life Purpose Map** → Generate and view your synthesized insights
5. **AI Coach** → Chat for personalized guidance

## Key Implementation Details

### Astrology

- **Sun sign calculation**: Uses birth date with standard zodiac ranges
- **Future enhancement**: Add moon sign, rising sign, full birth chart with ephemeris data

### Human Design

- **Current**: Simplified deterministic calculation based on birth date
- **MVP Note**: Clearly marked as "mocked" in UI
- **Future enhancement**: Real HD chart calculation using birth time and location

### MBTI & Enneagram

- **Current**: User self-reports if they know their type
- **Future enhancement**: Add assessment tests

### Life Purpose Map

- **Rule-based draft**: Synthesizes profile data into a base text
- **AI enhancement**: OpenAI refines the draft into a warm, personalized map
- **Premium gate**: Visual gate for premium content (set to allow access in MVP for testing)

### AI Coach

- **System prompt**: Includes user's complete profile for personalized responses
- **Tone**: Compassionate, trauma-aware, validating
- **Use cases**: Emotions, relationships, purpose, daily life guidance

## Database Schema

See `supabase-schema.sql` for the complete schema.

**Tables**:
- `profiles` - User profile data (extends Supabase auth.users)
- `coach_messages` - Chat history (optional for MVP)

**Row Level Security**: Enabled with policies ensuring users can only access their own data.

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous key |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features (app works without it) |

## Future Enhancements

- [ ] Real payment integration for premium features
- [ ] Full astrological chart calculations with ephemeris
- [ ] Accurate Human Design chart generation
- [ ] MBTI and Enneagram assessment tests
- [ ] Persistent chat history in database
- [ ] Profile editing functionality
- [ ] Social sharing of insights
- [ ] Mobile app (React Native)
- [ ] Daily insights and notifications
- [ ] Relationship compatibility analysis

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

This app is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Alternatively, deploy to any platform that supports Next.js (Railway, Render, Netlify, etc.)

## Security Notes

- All API routes are server-side only
- OpenAI API key is never exposed to the client
- Row Level Security enforced in Supabase
- Auth tokens managed securely by Supabase

## Support

For issues or questions:
- Check the code comments for implementation details
- Review the Supabase docs: https://supabase.com/docs
- Review the Next.js docs: https://nextjs.org/docs
- Review the OpenAI docs: https://platform.openai.com/docs

## License

MIT (or your preferred license)

---

Built with ❤️ for self-insight and personal growth.
