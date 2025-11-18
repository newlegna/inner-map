"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  // Don't show header on landing, login, signup pages
  const hideHeader = ["/", "/login", "/signup"].includes(pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {!hideHeader && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
                Inner Map
              </Link>
              <nav className="flex gap-6">
                <Link
                  href="/dashboard"
                  className={`text-gray-700 hover:text-indigo-600 transition-colors ${
                    pathname === "/dashboard" ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/purpose-map"
                  className={`text-gray-700 hover:text-indigo-600 transition-colors ${
                    pathname === "/purpose-map" ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  Purpose Map
                </Link>
                <Link
                  href="/coach"
                  className={`text-gray-700 hover:text-indigo-600 transition-colors ${
                    pathname === "/coach" ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  AI Coach
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
