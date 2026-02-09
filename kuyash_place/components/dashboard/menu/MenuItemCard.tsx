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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`p-4 rounded-xl border transition-all duration-200 ${isDragging ? 'border-[#c8a84b] shadow-lg shadow-[#c8a84b]/20 bg-[#222]' : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#c8a84b]/40'}`}>
        <div className="flex items-start gap-4">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing pt-2">
            <GripVertical className="w-5 h-5 text-[#444]" />
          </div>

          {/* Image */}
          <div className="w-16 h-16 bg-[#222] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#333]">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-2xl">🍽️</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                {item.description && (
                  <p className="text-xs text-[#888] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#999] hover:text-[#c8a84b] hover:bg-[#2a2a2a]"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#999] hover:text-red-400 hover:bg-[#2a2a2a]"
                  onClick={() => onDelete(item)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-[#c8a84b]">₦{item.price.toLocaleString()}</span>
              <Badge className={`text-xs ${item.available ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' : 'bg-[#2a2a2a] text-[#666] border-[#333]'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
