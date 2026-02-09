'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuItem } from '@/lib/types/menu';
import { useCategories } from '@/lib/hooks/useCategories';
import { Loader2 } from 'lucide-react';

interface MenuItemModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<MenuItem>) => Promise<void>;
  item?: MenuItem | null;
}

export function MenuItemModal({ open, onClose, onSave, item }: MenuItemModalProps) {
  const { categories, loading: categoriesLoading } = useCategories(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description || '',
        available: item.available,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        category: categories[0]?.id || '',
        description: '',
        available: true,
      });
    }
  }, [item, categories, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₦) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="available">Availability *</Label>
              <Select
                value={formData.available ? 'true' : 'false'}
                onValueChange={(value) => setFormData({ ...formData, available: value === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || categoriesLoading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {item ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
