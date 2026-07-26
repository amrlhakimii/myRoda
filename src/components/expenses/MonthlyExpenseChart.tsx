import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/common/Card'
import { formatCurrency } from '@/utils/formatters'
import type { MonthlyExpense } from '@/utils/expenseCalculations'

export function MonthlyExpenseChart({ data }: { data: MonthlyExpense[] }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-navy-800">Monthly expenses</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid vertical={false} stroke="#EEEEEE" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#517997' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#517997' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ borderRadius: 12, border: '1px solid #EEEEEE', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="service" name="Service" stackId="a" fill="#213C51" />
            <Bar dataKey="fuel" name="Fuel" stackId="a" fill="#6594B1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
