"use client";

import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, Shield, TrendingUp, Loader2 } from "lucide-react";

// Allowed admin addresses (in production, this should be fetched from backend)
const ALLOWED_ADMINS = [
  "0x1234567890abcdef1234567890abcdef12345678", // Example admin address
].map((addr) => addr.toLowerCase());

export default function LoginPage() {
  const router = useRouter();
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if connected address is an admin
  const isAdmin = address ? ALLOWED_ADMINS.includes(address.toLowerCase()) : false;

  // Auto-redirect if already connected and verified
  useEffect(() => {
    if (isConnected && address) {
      // In production, verify signature with backend
      // For now, redirect to dashboard
      router.push("/dashboard");
    }
  }, [isConnected, address, router]);

  const handleConnect = async (connectorId: string) => {
    setError(null);
    const selectedConnector = connectors.find((c) => c.id === connectorId);
    if (selectedConnector) {
      connect({ connector: selectedConnector });
    }
  };

  const handleVerifyAndLogin = async () => {
    if (!address) return;

    setIsVerifying(true);
    setError(null);

    try {
      // Create a message to sign
      const message = `Sign this message to verify your identity as an admin.\n\nTimestamp: ${Date.now()}`;

      // Request signature
      const signature = await signMessageAsync({ message });

      // In production, send signature to backend for verification
      console.log("Signature:", signature);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Signature verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const getConnectorIcon = (connectorId: string) => {
    switch (connectorId) {
      case "injected":
      case "metaMask":
        return "🦊";
      case "walletConnect":
        return "🔗";
      case "coinbaseWalletSDK":
        return "🔵";
      default:
        return "💼";
    }
  };

  const getConnectorName = (connector: { id: string; name: string }) => {
    if (connector.id === "injected") {
      return "Browser Wallet";
    }
    return connector.name;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">XBlade Admin</h1>
              <p className="text-sm text-gray-400">Perps DEX Backoffice</p>
            </div>
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-gray-400">
              Connect your wallet to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
              <>
                {/* Wallet Connect Buttons */}
                <div className="space-y-3">
                  {connectors.map((connector) => (
                    <Button
                      key={connector.id}
                      variant="outline"
                      className="w-full h-14 bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 hover:border-gray-500 text-white justify-start gap-3"
                      onClick={() => handleConnect(connector.id)}
                      disabled={isPending}
                    >
                      <span className="text-2xl">{getConnectorIcon(connector.id)}</span>
                      <span className="flex-1 text-left">
                        {getConnectorName(connector)}
                      </span>
                      {isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  ))}
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Info */}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 text-center">
                    Only authorized admin wallets can access this panel.
                    <br />
                    Contact support if you need access.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Connected State */}
                <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Connected Wallet</span>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-400 border-green-500/20"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-mono text-sm truncate">
                        {address}
                      </p>
                      <p className="text-xs text-gray-400">
                        via {connector?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admin Status */}
                {!isAdmin && (
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-sm text-yellow-400">
                      ⚠️ This wallet is not in the admin whitelist.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleVerifyAndLogin}
                    disabled={isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Sign & Login
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white hover:bg-gray-700/50"
                    onClick={() => disconnect()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2024 XBlade. All rights reserved.
        </p>
      </div>
    </div>
  );
}
