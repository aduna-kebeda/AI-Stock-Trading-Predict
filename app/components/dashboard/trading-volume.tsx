"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", volume: 65000 },
  { name: "Feb", volume: 59000 },
  { name: "Mar", volume: 80000 },
  { name: "Apr", volume: 81000 },
  { name: "May", volume: 56000 },
  { name: "Jun", volume: 55000 },
  { name: "Jul", volume: 40000 },
  { name: "Aug", volume: 94000 },
  { name: "Sep", volume: 76000 },
  { name: "Oct", volume: 67000 },
  { name: "Nov", volume: 90000 },
  { name: "Dec", volume: 120000 },
]

export function TradingVolume() {
  return (
    <Card className="bg-black border border-[#00FF00]/30">
      <CardHeader>
        <CardTitle className="text-white">Trading Volume</CardTitle>
        <CardDescription className="text-[#00FF00]/70">Monthly trading volume in USD</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#AAA" />
              <YAxis stroke="#AAA" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #444",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Volume"]}
              />
              <Legend />
              <Bar dataKey="volume" name="Trading Volume" fill="url(#colorVolume)" radius={[8, 8, 8, 8]} />
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
