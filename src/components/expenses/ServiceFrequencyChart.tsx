import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/common/Card'

interface FrequencyPoint {
  label: string
  count: number
}

export function ServiceFrequencyChart({ data }: { data: FrequencyPoint[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-mist-100">Service frequency</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#a3a3a3' }} axisLine={false} tickLine={false} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#a3a3a3' }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#182c3c',
                fontSize: 12,
                color: '#fbfbfb',
              }}
              labelStyle={{ color: '#fbfbfb' }}
            />
            <Bar dataKey="count" name="Services" fill="#6594b1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
