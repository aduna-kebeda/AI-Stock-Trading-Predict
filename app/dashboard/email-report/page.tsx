'use client'

import { useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'

export default function EmailReportPage() {
  const [email, setEmail] = useState('')
  const [symbol, setSymbol] = useState('')
  const [period, setPeriod] = useState('3mo')
  const [reportType, setReportType] = useState('summary')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await axios.post('/api/reports/email', {
        email,
        symbol,
        period,
        report_type: reportType,
      })

      setMessage('Message sent')
    } catch (error) {
      console.error('Error:', error)
      setMessage('Message sent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <Card className="bg-black border m-20 mt-4 border-[#00FF00]/30">
        <CardHeader>
          <CardTitle className="text-white">Send Email Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-black border-[#00FF00]/30 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Stock Symbol</label>
              <Input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol"
                className="w-full bg-black border-[#00FF00]/30 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Period</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full bg-black border-[#00FF00]/30 text-white">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#00FF00]/30 text-white">
                  <SelectItem value="1mo">1 Month</SelectItem>
                  <SelectItem value="3mo">3 Months</SelectItem>
                  <SelectItem value="6mo">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-white mb-2">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full bg-black border-[#00FF00]/30 text-white">
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#00FF00]/30 text-white">
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-[#00FF00] text-black py-2 text-lg" disabled={loading}>
              {loading ? 'Sending...' : 'Send Report'}
            </Button>
            {message && <div className="text-white mt-4">{message}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}