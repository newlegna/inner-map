"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input, Select } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { MBTI_TYPES, ENNEAGRAM_TYPES } from "@/types";
import { calculateSunSign } from "@/lib/astrology";
import { calculateHumanDesignType } from "@/lib/humanDesign";

type OnboardingStep = "welcome" | "birth-data" | "known-types" | "summary";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Form data
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [knowsMbti, setKnowsMbti] = useState(false);
  const [mbtiType, setMbtiType] = useState("");
  const [knowsEnneagram, setKnowsEnneagram] = useState(false);
  const [enneagramType, setEnneagramType] = useState("");

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Get existing profile to pre-fill name
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("user_id", user.id)
          .single();
        if (profile) {
          setName(profile.name);
        }
      } else {
        router.push("/login");
      }
    };
    getUser();
  }, [router]);

  const handleWelcome = () => {
    setStep("birth-data");
  };

  const handleBirthData = () => {
    if (!birthDate) {
      alert("Please enter your birth date");
      return;
    }
    setStep("known-types");
  };

  const handleKnownTypes = () => {
    setStep("summary");
  };

  const handleFinish = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Calculate sun sign and HD type
      const sunSign = birthDate ? calculateSunSign(birthDate) : null;
      const hdType = birthDate ? calculateHumanDesignType(birthDate) : null;

      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          name,
          birth_date: birthDate || null,
          birth_time: birthTime || null,
          birth_place: birthPlace || null,
          sun_sign: sunSign,
          hd_type: hdType,
          mbti_type: knowsMbti ? mbtiType : null,
          enneagram_type: knowsEnneagram ? enneagramType : null,
        })
        .eq("user_id", userId);

      if (error) throw error;

      router.push("/dashboard");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Welcome Screen */}
        {step === "welcome" && (
          <Card className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Inner Map
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Let's create your unified self-insight profile
            </p>
            <p className="text-gray-600 mb-8">
              We'll combine Astrology, Human Design, MBTI, and Enneagram to give
              you a comprehensive view of your unique patterns, gifts, and
              potential.
            </p>
            <p className="text-gray-600 mb-8">
              This will only take a few minutes, and you can always update your
              information later.
            </p>
            <Button onClick={handleWelcome}>
              Let's Begin
            </Button>
          </Card>
        )}

        {/* Birth Data Screen */}
        {step === "birth-data" && (
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Birth Information
            </h2>
            <p className="text-gray-600 mb-6">
              We use your birth data to calculate your astrological chart and
              Human Design type. This helps us provide personalized insights.
            </p>

            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />

            <Input
              type="date"
              label="Birth Date *"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />

            <Input
              type="time"
              label="Birth Time (optional, but helpful for accurate chart)"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />

            <Input
              type="text"
              label="Birth Place (optional - city, country)"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="e.g., New York, USA"
            />

            <div className="flex gap-4 mt-6">
              <Button variant="secondary" onClick={() => setStep("welcome")}>
                Back
              </Button>
              <Button onClick={handleBirthData}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Known Types Screen */}
        {step === "known-types" && (
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Do You Know Your Types?
            </h2>
            <p className="text-gray-600 mb-6">
              If you already know your MBTI or Enneagram type, let us know! If
              not, no worries—you can explore these later.
            </p>

            {/* MBTI */}
            <div className="mb-6">
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={knowsMbti}
                  onChange={(e) => setKnowsMbti(e.target.checked)}
                  className="mr-3 w-5 h-5 text-indigo-600"
                />
                <span className="text-gray-700 font-medium">
                  I know my MBTI type
                </span>
              </label>
              {knowsMbti && (
                <Select
                  label="Select your MBTI type"
                  value={mbtiType}
                  onChange={(e) => setMbtiType(e.target.value)}
                  options={[
                    { value: "", label: "Select..." },
                    ...MBTI_TYPES.map((type) => ({ value: type, label: type })),
                  ]}
                />
              )}
            </div>

            {/* Enneagram */}
            <div className="mb-6">
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={knowsEnneagram}
                  onChange={(e) => setKnowsEnneagram(e.target.checked)}
                  className="mr-3 w-5 h-5 text-indigo-600"
                />
                <span className="text-gray-700 font-medium">
                  I know my Enneagram type
                </span>
              </label>
              {knowsEnneagram && (
                <Select
                  label="Select your Enneagram type"
                  value={enneagramType}
                  onChange={(e) => setEnneagramType(e.target.value)}
                  options={[
                    { value: "", label: "Select..." },
                    ...ENNEAGRAM_TYPES.map((type) => ({ value: type, label: type })),
                  ]}
                />
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="secondary" onClick={() => setStep("birth-data")}>
                Back
              </Button>
              <Button onClick={handleKnownTypes}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Summary Screen */}
        {step === "summary" && (
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Inner Map Summary
            </h2>
            <p className="text-gray-600 mb-6">
              Here's what we have so far. You can always update this information
              later in your dashboard.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Astrology
                </h3>
                <p className="text-gray-700">
                  {birthDate
                    ? `We'll calculate your birth chart using your birth date${
                        birthTime ? " and time" : ""
                      }.`
                    : "Birth date not provided"}
                </p>
                {birthDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Sun Sign: {calculateSunSign(birthDate)}
                  </p>
                )}
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Human Design
                </h3>
                <p className="text-gray-700">
                  {birthDate
                    ? `Type: ${calculateHumanDesignType(birthDate)} (calculated from birth data)`
                    : "Birth date not provided"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Note: This is a simplified calculation for the MVP
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">MBTI</h3>
                <p className="text-gray-700">
                  {knowsMbti && mbtiType ? mbtiType : "Not set yet"}
                </p>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Enneagram
                </h3>
                <p className="text-gray-700">
                  {knowsEnneagram && enneagramType
                    ? `Type ${enneagramType}`
                    : "Not set yet"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep("known-types")}
              >
                Back
              </Button>
              <Button onClick={handleFinish} disabled={loading}>
                {loading ? "Saving..." : "Finish and View Your Inner Map"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
