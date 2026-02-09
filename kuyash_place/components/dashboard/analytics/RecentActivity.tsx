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
      case 'create': return <Plus className="w-4 h-4" />;
      case 'update': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-emerald-600';
      case 'update': return 'bg-[#c8a84b]';
      case 'delete': return 'bg-red-600';
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
      <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-full ${getColor(activity.type)} flex items-center justify-center text-white flex-shrink-0`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  <span className="capitalize">{activity.type}d</span> {activity.item}
                </p>
                {activity.category && (
                  <Badge variant="outline" className="mt-1 border-[#c8a84b]/40 text-[#c8a84b] text-xs">
                    {activity.category}
                  </Badge>
                )}
                <p className="text-xs text-[#666] mt-1">
                  {formatTime(activity.timestamp)} • {activity.user || 'Admin'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
