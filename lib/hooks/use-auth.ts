"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Allowed admin addresses (in production, fetch from backend)
const ALLOWED_ADMINS = [
  "0x1234567890abcdef1234567890abcdef12345678",
].map((addr) => addr.toLowerCase());

export function useAuth(options?: { requireAuth?: boolean }) {
  const { address, isConnected, isConnecting } = useAccount();
  const router = useRouter();

  const isAdmin = address
    ? ALLOWED_ADMINS.includes(address.toLowerCase())
    : false;

  const isAuthenticated = isConnected && address;

  useEffect(() => {
    if (options?.requireAuth && !isConnecting && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isConnecting, options?.requireAuth, router]);

  return {
    address,
    isConnected,
    isConnecting,
    isAdmin,
    isAuthenticated,
  };
}

export function useRequireAuth() {
  return useAuth({ requireAuth: true });
}
