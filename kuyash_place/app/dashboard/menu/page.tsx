'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCard } from '@/components/dashboard/menu/MenuItemCard';
import { MenuItemModal } from '@/components/dashboard/modals/MenuItemModal';
import { DeleteConfirmModal } from '@/components/dashboard/modals/DeleteConfirmModal';
import { useMenu } from '@/lib/hooks/useMenu';
import { useCategories } from '@/lib/hooks/useCategories';
import { MenuItem } from '@/lib/types/menu';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function MenuManagementPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);

  const { items, loading, createItem, updateItem, deleteItem, reorderItems, refetch } = useMenu({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    search: search || undefined,
  });

  const { categories } = useCategories(true);

  const handleAddClick = () => {
    setEditingItem(null);
    setItemModalOpen(true);
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item);
    setItemModalOpen(true);
  };

  const handleDeleteClick = (item: MenuItem) => {
    setDeletingItem(item);
    setDeleteModalOpen(true);
  };

  const handleSave = async (data: Partial<MenuItem>) => {
    try {
      if (editingItem?._id) {
        await updateItem(editingItem._id, data);
        toast.success('Menu item updated successfully');
      } else {
        await createItem(data);
        toast.success('Menu item created successfully');
      }
    } catch (error) {
      toast.error('Failed to save menu item');
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deletingItem?._id) return;
    try {
      await deleteItem(deletingItem._id);
      toast.success('Menu item deleted successfully');
      setDeleteModalOpen(false);
      setDeletingItem(null);
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    const updates = reorderedItems.map((item, index) => ({
      id: item._id!,
      order: index,
    }));

    try {
      await reorderItems(updates);
      toast.success('Items reordered successfully');
    } catch (error) {
      toast.error('Failed to reorder items');
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant menu items</p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs by Category */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full overflow-x-auto flex-wrap h-auto">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          {categories.map((cat) => {
            const count = items.filter((item) => item.category === cat.id).length;
            return (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.icon} {cat.label} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No items found</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="menu-items">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id!} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <MenuItemCard
                              item={item}
                              onEdit={handleEditClick}
                              onDelete={handleDeleteClick}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <MenuItemModal
        open={itemModalOpen}
        onClose={() => {
          setItemModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        item={editingItem}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingItem(null);
        }}
        onConfirm={handleDelete}
        title="Delete Menu Item"
        description={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
