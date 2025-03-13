"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "00:00", BTC: 42000, ETH: 2800, SOL: 120 },
  { name: "04:00", BTC: 43500, ETH: 2850, SOL: 125 },
  { name: "08:00", BTC: 43200, ETH: 2830, SOL: 123 },
  { name: "12:00", BTC: 44000, ETH: 2900, SOL: 130 },
  { name: "16:00", BTC: 45000, ETH: 3000, SOL: 135 },
  { name: "20:00", BTC: 44800, ETH: 2950, SOL: 132 },
  { name: "24:00", BTC: 45500, ETH: 3050, SOL: 138 },
]

export function MarketOverview() {
  return (
    <Card className="bg-black border border-border">
      <CardHeader>
        <CardTitle className="text-white">Market Overview</CardTitle>
        <CardDescription className="text-white">Live market data from major exchanges</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crypto">
          <TabsList className="mb-4 bg-muted">
            <TabsTrigger
              value="crypto"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white"
            >
              Crypto
            </TabsTrigger>
            <TabsTrigger
              value="stocks"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white"
            >
              Stocks
            </TabsTrigger>
            <TabsTrigger
              value="forex"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white"
            >
              Forex
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crypto">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="BTC"
                    stroke="#f7931a"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ETH"
                    stroke="#627eea"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="SOL"
                    stroke="#00ff00"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="stocks">
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-white">Stock market data coming soon</p>
            </div>
          </TabsContent>
          <TabsContent value="forex">
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-white">Forex market data coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}