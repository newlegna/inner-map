# Quick Setup Guide

Follow these steps to get Inner Map running locally.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in your project details (name, database password, region)
4. Wait for the project to be created (~2 minutes)

## Step 3: Create Database Tables

1. In your Supabase project, go to the SQL Editor (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from this repo
4. Paste it into the SQL editor
5. Click "Run" to execute the script
6. You should see success messages for all table creations

## Step 4: Get Your Supabase Credentials

1. In your Supabase project, go to Settings (gear icon) → API
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 5: Get OpenAI API Key (Optional)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy it (starts with `sk-...`)

**Note**: The app will work without this key, but AI features (Life Purpose Map enhancement and Coach) won't function.

## Step 6: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
   OPENAI_API_KEY=sk-xxxxx...
   ```

## Step 7: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 8: Create Your First Account

1. Click "Get Started" on the landing page
2. Fill in your email and password
3. Complete the onboarding flow
4. Explore your dashboard!

## Troubleshooting

### "Missing Supabase environment variables"

Make sure your `.env.local` file exists and has the correct variable names:
- `NEXT_PUBLIC_SUPABASE_URL` (must start with `NEXT_PUBLIC_`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (must start with `NEXT_PUBLIC_`)

### Database errors

Make sure you ran the entire `supabase-schema.sql` file in the SQL Editor.

### AI features not working

Check that your `OPENAI_API_KEY` is set correctly in `.env.local`. Make sure there are no extra spaces or quotes.

### Port already in use

If port 3000 is busy, Next.js will automatically use 3001. Check the terminal output for the correct URL.

## Next Steps

- Complete your profile with birth data and known types
- Check out your Life Purpose Map
- Chat with the AI Coach
- Explore the dashboard

Enjoy your Inner Map journey! 🗺️✨
