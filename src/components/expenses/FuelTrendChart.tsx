import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/common/Card'
import { formatCurrency } from '@/utils/formatters'

interface FuelTrendPoint {
  label: string
  cost: number
}

export function FuelTrendChart({ data }: { data: FuelTrendPoint[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-mist-100">Fuel spending trend</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#a3a3a3' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#182c3c',
                fontSize: 12,
                color: '#fbfbfb',
              }}
              labelStyle={{ color: '#fbfbfb' }}
            />
            <Line type="monotone" dataKey="cost" stroke="#ddaed3" strokeWidth={3} dot={{ r: 4, fill: '#ddaed3' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
