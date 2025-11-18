import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Map - Your Unified Self-Insight Journey",
  description: "Combine Astrology, Human Design, MBTI, and Enneagram for deeper self-understanding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
