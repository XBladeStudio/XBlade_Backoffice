"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, RefreshCw } from "lucide-react";

// Mock data
const positions = [
  {
    id: "POS001",
    userAddress: "0x1234...5678",
    tradingPair: "BTCUSDT",
    direction: "Long",
    size: "50000.00",
    entryPrice: "43000.00",
    markPrice: "43250.50",
    unrealizedPnl: "+1250.00",
    realizedPnl: "0.00",
    margin: "5000.00",
    leverage: 10,
    liquidationPrice: "39000.00",
    marginRate: "12.5",
    status: "Open",
    riskLevel: "safe",
  },
  {
    id: "POS002",
    userAddress: "0xabcd...ef01",
    tradingPair: "ETHUSDT",
    direction: "Short",
    size: "23500.00",
    entryPrice: "2400.00",
    markPrice: "2350.00",
    unrealizedPnl: "+500.00",
    realizedPnl: "150.00",
    margin: "4700.00",
    leverage: 5,
    liquidationPrice: "2600.00",
    marginRate: "8.2",
    status: "Open",
    riskLevel: "warning",
  },
  {
    id: "POS003",
    userAddress: "0x9876...5432",
    tradingPair: "SOLUSDT",
    direction: "Long",
    size: "108250.00",
    entryPrice: "110.00",
    markPrice: "108.25",
    unrealizedPnl: "-1725.00",
    realizedPnl: "0.00",
    margin: "5412.50",
    leverage: 20,
    liquidationPrice: "104.50",
    marginRate: "3.8",
    status: "Open",
    riskLevel: "danger",
  },
];

const riskColors: Record<string, string> = {
  safe: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

const riskLabels: Record<string, string> = {
  safe: "Safe",
  warning: "Warning",
  danger: "Danger",
};

export default function PositionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Position Monitoring
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor all open positions and risk levels
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Auto Refresh: 5s
        </Button>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Safe Positions
                </p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  156
                </p>
                <p className="text-sm text-green-500">Margin Rate &gt; 10%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                <span className="text-2xl">🟢</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Warning Positions
                </p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                  23
                </p>
                <p className="text-sm text-yellow-500">5% &lt; Margin Rate ≤ 10%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center">
                <span className="text-2xl">🟡</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Danger Positions
                </p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  5
                </p>
                <p className="text-sm text-red-500">Margin Rate ≤ 5%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                <span className="text-2xl">🔴</span>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <SelectValue placeholder="Trading Pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pairs</SelectItem>
                <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                <SelectItem value="SOLUSDT">SOLUSDT</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Long">Long</SelectItem>
                <SelectItem value="Short">Short</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="safe">Safe</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="danger">Danger</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Liquidated">Liquidated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Position List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="text-right">Entry / Mark</TableHead>
                <TableHead className="text-right">Unrealized PnL</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-center">Leverage</TableHead>
                <TableHead className="text-right">Liq. Price</TableHead>
                <TableHead className="text-right">Margin Rate</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell>
                    <Badge className={riskColors[position.riskLevel]}>
                      {riskLabels[position.riskLevel]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-500">
                    {position.userAddress}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{position.tradingPair}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        position.direction === "Long"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {position.direction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${position.size}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <div className="text-gray-900 dark:text-white">
                      ${position.entryPrice}
                    </div>
                    <div className="text-gray-500 text-sm">
                      ${position.markPrice}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono font-medium ${
                      position.unrealizedPnl.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${position.unrealizedPnl}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${position.margin}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{position.leverage}x</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-500">
                    ${position.liquidationPrice}
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono font-medium ${
                      parseFloat(position.marginRate) > 10
                        ? "text-green-600"
                        : parseFloat(position.marginRate) > 5
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {position.marginRate}%
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
