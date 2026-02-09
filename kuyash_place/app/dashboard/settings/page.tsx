'use client';

import { useState } from 'react';
import { Save, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useSettings } from '@/lib/hooks/useSettings';
import { useCategories } from '@/lib/hooks/useCategories';
import { CategoryModal } from '@/components/dashboard/modals/CategoryModal';
import { DeleteConfirmModal } from '@/components/dashboard/modals/DeleteConfirmModal';
import { toast } from 'sonner';
import { RestaurantSettings } from '@/lib/db/models/Settings';
import { CategoryInfo } from '@/lib/types/menu';

export default function SettingsPage() {
  const { settings, updateSettings, loading: settingsLoading } = useSettings();
  const { categories, createCategory, updateCategory, deleteCategory, loading: categoriesLoading } = useCategories(false);
  const [formData, setFormData] = useState<Partial<RestaurantSettings>>({});
  const [saving, setSaving] = useState(false);

  // Category modal states
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<CategoryInfo | null>(null);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateSettings(formData);
      toast.success('Settings saved successfully');
      setFormData({});
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const getValue = (key: keyof RestaurantSettings) => {
    return formData[key] !== undefined ? formData[key] : settings?.[key] || '';
  };

  // Category handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category: CategoryInfo) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  const handleDeleteCategory = (category: CategoryInfo) => {
    setDeletingCategory(category);
    setDeleteCategoryModalOpen(true);
  };

  const handleSaveCategory = async (data: Partial<CategoryInfo>) => {
    try {
      if (editingCategory?._id) {
        await updateCategory(editingCategory._id, data);
        toast.success('Category updated successfully');
      } else {
        await createCategory(data);
        toast.success('Category created successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save category');
      throw error;
    }
  };

  const handleConfirmDeleteCategory = async () => {
    if (!deletingCategory?._id) return;
    try {
      await deleteCategory(deletingCategory._id);
      toast.success('Category deleted successfully');
      setDeleteCategoryModalOpen(false);
      setDeletingCategory(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete category');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your restaurant settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Restaurant Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    value={getValue('name') as string}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={getValue('phone') as string}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={getValue('email') as string}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={getValue('instagram') as string}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={getValue('address') as string}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={getValue('description') as string}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={getValue('currency') as string}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">Currency Symbol</Label>
                  <Input
                    id="currencySymbol"
                    value={getValue('currencySymbol') as string}
                    onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveSettings} disabled={saving || settingsLoading}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menu Categories</h3>
              <Button size="sm" onClick={handleAddCategory}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>

            {categoriesLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No categories yet. Add your first category!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{category.label}</p>
                          <Badge variant={category.isActive ? 'default' : 'secondary'}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{category.id}</p>
                        {category.description && (
                          <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={getValue('primaryColor') as string}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={getValue('primaryColor') as string}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      placeholder="#1a1a1a"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={getValue('secondaryColor') as string}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={getValue('secondaryColor') as string}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      placeholder="#ea580c"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={getValue('accentColor') as string}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={getValue('accentColor') as string}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="#f97316"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSettings} disabled={saving || settingsLoading}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Modal */}
      <CategoryModal
        open={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      {/* Delete Category Modal */}
      <DeleteConfirmModal
        open={deleteCategoryModalOpen}
        onClose={() => {
          setDeleteCategoryModalOpen(false);
          setDeletingCategory(null);
        }}
        onConfirm={handleConfirmDeleteCategory}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.label}"? This action cannot be undone. Make sure no menu items are using this category.`}
      />
    </div>
  );
}
