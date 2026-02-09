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
      <header className="sticky top-0 z-50 bg-[#111111]/95 backdrop-blur-lg border-b border-[#2a2a2a] shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Logo & Title */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c8a84b] rounded-xl flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 text-[#111111]" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#c8a84b] text-center">
                {settings?.name || 'Restaurant Menu'}
              </h1>
            </div>
            <div className="w-12 sm:w-16 h-0.5 bg-[#c8a84b] mx-auto my-2 sm:my-3" />
            {settings?.description && (
              <p className="text-[#888] text-sm sm:text-base mt-2 px-4">{settings.description}</p>
            )}

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-[#888]">
              {settings?.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#c8a84b] transition-colors">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{settings.phone}</span>
                </a>
              )}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#c8a84b] transition-colors">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate max-w-[200px]">{settings.email}</span>
                </a>
              )}
              {settings?.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#c8a84b] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{settings.instagram}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 sm:mt-5 md:mt-6 max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#555]" />
              <Input
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 sm:pl-10 h-10 sm:h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm sm:text-base placeholder:text-[#444] focus-visible:border-[#c8a84b] rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          {/* Category Tabs - Fully Responsive Grid */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-2 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#c8a84b] text-[#111111] shadow-md'
                      : 'bg-transparent text-[#888] hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  All Items
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-[#c8a84b] text-[#111111] shadow-md'
                        : 'bg-transparent text-[#888] hover:bg-[#2a2a2a] hover:text-white'
                    }`}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <TabsContent value={selectedCategory}>
            {loading ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#2a2a2a] border-t-[#c8a84b] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#666] text-sm sm:text-base">Loading menu...</p>
              </div>
            ) : selectedCategory === 'all' ? (
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl sm:text-2xl">{category.icon}</span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                          {category.label}
                        </h2>
                      </div>
                      <div className="w-12 sm:w-16 h-0.5 bg-[#c8a84b] mb-4 sm:mb-6" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                        {categoryItems.map((item, index) => (
                          <MenuItemCard key={item._id} item={item} index={index} currency={settings?.currencySymbol || '₦'} />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {items.map((item, index) => (
                  <MenuItemCard key={item._id} item={item} index={index} currency={settings?.currencySymbol || '₦'} />
                ))}
              </div>
            )}

            {items.length === 0 && !loading && (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="w-8 h-8 sm:w-10 sm:h-10 text-[#444]" />
                </div>
                <p className="text-[#666] text-sm sm:text-base">No items found</p>
                <p className="text-[#444] text-xs sm:text-sm mt-1">Try a different search or category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] mt-8 sm:mt-12 py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center text-xs sm:text-sm text-[#555]">
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
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#c8a84b]/40 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#c8a84b]/5"
    >
      {item.image && (
        <div className="h-40 sm:h-48 overflow-hidden bg-[#0d0d0d]">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
          />
        </div>
      )}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white leading-tight flex-1">
            {item.name}
          </h3>
          <Badge className="bg-[#c8a84b]/20 text-[#c8a84b] border-[#c8a84b]/30 font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
            {currency}{item.price.toLocaleString()}
          </Badge>
        </div>
        {item.description && (
          <p className="text-xs sm:text-sm text-[#888] mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
