"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Profile } from "@/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CoachPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          // Add welcome message
          setMessages([
            {
              role: "assistant",
              content: `Hello ${data.name}! I'm your AI coach, here to support you on your Inner Map journey. I understand your unique combination of Astrology, Human Design, MBTI, and Enneagram.\n\nHow can I support you today? Whether it's navigating emotions, relationships, purpose questions, or just checking in - I'm here for you.`,
            },
          ]);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !profile || sending) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      // Send to API
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          profile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">Loading your AI Coach...</div>
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Coach</h1>
          <p className="text-gray-600">
            Your compassionate guide, informed by your complete Inner Map
          </p>
        </div>

        <Card className="flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-500 italic">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                rows={3}
                disabled={sending}
              />
              <Button
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="self-end"
              >
                {sending ? "Sending..." : "Send"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This AI coach is here to support and guide, not diagnose or replace professional help.
            </p>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <div className="text-2xl mb-2">💭</div>
            <div className="font-semibold text-gray-900 mb-1">Emotional Support</div>
            <p className="text-sm text-gray-600">
              Navigate daily feelings and patterns
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-semibold text-gray-900 mb-1">Relationships</div>
            <p className="text-sm text-gray-600">
              Understand dynamics and communication
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-gray-900 mb-1">Purpose & Career</div>
            <p className="text-sm text-gray-600">
              Align with your authentic path
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
