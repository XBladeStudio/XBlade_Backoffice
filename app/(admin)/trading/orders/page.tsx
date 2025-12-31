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
import { Search, ExternalLink } from "lucide-react";

// Mock data
const orders = [
  {
    id: "ORD001",
    userAddress: "0x1234...5678",
    tradingPair: "BTCUSDT",
    orderType: "Limit",
    direction: "Buy",
    price: "43000.00",
    markPrice: "43250.50",
    quantity: "1.0",
    filledQuantity: "0.5",
    leverage: 10,
    status: "Open",
    createdAt: "2024-12-31 14:30:25",
  },
  {
    id: "ORD002",
    userAddress: "0xabcd...ef01",
    tradingPair: "ETHUSDT",
    orderType: "Market",
    direction: "Sell",
    price: "-",
    markPrice: "2350.00",
    quantity: "5.0",
    filledQuantity: "5.0",
    leverage: 5,
    status: "Filled",
    createdAt: "2024-12-31 14:28:15",
  },
  {
    id: "ORD003",
    userAddress: "0x9876...5432",
    tradingPair: "SOLUSDT",
    orderType: "Limit",
    direction: "Buy",
    price: "105.00",
    markPrice: "108.25",
    quantity: "100",
    filledQuantity: "0",
    leverage: 20,
    status: "Pending",
    createdAt: "2024-12-31 14:25:00",
  },
  {
    id: "ORD004",
    userAddress: "0xfedc...ba98",
    tradingPair: "BTCUSDT",
    orderType: "Limit",
    direction: "Sell",
    price: "44000.00",
    markPrice: "43250.50",
    quantity: "0.2",
    filledQuantity: "0",
    leverage: 15,
    status: "Cancelled",
    createdAt: "2024-12-31 14:20:00",
  },
];

const statusColors: Record<string, string> = {
  Pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Open: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  PartiallyFilled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
  Filled: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Order Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View and manage all orders
        </p>
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Filled">Filled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Limit">Limit</SelectItem>
                <SelectItem value="Market">Market</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white dark:bg-[#0F0F12]">
        <CardHeader>
          <CardTitle className="text-lg">Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Mark Price</TableHead>
                <TableHead className="text-right">Qty / Filled</TableHead>
                <TableHead className="text-center">Leverage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-500">
                    {order.userAddress}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.tradingPair}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{order.orderType}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.direction === "Buy"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {order.direction}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {order.price}
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-500">
                    ${order.markPrice}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span className="text-gray-900 dark:text-white">
                      {order.filledQuantity}
                    </span>
                    <span className="text-gray-400"> / {order.quantity}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{order.leverage}x</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {order.createdAt}
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
