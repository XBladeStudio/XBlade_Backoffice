"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, ExternalLink } from "lucide-react";
import Link from "next/link";

// Mock data
const users = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    shortAddress: "0x1234...5678",
    registeredAt: "2024-12-15 10:30:00",
    totalBalance: "125,000.00",
    availableBalance: "100,000.00",
    frozenBalance: "25,000.00",
    totalVolume: "2,450,000.00",
    totalFees: "4,900.00",
    referrerAddress: "0xabcd...ef01",
    referralCode: "REF123",
    referralCount: 12,
    riskStatus: "normal",
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef01",
    shortAddress: "0xabcd...ef01",
    registeredAt: "2024-11-20 15:45:00",
    totalBalance: "89,500.00",
    availableBalance: "65,000.00",
    frozenBalance: "24,500.00",
    totalVolume: "1,890,000.00",
    totalFees: "3,780.00",
    referrerAddress: null,
    referralCode: "REF456",
    referralCount: 45,
    riskStatus: "normal",
  },
  {
    address: "0x9876543210fedcba9876543210fedcba98765432",
    shortAddress: "0x9876...5432",
    registeredAt: "2024-10-05 08:20:00",
    totalBalance: "45,200.00",
    availableBalance: "30,000.00",
    frozenBalance: "15,200.00",
    totalVolume: "1,234,000.00",
    totalFees: "2,468.00",
    referrerAddress: "0x1234...5678",
    referralCode: "REF789",
    referralCount: 3,
    riskStatus: "high_risk",
  },
  {
    address: "0xfedcba9876543210fedcba9876543210fedcba98",
    shortAddress: "0xfedc...ba98",
    registeredAt: "2024-09-12 14:00:00",
    totalBalance: "0.00",
    availableBalance: "0.00",
    frozenBalance: "0.00",
    totalVolume: "987,000.00",
    totalFees: "1,974.00",
    referrerAddress: null,
    referralCode: "REF012",
    referralCount: 0,
    riskStatus: "blacklisted",
  },
];

const riskStatusColors: Record<string, string> = {
  normal: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  high_risk: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  blacklisted: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

const riskStatusLabels: Record<string, string> = {
  normal: "Normal",
  high_risk: "High Risk",
  blacklisted: "Blacklisted",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User List
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and view all registered users
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Users
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by address..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Risk Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high_risk">High Risk</SelectItem>
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Has Referrer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Has Referrer</SelectItem>
                <SelectItem value="no">No Referrer</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Start Date" />
            <Input type="date" placeholder="End Date" />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="text-right">Total Balance</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="text-right">Frozen</TableHead>
                <TableHead className="text-right">Total Volume</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead className="text-center">Referrals</TableHead>
                <TableHead>Risk Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.address}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {user.shortAddress}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.referralCode}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {user.registeredAt}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${user.totalBalance}
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-500">
                    ${user.availableBalance}
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-500">
                    ${user.frozenBalance}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${user.totalVolume}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-500">
                    {user.referrerAddress || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{user.referralCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={riskStatusColors[user.riskStatus]}>
                      {riskStatusLabels[user.riskStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/users/${user.address}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
