"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/admin/sidebar";
import TopNav from "@/components/admin/top-nav";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/hooks";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isConnecting } = useRequireAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading while checking authentication
  if (!mounted || isConnecting) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-[#0F0F12]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-[#0F0F12]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-[#0F0F12]">
          {children}
        </main>
      </div>
    </div>
  );
}
