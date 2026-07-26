import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/common/Card'
import { formatCurrency } from '@/utils/formatters'
import type { MonthlyExpense } from '@/utils/expenseCalculations'

export function MonthlyExpenseChart({ data }: { data: MonthlyExpense[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-mist-100">Monthly expenses</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
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
            <Legend wrapperStyle={{ fontSize: 12, color: '#dcdcdc' }} />
            <Bar dataKey="service" name="Service" stackId="a" fill="#6594B1" />
            <Bar dataKey="fuel" name="Fuel" stackId="a" fill="#ddaed3" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
