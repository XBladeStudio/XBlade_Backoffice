"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data
const dailyStats = [
  { date: "2024-12-31", volume: "$12,450,000", fees: "$24,900", trades: 1234, growth: "+12.5%" },
  { date: "2024-12-30", volume: "$11,060,000", fees: "$22,120", trades: 1089, growth: "+8.2%" },
  { date: "2024-12-29", volume: "$10,220,000", fees: "$20,440", trades: 987, growth: "-2.3%" },
  { date: "2024-12-28", volume: "$10,460,000", fees: "$20,920", trades: 1023, growth: "+5.1%" },
  { date: "2024-12-27", volume: "$9,950,000", fees: "$19,900", trades: 956, growth: "+3.8%" },
];

const pairStats = [
  { pair: "BTCUSDT", volume: "$5,602,500", percentage: "45%", fees: "$11,205", trades: 556 },
  { pair: "ETHUSDT", volume: "$4,357,500", percentage: "35%", fees: "$8,715", trades: 432 },
  { pair: "SOLUSDT", volume: "$2,490,000", percentage: "20%", fees: "$4,980", trades: 246 },
];

const topTraders = [
  { rank: 1, address: "0x1234...5678", volume: "$2,450,000", trades: 156, fees: "$4,900" },
  { rank: 2, address: "0xabcd...ef01", volume: "$1,890,000", trades: 89, fees: "$3,780" },
  { rank: 3, address: "0x9876...5432", volume: "$1,234,000", trades: 234, fees: "$2,468" },
  { rank: 4, address: "0xfedc...ba98", volume: "$987,000", trades: 67, fees: "$1,974" },
  { rank: 5, address: "0x5678...1234", volume: "$756,000", trades: 123, fees: "$1,512" },
];

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trade Statistics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Trading volume, fees, and trend analysis
          </p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="day">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Volume (30d)
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              $324,560,000
            </p>
            <div className="flex items-center mt-2 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+18.2% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Fees (30d)
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              $649,120
            </p>
            <div className="flex items-center mt-2 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+15.6% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Trades (30d)
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              32,456
            </p>
            <div className="flex items-center mt-2 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+22.1% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Avg Trade Size
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              $10,000
            </p>
            <div className="flex items-center mt-2 text-red-500">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-sm">-3.2% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Stats</TabsTrigger>
          <TabsTrigger value="pairs">By Trading Pair</TabsTrigger>
          <TabsTrigger value="traders">Top Traders</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardHeader>
              <CardTitle className="text-lg">Daily Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Fees</TableHead>
                    <TableHead className="text-right">Trades</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyStats.map((stat) => (
                    <TableRow key={stat.date}>
                      <TableCell className="font-medium">{stat.date}</TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.volume}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.fees}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.trades}
                      </TableCell>
                      <TableCell
                        className={`text-right font-mono font-medium ${
                          stat.growth.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.growth}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pairs">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardHeader>
              <CardTitle className="text-lg">Trading Pair Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trading Pair</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Share</TableHead>
                    <TableHead className="text-right">Fees</TableHead>
                    <TableHead className="text-right">Trades</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pairStats.map((stat) => (
                    <TableRow key={stat.pair}>
                      <TableCell className="font-medium">{stat.pair}</TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.volume}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.percentage}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.fees}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {stat.trades}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traders">
          <Card className="bg-white dark:bg-[#0F0F12]">
            <CardHeader>
              <CardTitle className="text-lg">Top Traders (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Trades</TableHead>
                    <TableHead className="text-right">Fees Paid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTraders.map((trader) => (
                    <TableRow key={trader.rank}>
                      <TableCell className="font-medium">#{trader.rank}</TableCell>
                      <TableCell className="font-mono text-gray-500">
                        {trader.address}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {trader.volume}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {trader.trades}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {trader.fees}
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
