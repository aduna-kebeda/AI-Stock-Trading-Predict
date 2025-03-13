"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

const trades = [
  {
    id: "TR-1234",
    asset: "BTC/USDT",
    type: "buy",
    amount: "0.25 BTC",
    price: "$44,250.00",
    value: "$11,062.50",
    time: "2 minutes ago",
    status: "completed",
  },
  {
    id: "TR-1233",
    asset: "ETH/USDT",
    type: "sell",
    amount: "5.0 ETH",
    price: "$2,950.00",
    value: "$14,750.00",
    time: "15 minutes ago",
    status: "completed",
  },
  {
    id: "TR-1232",
    asset: "SOL/USDT",
    type: "buy",
    amount: "50.0 SOL",
    price: "$135.75",
    value: "$6,787.50",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: "TR-1231",
    asset: "AAPL",
    type: "buy",
    amount: "10 shares",
    price: "$175.25",
    value: "$1,752.50",
    time: "3 hours ago",
    status: "completed",
  },
  {
    id: "TR-1230",
    asset: "BTC/USDT",
    type: "sell",
    amount: "0.15 BTC",
    price: "$43,800.00",
    value: "$6,570.00",
    time: "5 hours ago",
    status: "completed",
  },
]

export function RecentTrades() {
  return (
    <Card className="bg-black border border-border">
      <CardHeader>
        <CardTitle className="text-white">Recent Trades</CardTitle>
        <CardDescription className="text-white">Your most recent trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-white">ID</TableHead>
              <TableHead className="text-white">Asset</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Value</TableHead>
              <TableHead className="text-white">Time</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} className="border-border">
                <TableCell className="font-medium text-white">{trade.id}</TableCell>
                <TableCell className="text-white">{trade.asset}</TableCell>
                <TableCell>
                  <Badge
                    variant={trade.type === "buy" ? "default" : "secondary"}
                    className={trade.type === "buy" ? "bg-primary text-primary-foreground" : "text-white"}
                  >
                    {trade.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">{trade.amount}</TableCell>
                <TableCell className="text-white">{trade.price}</TableCell>
                <TableCell className="text-white">{trade.value}</TableCell>
                <TableCell className="text-white">{trade.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                    {trade.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}