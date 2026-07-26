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
      <h3 className="text-sm font-bold text-navy-800">Fuel spending trend</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid vertical={false} stroke="#EEEEEE" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#517997' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#517997' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ borderRadius: 12, border: '1px solid #EEEEEE', fontSize: 12 }}
            />
            <Line type="monotone" dataKey="cost" stroke="#DDAED3" strokeWidth={3} dot={{ r: 4, fill: '#DDAED3' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
