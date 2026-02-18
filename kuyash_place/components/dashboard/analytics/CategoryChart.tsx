'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryChartProps {
  data: Array<{ category: string; count: number; percentage: number }>;
}

const COLORS = ['#e8281e', '#ff6b6b', '#cc1f16', '#ff4444', '#991410', '#ff9999', '#ff3333', '#b31c13', '#ffb3b3', '#7a100d'];

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 bg-[#e8281e] rounded-full" />
        <h3 className="text-base font-semibold text-white">Items by Category</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={95}
            fill="#e8281e"
            dataKey="count"
            nameKey="category"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
          <Legend wrapperStyle={{ color: '#888', fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
