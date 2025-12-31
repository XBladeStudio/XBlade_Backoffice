"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, MoreVertical, Settings, Power, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock data
const markets = [
  {
    symbol: "BTCUSDT",
    baseAsset: "BTC",
    quoteAsset: "USDT",
    status: "active",
    maxLeverage: 100,
    makerFeeRate: "0.02%",
    takerFeeRate: "0.05%",
    minOrderSize: "0.001 BTC",
    pricePrecision: 1,
    sizePrecision: 6,
    volume24h: "$5,602,500",
    createdAt: "2024-01-01",
  },
  {
    symbol: "ETHUSDT",
    baseAsset: "ETH",
    quoteAsset: "USDT",
    status: "active",
    maxLeverage: 50,
    makerFeeRate: "0.02%",
    takerFeeRate: "0.05%",
    minOrderSize: "0.01 ETH",
    pricePrecision: 2,
    sizePrecision: 5,
    volume24h: "$4,357,500",
    createdAt: "2024-01-01",
  },
  {
    symbol: "SOLUSDT",
    baseAsset: "SOL",
    quoteAsset: "USDT",
    status: "active",
    maxLeverage: 25,
    makerFeeRate: "0.02%",
    takerFeeRate: "0.05%",
    minOrderSize: "0.1 SOL",
    pricePrecision: 2,
    sizePrecision: 4,
    volume24h: "$2,490,000",
    createdAt: "2024-01-01",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  maintenance: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
};

export default function MarketsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Market Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Configure trading pairs and market parameters
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Market
        </Button>
      </div>

      {/* Markets Table */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Trading Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Base / Quote</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Max Leverage</TableHead>
                <TableHead className="text-right">Maker Fee</TableHead>
                <TableHead className="text-right">Taker Fee</TableHead>
                <TableHead className="text-right">Min Order</TableHead>
                <TableHead className="text-center">Precision</TableHead>
                <TableHead className="text-right">24h Volume</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {markets.map((market) => (
                <TableRow key={market.symbol}>
                  <TableCell className="font-medium">
                    <Badge variant="outline" className="text-sm">
                      {market.symbol}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900 dark:text-white">
                      {market.baseAsset}
                    </span>
                    <span className="text-gray-400"> / {market.quoteAsset}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[market.status]}>
                      {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{market.maxLeverage}x</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {market.makerFeeRate}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {market.takerFeeRate}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {market.minOrderSize}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-500">
                    P: {market.pricePrecision} / S: {market.sizePrecision}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {market.volume24h}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/markets/${market.symbol}`} className="gap-2">
                            <Settings className="h-4 w-4" />
                            Configure
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Power className="h-4 w-4" />
                          {market.status === "active" ? "Disable" : "Enable"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
