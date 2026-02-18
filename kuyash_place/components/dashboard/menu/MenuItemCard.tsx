'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/lib/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  isDragging?: boolean;
}

export function MenuItemCard({ item, onEdit, onDelete, isDragging }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      <div className={`p-4 rounded-xl border transition-all duration-200 ${
        isDragging
          ? 'border-[#e8281e] shadow-lg shadow-[#e8281e]/20 bg-[#1e1e1e]'
          : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#e8281e]/30 hover:bg-[#1e1e1e]'
      }`}>
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing pt-1.5 flex-shrink-0">
            <GripVertical className="w-4 h-4 text-[#333]" />
          </div>

          {/* Image */}
          <div className="w-14 h-14 bg-[#222] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#2a2a2a] overflow-hidden">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl">🍽️</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm text-white leading-snug truncate">{item.name}</h4>
                {item.description && (
                  <p className="text-xs text-[#666] mt-0.5 line-clamp-1">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-[#555] hover:text-[#e8281e] hover:bg-[#2a2a2a]"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-[#555] hover:text-red-400 hover:bg-[#2a2a2a]"
                  onClick={() => onDelete(item)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-sm text-[#e8281e]">₦{item.price.toLocaleString()}</span>
              <Badge className={`text-[10px] px-1.5 py-0 ${
                item.available
                  ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800/50'
                  : 'bg-[#2a2a2a] text-[#555] border-[#333]'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
