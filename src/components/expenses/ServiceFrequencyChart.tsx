import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/common/Card'

interface FrequencyPoint {
  label: string
  count: number
}

export function ServiceFrequencyChart({ data }: { data: FrequencyPoint[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-navy-800">Service frequency</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#EEEEEE" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#517997' }} axisLine={false} tickLine={false} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#517997' }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #EEEEEE', fontSize: 12 }} />
            <Bar dataKey="count" name="Services" fill="#6594B1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
