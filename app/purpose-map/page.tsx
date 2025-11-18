"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Profile } from "@/types";
import { buildLifePurposeDraft } from "@/lib/lifePurpose";

export default function PurposeMapPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [purposeContent, setPurposeContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

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
          // For MVP, set is_premium to true for testing
          // In production, this would check actual premium status
          const isPremium = data.is_premium || true; // TODO: Remove "|| true" in production
          setIsPreview(!isPremium);

          // Generate purpose map
          await generatePurposeMap(data);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const generatePurposeMap = async (profileData: Profile) => {
    setGenerating(true);
    try {
      // Build rule-based draft
      const draft = buildLifePurposeDraft(profileData);

      // Enhance with AI if API key is available
      const response = await fetch("/api/generate-purpose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: profileData,
          draft,
        }),
      });

      const data = await response.json();
      setPurposeContent(data.content);
    } catch (err) {
      console.error("Error generating purpose map:", err);
      // Fallback to draft
      setPurposeContent(buildLifePurposeDraft(profileData));
    } finally {
      setGenerating(false);
    }
  };

  if (loading || generating) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-xl text-gray-600 mb-2">
              {generating ? "Weaving your Life Purpose Map..." : "Loading..."}
            </div>
            <div className="text-sm text-gray-500">
              {generating && "This may take a moment as we synthesize your unique patterns"}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="text-center">
          <p className="text-xl text-gray-600">Profile not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Life Purpose Map
          </h1>
          <p className="text-gray-600">
            A synthesis of your Astrology, Human Design, MBTI, and Enneagram
          </p>
        </div>

        {/* Premium Badge */}
        {isPreview && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 rounded-lg text-center">
            <p className="font-semibold mb-1">✨ Premium Feature Preview</p>
            <p className="text-sm text-amber-50">
              This is a preview. Upgrade to unlock your complete Life Purpose Map with deeper insights.
            </p>
          </div>
        )}

        {/* Purpose Content */}
        <Card className={isPreview ? "relative" : ""}>
          <CardHeader>
            <CardTitle>Your Unique Synthesis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={isPreview ? "blur-sm select-none" : ""}>
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
                {purposeContent}
              </div>
            </div>

            {isPreview && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Unlock Full Access
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get your complete Life Purpose Map with personalized insights,
                    shadow work guidance, and actionable life direction.
                  </p>
                  <Button>
                    Upgrade to Premium
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    (Payment integration coming soon)
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Summary Cards */}
        {!isPreview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.sun_sign && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">☀️</div>
                  <div className="font-semibold text-gray-900">{profile.sun_sign}</div>
                  <div className="text-xs text-gray-500">Sun Sign</div>
                </CardContent>
              </Card>
            )}
            {profile.hd_type && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">🔮</div>
                  <div className="font-semibold text-gray-900">{profile.hd_type}</div>
                  <div className="text-xs text-gray-500">Human Design</div>
                </CardContent>
              </Card>
            )}
            {profile.mbti_type && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">🧠</div>
                  <div className="font-semibold text-gray-900">{profile.mbti_type}</div>
                  <div className="text-xs text-gray-500">MBTI</div>
                </CardContent>
              </Card>
            )}
            {profile.enneagram_type && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">🌟</div>
                  <div className="font-semibold text-gray-900">Type {profile.enneagram_type}</div>
                  <div className="text-xs text-gray-500">Enneagram</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="secondary" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button onClick={() => router.push("/coach")}>
            Chat with AI Coach
          </Button>
        </div>
      </div>
    </Layout>
  );
}
