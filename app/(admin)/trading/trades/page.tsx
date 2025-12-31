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

// Mock data
const trades = [
  {
    id: "1",
    tradingPair: "BTCUSDT",
    direction: "Buy",
    price: "43250.50",
    quantity: "0.5",
    amount: "21625.25",
    makerAddress: "0x1234...5678",
    takerAddress: "0xabcd...ef01",
    makerFee: "4.33",
    takerFee: "10.81",
    createdAt: "2024-12-31 14:30:25",
  },
  {
    id: "2",
    tradingPair: "ETHUSDT",
    direction: "Sell",
    price: "2350.00",
    quantity: "10",
    amount: "23500.00",
    makerAddress: "0x9876...5432",
    takerAddress: "0xfedc...ba98",
    makerFee: "4.70",
    takerFee: "11.75",
    createdAt: "2024-12-31 14:28:15",
  },
  {
    id: "3",
    tradingPair: "SOLUSDT",
    direction: "Buy",
    price: "108.25",
    quantity: "500",
    amount: "54125.00",
    makerAddress: "0x5678...1234",
    takerAddress: "0x1234...5678",
    makerFee: "10.83",
    takerFee: "27.06",
    createdAt: "2024-12-31 14:25:00",
  },
];

export default function TradesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trade Records
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View and export all trade history
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
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
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
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
          <CardTitle className="text-lg">Trade List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade ID</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Maker</TableHead>
                <TableHead>Taker</TableHead>
                <TableHead className="text-right">Fees</TableHead>
                <TableHead>Time</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-mono text-sm">
                    #{trade.id}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{trade.tradingPair}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={trade.direction === "Buy" ? "default" : "destructive"}
                      className={
                        trade.direction === "Buy"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {trade.direction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${trade.price}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {trade.quantity}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ${trade.amount}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-500">
                    {trade.makerAddress}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-500">
                    {trade.takerAddress}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <div className="text-gray-500">M: ${trade.makerFee}</div>
                    <div className="text-gray-500">T: ${trade.takerFee}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {trade.createdAt}
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
