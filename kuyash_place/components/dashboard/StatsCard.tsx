'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  color?: string;
  index?: number;
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'red', index = 0 }: StatsCardProps) {
  const iconStyles: Record<string, string> = {
    red:    'bg-[#e8281e] text-white shadow-lg shadow-[#e8281e]/30',
    green:  'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30',
    blue:   'bg-blue-600 text-white shadow-lg shadow-blue-600/30',
    purple: 'bg-purple-600 text-white shadow-lg shadow-purple-600/30',
    orange: 'bg-orange-600 text-white shadow-lg shadow-orange-600/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#e8281e]/30 hover:shadow-lg hover:shadow-[#e8281e]/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#666] font-semibold uppercase tracking-widest mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && (
            <p className={cn('text-xs mt-2 font-medium', trend.isPositive ? 'text-emerald-400' : 'text-red-400')}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconStyles[color] || iconStyles.red)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
