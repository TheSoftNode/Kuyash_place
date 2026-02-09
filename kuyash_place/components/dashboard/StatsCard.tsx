'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  index?: number;
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'gold', index = 0 }: StatsCardProps) {
  const iconBg = {
    gold: 'bg-[#c8a84b] text-[#111111]',
    green: 'bg-emerald-500 text-white',
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    orange: 'bg-[#c8a84b] text-[#111111]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c8a84b]/40 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#999] font-medium uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
          {trend && (
            <p className={cn('text-sm mt-2', trend.isPositive ? 'text-emerald-400' : 'text-red-400')}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', iconBg[color as keyof typeof iconBg] || iconBg.gold)}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </motion.div>
  );
}
