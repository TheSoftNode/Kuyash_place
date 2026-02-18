'use client';

import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete';
  item: string;
  category?: string;
  timestamp: Date;
  user?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'create': return <Plus className="w-3.5 h-3.5" />;
      case 'update': return <Edit className="w-3.5 h-3.5" />;
      case 'delete': return <Trash2 className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-emerald-600';
      case 'update': return 'bg-[#e8281e]';
      case 'delete': return 'bg-[#7a100d]';
      default: return 'bg-[#2a2a2a]';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-5 bg-[#e8281e] rounded-full" />
        <h3 className="text-base font-semibold text-white">Recent Activity</h3>
      </div>
      <ScrollArea className="h-[280px]">
        <div className="space-y-4 pr-2">
          {activities.length === 0 ? (
            <p className="text-[#555] text-sm text-center py-8">No recent activity</p>
          ) : activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className="flex items-start gap-3"
            >
              <div className={`w-7 h-7 rounded-full ${getColor(activity.type)} flex items-center justify-center text-white flex-shrink-0 mt-0.5`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium leading-snug">
                  <span className="capitalize">{activity.type}d</span> {activity.item}
                </p>
                {activity.category && (
                  <Badge className="mt-1 bg-[#e8281e]/10 text-[#e8281e] border-[#e8281e]/20 text-[10px] px-1.5 py-0">
                    {activity.category}
                  </Badge>
                )}
                <p className="text-[10px] text-[#555] mt-1">
                  {formatTime(activity.timestamp)} · {activity.user || 'Admin'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
