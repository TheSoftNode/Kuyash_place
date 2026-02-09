'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CategoryInfo } from '@/lib/types/menu';
import { Loader2 } from 'lucide-react';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<CategoryInfo>) => Promise<void>;
  category?: CategoryInfo | null;
}

export function CategoryModal({ open, onClose, onSave, category }: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CategoryInfo>>({
    id: '',
    label: '',
    icon: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        label: category.label,
        icon: category.icon,
        description: category.description || '',
        isActive: category.isActive,
      });
    } else {
      setFormData({
        id: '',
        label: '',
        icon: '',
        description: '',
        isActive: true,
      });
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.id || !formData.label || !formData.icon) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">Category ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toUpperCase().replace(/\s+/g, '_') })}
                placeholder="e.g., DRINKS or DESSERTS"
                required
                disabled={!!category}
                className="uppercase"
              />
              <p className="text-xs text-gray-500">Unique identifier (uppercase, no spaces)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Display Name *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Drinks or Desserts"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji) *</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🍹 or 🍰"
                required
                maxLength={2}
              />
              <p className="text-xs text-gray-500">
                Use emoji: 🍕 🍔 🍟 🌮 🍣 🍜 🍝 🥗 🍰 🍹 ☕
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category (optional)"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active (show in menu)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {category ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
