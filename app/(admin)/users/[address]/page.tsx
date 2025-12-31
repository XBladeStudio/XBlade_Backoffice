"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreVertical, Shield, Ban, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Mock user data
const user = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  shortAddress: "0x1234...5678",
  registeredAt: "2024-12-15 10:30:00",
  referrerAddress: "0xabcd...ef01",
  referralCode: "REF123",
  riskStatus: "normal",
};

const balances = [
  { token: "USDT", available: "100,000.00", frozen: "25,000.00", total: "125,000.00" },
];

const trades = [
  { id: "1", pair: "BTCUSDT", direction: "Buy", amount: "$21,625.25", time: "2024-12-31 14:30:25" },
  { id: "2", pair: "ETHUSDT", direction: "Sell", amount: "$23,500.00", time: "2024-12-31 14:28:15" },
];

const orders = [
  { id: "ORD001", pair: "BTCUSDT", type: "Limit", direction: "Buy", status: "Open", time: "2024-12-31 14:30:25" },
  { id: "ORD002", pair: "ETHUSDT", type: "Market", direction: "Sell", status: "Filled", time: "2024-12-31 14:28:15" },
];

const positions = [
  { id: "POS001", pair: "BTCUSDT", direction: "Long", size: "$50,000", pnl: "+$1,250", status: "Open" },
];

const referrals = [
  { address: "0x5678...1234", volume: "$756,000", commission: "$1,512", registeredAt: "2024-12-20" },
  { address: "0x8765...4321", volume: "$234,000", commission: "$468", registeredAt: "2024-12-18" },
];

export default function UserDetailPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/users">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              User Details
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-mono">
              {user.address}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MoreVertical className="h-4 w-4" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Mark as High Risk
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-600">
              <Ban className="h-4 w-4" />
              Add to Blacklist
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-600">
              <Shield className="h-4 w-4" />
              Force Close Positions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-mono text-sm">{user.shortAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registered</p>
              <p className="text-sm">{user.registeredAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Referrer</p>
              <p className="font-mono text-sm">{user.referrerAddress || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Referral Code</p>
              <p className="font-mono text-sm">{user.referralCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Risk Status</p>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 mt-1">
                Normal
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Balance Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead className="text-right">Frozen</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balances.map((balance) => (
                  <TableRow key={balance.token}>
                    <TableCell className="font-medium">{balance.token}</TableCell>
                    <TableCell className="text-right font-mono">
                      ${balance.available}
                    </TableCell>
                    <TableCell className="text-right font-mono text-gray-500">
                      ${balance.frozen}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      ${balance.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="trades" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="funds">Fund Flow</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="trades">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trade ID</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell className="font-mono">#{trade.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{trade.pair}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            trade.direction === "Buy"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {trade.direction}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {trade.amount}
                      </TableCell>
                      <TableCell className="text-gray-500">{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.pair}</Badge>
                      </TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.direction === "Buy"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {order.direction}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{order.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position ID</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead className="text-right">Size</TableHead>
                    <TableHead className="text-right">PnL</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id}>
                      <TableCell className="font-mono">{position.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{position.pair}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            position.direction === "Long"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {position.direction}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {position.size}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-medium ${
                          position.pnl.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {position.pnl}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{position.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funds">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center py-8">
                Fund flow records will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Address</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.address}>
                      <TableCell className="font-mono">{referral.address}</TableCell>
                      <TableCell className="text-right font-mono">
                        {referral.volume}
                      </TableCell>
                      <TableCell className="text-right font-mono text-green-600">
                        {referral.commission}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {referral.registeredAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
