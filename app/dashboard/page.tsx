"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Profile } from "@/types";
import { calculateClarityProgress } from "@/lib/lifePurpose";
import { getSunSignDescription } from "@/lib/astrology";
import { getHumanDesignDescription, getHumanDesignStrategy } from "@/lib/humanDesign";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [clarityProgress, setClarityProgress] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile(data);
          setClarityProgress(calculateClarityProgress(data));
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">Loading your Inner Map...</div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
          <Button onClick={() => router.push("/onboarding")} className="mt-4">
            Complete Onboarding
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {profile.name}
            </h1>
            <p className="text-gray-600 mt-2">
              Your unified self-insight dashboard
            </p>
          </div>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Clarity Progress */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Clarity Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-500"
                    style={{ width: `${clarityProgress}%` }}
                  />
                </div>
              </div>
              <div className="text-3xl font-bold">{clarityProgress}%</div>
            </div>
            <p className="mt-3 text-indigo-100">
              {clarityProgress < 100
                ? "Complete more of your profile to unlock deeper insights"
                : "Your profile is complete! Explore your insights below."}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/purpose-map">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle>✨ Life Purpose Map</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Discover your unique synthesis of gifts, patterns, and life
                  direction
                </p>
                {!profile.is_premium && (
                  <p className="text-xs text-indigo-600 mt-2 font-semibold">
                    Premium Feature
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/coach">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle>💬 AI Coach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get personalized guidance based on your complete Inner Map
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Astrology Card */}
          <Card className="border-l-4 border-indigo-500">
            <CardHeader>
              <CardTitle>☀️ Astrology</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.sun_sign ? (
                <div>
                  <p className="text-2xl font-bold text-indigo-600 mb-2">
                    {profile.sun_sign}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {getSunSignDescription(profile.sun_sign)}
                  </p>
                  {profile.birth_date && (
                    <p className="text-xs text-gray-500 mt-3">
                      Birth: {new Date(profile.birth_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-3">
                    Add your birth date to unlock your astrological insights
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/onboarding")}
                  >
                    Add Birth Info
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Human Design Card */}
          <Card className="border-l-4 border-purple-500">
            <CardHeader>
              <CardTitle>🔮 Human Design</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.hd_type ? (
                <div>
                  <p className="text-2xl font-bold text-purple-600 mb-2">
                    {profile.hd_type}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    {getHumanDesignDescription(profile.hd_type)}
                  </p>
                  <p className="text-xs text-gray-600 font-semibold">
                    Strategy: {getHumanDesignStrategy(profile.hd_type)}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Note: Simplified calculation for MVP
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-3">
                    Add your birth data to discover your Human Design type
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/onboarding")}
                  >
                    Add Birth Info
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* MBTI Card */}
          <Card className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle>🧠 MBTI</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.mbti_type ? (
                <div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {profile.mbti_type}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Your cognitive style and how you process the world
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-3">
                    Discover your personality type
                  </p>
                  <Button
                    variant="outline"
                    disabled
                    title="Coming soon"
                  >
                    Take Test (Coming Soon)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enneagram Card */}
          <Card className="border-l-4 border-pink-500">
            <CardHeader>
              <CardTitle>🌟 Enneagram</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.enneagram_type ? (
                <div>
                  <p className="text-2xl font-bold text-pink-600 mb-2">
                    Type {profile.enneagram_type}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Your core motivation and behavioral patterns
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-3">
                    Discover your core motivation type
                  </p>
                  <Button
                    variant="outline"
                    disabled
                    title="Coming soon"
                  >
                    Take Test (Coming Soon)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
