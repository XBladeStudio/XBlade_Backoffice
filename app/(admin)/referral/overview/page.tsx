"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

// Mock data
const metrics = [
  {
    title: "Total Referrers",
    value: "1,234",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Total Referred Users",
    value: "5,678",
    change: "+18%",
    icon: Users,
  },
  {
    title: "Total Commission Paid",
    value: "$456,789",
    change: "+25%",
    icon: DollarSign,
  },
  {
    title: "Pending Commission",
    value: "$156,000",
    change: "+8%",
    icon: Clock,
  },
  {
    title: "This Month Commission",
    value: "$78,500",
    change: "+32%",
    icon: TrendingUp,
  },
];

const topReferrers = [
  { address: "0x1234...5678", referrals: 45, volume: "$2,450,000", commission: "$12,250" },
  { address: "0xabcd...ef01", referrals: 38, volume: "$1,890,000", commission: "$9,450" },
  { address: "0x9876...5432", referrals: 32, volume: "$1,234,000", commission: "$6,170" },
  { address: "0xfedc...ba98", referrals: 28, volume: "$987,000", commission: "$4,935" },
  { address: "0x5678...1234", referrals: 25, volume: "$756,000", commission: "$3,780" },
];

export default function ReferralOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Referral Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor referral program performance and metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <p className="text-sm text-green-500 mt-1">{metric.change} vs last month</p>
                </div>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-[#1F1F23]">
                  <metric.icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Top Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Trend Chart */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Commission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              Commission trend chart placeholder
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card className="bg-white dark:bg-[#0F0F12]">
          <CardHeader>
            <CardTitle className="text-lg">Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topReferrers.map((referrer, index) => (
                <div
                  key={referrer.address}
                  className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1F1F23] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">
                        {referrer.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {referrer.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      {referrer.commission}
                    </p>
                    <p className="text-xs text-gray-500">{referrer.volume} volume</p>
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
