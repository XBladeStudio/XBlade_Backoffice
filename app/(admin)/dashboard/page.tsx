"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Wallet,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with API calls
const metrics = [
  {
    title: "Today's Volume",
    value: "$12,450,000",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Today's Fees",
    value: "$24,900",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Users (24h)",
    value: "1,234",
    change: "+5.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Position Value",
    value: "$45,600,000",
    change: "-2.3%",
    trend: "down",
    icon: Wallet,
  },
  {
    title: "Platform Balance",
    value: "$89,100,000",
    change: "+1.8%",
    trend: "up",
    icon: Receipt,
  },
  {
    title: "Pending Commission",
    value: "$156,000",
    change: "+15.2%",
    trend: "up",
    icon: Receipt,
  },
];

const alerts = [
  {
    id: 1,
    type: "liquidation_warning",
    priority: "high",
    message: "Position margin rate below 5% for user 0x1234...5678",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "large_trade",
    priority: "medium",
    message: "Large trade detected: $500,000 BTCUSDT Long",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "price_deviation",
    priority: "high",
    message: "ETHUSDT Mark Price deviation > 2% from Index",
    time: "32 min ago",
  },
];

const topTraders = [
  { address: "0x1234...5678", volume: "$2,450,000", trades: 156 },
  { address: "0xabcd...ef01", volume: "$1,890,000", trades: 89 },
  { address: "0x9876...5432", volume: "$1,234,000", trades: 234 },
  { address: "0xfedc...ba98", volume: "$987,000", trades: 67 },
  { address: "0x5678...1234", volume: "$756,000", trades: 123 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of platform metrics and real-time alerts
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-white dark:bg-[#0F0F12]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm ${
                        metric.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-[#1F1F23]">
                  <metric.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart Placeholder */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Trading Volume Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              {/* Chart component will be added here */}
              <p>Volume chart placeholder</p>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Alerts */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Real-time Alerts
            </CardTitle>
            <Badge variant="destructive">{alerts.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23]"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.priority === "high"
                        ? "bg-red-500"
                        : alert.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Pair Distribution and Top Traders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Pair Distribution */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Trading Pair Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { pair: "BTCUSDT", percentage: 45, volume: "$5,602,500" },
                { pair: "ETHUSDT", percentage: 35, volume: "$4,357,500" },
                { pair: "SOLUSDT", percentage: 20, volume: "$2,490,000" },
              ].map((item) => (
                <div key={item.pair} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.pair}
                    </span>
                    <span className="text-gray-500">{item.volume}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-[#1F1F23] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Traders */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Top Traders (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTraders.map((trader, index) => (
                <div
                  key={trader.address}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-[#1F1F23] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      {trader.address}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {trader.volume}
                    </p>
                    <p className="text-xs text-gray-500">
                      {trader.trades} trades
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
