'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Search, UtensilsCrossed } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMenu } from '@/lib/hooks/useMenu';
import { useCategories } from '@/lib/hooks/useCategories';
import { useSettings } from '@/lib/hooks/useSettings';

export default function MenuViewPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { items, loading } = useMenu({
    available: true,
    search: search || undefined,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  const { categories } = useCategories(true);
  const { settings } = useSettings();

  const groupedItems = categories.reduce((acc, category) => {
    acc[category.id] = items.filter((item) => item.category === category.id);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-lg border-b border-[#2a2a2a]">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#c8a84b] rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-[#111111]" />
              </div>
              <h1 className="text-4xl font-bold text-[#c8a84b]">
                {settings?.name || 'Restaurant Menu'}
              </h1>
            </div>
            <div className="w-16 h-0.5 bg-[#c8a84b] mx-auto my-3" />
            {settings?.description && (
              <p className="text-[#888] mt-2">{settings.description}</p>
            )}

            {/* Contact Info */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#888]">
              {settings?.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-[#c8a84b] transition-colors">
                  <Phone className="w-4 h-4" />
                  {settings.phone}
                </a>
              )}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-1 hover:text-[#c8a84b] transition-colors">
                  <Mail className="w-4 h-4" />
                  {settings.email}
                </a>
              )}
              {settings?.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#c8a84b] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  {settings.instagram}
                </a>
              )}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
              <Input
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#444] focus-visible:border-[#c8a84b]"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full overflow-x-auto flex flex-wrap h-auto mb-8 bg-[#1a1a1a] border border-[#2a2a2a] p-1 gap-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#c8a84b] data-[state=active]:text-[#111111] text-[#888]">
              All Items
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="data-[state=active]:bg-[#c8a84b] data-[state=active]:text-[#111111] text-[#888]">
                {cat.icon} {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-[#666]">Loading menu...</p>
              </div>
            ) : selectedCategory === 'all' ? (
              <div className="space-y-12">
                {categories.map((category) => {
                  const categoryItems = groupedItems[category.id];
                  if (!categoryItems || categoryItems.length === 0) return null;

                  return (
                    <motion.section
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
                        <span>{category.icon}</span>
                        {category.label}
                      </h2>
                      <div className="w-12 h-0.5 bg-[#c8a84b] mb-6" />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryItems.map((item, index) => (
                          <MenuItemCard key={item._id} item={item} index={index} currency={settings?.currencySymbol || '₦'} />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <MenuItemCard key={item._id} item={item} index={index} currency={settings?.currencySymbol || '₦'} />
                ))}
              </div>
            )}

            {items.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-[#666]">No items found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-[#555]">
          <p>© {new Date().getFullYear()} {settings?.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface MenuItemCardProps {
  item: any;
  index: number;
  currency: string;
}

function MenuItemCard({ item, index, currency }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#c8a84b]/40 transition-all duration-200"
    >
      {item.image && (
        <div className="h-48 overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-white">{item.name}</h3>
          <Badge className="bg-[#c8a84b]/20 text-[#c8a84b] border-[#c8a84b]/30 font-bold">
            {currency}{item.price.toLocaleString()}
          </Badge>
        </div>
        {item.description && (
          <p className="text-sm text-[#888] mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
