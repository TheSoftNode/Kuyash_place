'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryChartProps {
  data: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
}

const COLORS = ['#c8a84b', '#d4b86a', '#a08830', '#e8d080', '#7a6820', '#b89640', '#ddc878', '#906820', '#f0e098', '#604810'];

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Items by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#c8a84b"
            dataKey="count"
            nameKey="category"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#999' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
