import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Inner Map
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Your unified journey to self-insight and purpose
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Discover your unique path by combining Astrology, Human Design, MBTI,
          and Enneagram into one integrated experience.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
