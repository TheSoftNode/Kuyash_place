'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Instagram, Search, Sun, Moon, ChevronDown, LayoutList, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useMenu } from '@/lib/hooks/useMenu';
import { useCategories } from '@/lib/hooks/useCategories';
import { useSettings } from '@/lib/hooks/useSettings';
import { useTheme } from 'next-themes';

export default function MenuViewPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { theme, setTheme } = useTheme();
  const isDark = theme !== 'light';
  const [catOpen, setCatOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { items, loading } = useMenu({
    available: true,
    search: search || undefined,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    limit: 500,
  });

  const { categories } = useCategories(true);
  const { settings } = useSettings();

  const groupedItems = categories.reduce((acc, category) => {
    acc[category.id] = items.filter((item) => item.category === category.id);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#f5f5f5] text-[#111]'}`}>

      {/* ── Header ── */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0d0d0d]/95 border-[#1e1e1e]' : 'bg-white/95 border-[#e8e8e8]'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>

            {/* Mobile */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#555] hover:text-[#e8281e]' : 'bg-[#f0f0f0] border border-[#e0e0e0] text-[#aaa] hover:text-[#e8281e]'}`}>
                  {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                </button>
                <div className="flex flex-col items-center">
                  <div className="relative w-10 h-10">
                    <Image src="/KUYASH_NORMAL_UPGRADED.png" alt="Kuyash Place" fill className="object-contain drop-shadow-lg" />
                  </div>
                  <div className="w-5 h-[2px] bg-[#e8281e] rounded-full mt-1" />
                  <p className={`text-[7px] uppercase tracking-[0.2em] font-bold mt-0.5 ${isDark ? 'text-[#3a3a3a]' : 'text-[#ccc]'}`}>Restaurant Menu</p>
                </div>
                <div className="w-7" />
              </div>
              <div className="relative">
                <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 ${isDark ? 'text-[#444]' : 'text-[#ccc]'}`} />
                <Input placeholder="Search menu items..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className={`pl-8 h-8 text-xs rounded-lg ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#333] focus-visible:border-[#e8281e]' : 'bg-[#f0f0f0] border-[#e0e0e0] text-[#111] placeholder:text-[#bbb] focus-visible:border-[#e8281e]'}`} />
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image src="/KUYASH_NORMAL_UPGRADED.png" alt="Kuyash Place" fill className="object-contain" />
              </div>
              <div className={`w-px h-7 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#e0e0e0]'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-[7px] uppercase tracking-[0.2em] font-bold mb-0.5 ${isDark ? 'text-[#3a3a3a]' : 'text-[#ccc]'}`}>Restaurant Menu</p>
                <div className={`flex flex-wrap gap-x-3 text-[10px] ${isDark ? 'text-[#555]' : 'text-[#aaa]'}`}>
                  {settings?.phone && <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-[#e8281e] transition-colors"><Phone className="w-2.5 h-2.5" />{settings.phone}</a>}
                  {settings?.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-1 hover:text-[#e8281e] transition-colors"><Mail className="w-2.5 h-2.5" />{settings.email}</a>}
                  {settings?.instagram && <a href={`https://instagram.com/${settings.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#e8281e] transition-colors"><Instagram className="w-2.5 h-2.5" />{settings.instagram}</a>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="relative w-44 md:w-56">
                  <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 ${isDark ? 'text-[#444]' : 'text-[#ccc]'}`} />
                  <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className={`pl-8 h-8 text-xs rounded-lg ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#333] focus-visible:border-[#e8281e]' : 'bg-[#f0f0f0] border-[#e0e0e0] text-[#111] placeholder:text-[#bbb] focus-visible:border-[#e8281e]'}`} />
                </div>
                <button onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center transition-all ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#555] hover:text-[#e8281e]' : 'bg-[#f0f0f0] border border-[#e0e0e0] text-[#aaa] hover:text-[#e8281e]'}`}>
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>

          {/* ── Controls row: Category bar + View toggle ── */}
          <div className="flex items-stretch gap-2 mb-4 sm:mb-5">

            {/* Collapsible Category Bar */}
            <div className={`flex-1 rounded-2xl overflow-hidden transition-all duration-300 ${
              isDark ? 'bg-[#141414] border border-[#222] shadow-lg shadow-black/40' : 'bg-white border border-[#e8e8e8] shadow-md shadow-black/5'
            }`}>
              <button onClick={() => setCatOpen(o => !o)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors duration-200 ${isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-[#fafafa]'}`}>
                <span className={`text-[9px] uppercase tracking-[0.18em] font-bold flex-shrink-0 ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`}>Category</span>
                <div className={`w-px h-4 flex-shrink-0 ${isDark ? 'bg-[#222]' : 'bg-[#eee]'}`} />
                <div className="flex items-center gap-1 bg-[#e8281e] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow shadow-[#e8281e]/30 flex-shrink-0">
                  <span className="text-sm leading-none">{selectedCategory === 'all' ? '🍽️' : categories.find(c => c.id === selectedCategory)?.icon}</span>
                  <span className="tracking-wide leading-none">{selectedCategory === 'all' ? 'All Items' : categories.find(c => c.id === selectedCategory)?.label}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
                  {[{ id: 'all', icon: '🍽️' }, ...categories].filter(c => c.id !== selectedCategory).slice(0, 6).map((c, i) => (
                    <span key={c.id} className="text-base leading-none flex-shrink-0" style={{ opacity: Math.max(0.2, 0.9 - i * 0.13) }}>{c.icon}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isDark ? 'bg-[#1e1e1e] text-[#444]' : 'bg-[#f0f0f0] text-[#bbb]'}`}>{categories.length + 1}</span>
                  <motion.div animate={{ rotate: catOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className={`w-4 h-4 ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`} />
                  </motion.div>
                </div>
              </button>

              <motion.div initial={false} animate={{ height: catOpen ? 'auto' : 0, opacity: catOpen ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                <div className={`border-t p-2 ${isDark ? 'border-[#1e1e1e]' : 'border-[#f0f0f0]'}`}>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-1">
                    {[{ id: 'all', icon: '🍽️', label: 'All' }, ...categories].map((cat) => (
                      <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setCatOpen(false); }}
                        className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200 ${
                          selectedCategory === cat.id ? 'bg-[#e8281e] text-white shadow-md shadow-[#e8281e]/25'
                          : isDark ? 'text-[#555] hover:bg-[#1e1e1e] hover:text-[#ccc]' : 'text-[#bbb] hover:bg-[#f5f5f5] hover:text-[#555]'}`}>
                        <span className="text-base leading-none">{cat.icon}</span>
                        <span className="leading-none text-center line-clamp-1">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* View Toggle */}
            <div className={`flex flex-col rounded-2xl overflow-hidden border flex-shrink-0 ${isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-[#e8e8e8]'}`}>
              <button onClick={() => setViewMode('list')} title="List view"
                className={`flex-1 flex items-center justify-center w-11 transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-[#e8281e] text-white' : isDark ? 'text-[#444] hover:text-[#888]' : 'text-[#ccc] hover:text-[#888]'}`}>
                <LayoutList className="w-4 h-4" />
              </button>
              <div className={`h-px mx-2 ${isDark ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`} />
              <button onClick={() => setViewMode('grid')} title="Grid view"
                className={`flex-1 flex items-center justify-center w-11 transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-[#e8281e] text-white' : isDark ? 'text-[#444] hover:text-[#888]' : 'text-[#ccc] hover:text-[#888]'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Menu Items ── */}
          <TabsContent value={selectedCategory}>
            {loading ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-4 border-[#1e1e1e] border-t-[#e8281e] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#555] text-sm">Loading menu...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={viewMode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {selectedCategory === 'all' ? (
                    <div className={viewMode === 'list' ? 'space-y-6' : 'space-y-8'}>
                      {categories.map((category) => {
                        const categoryItems = groupedItems[category.id];
                        if (!categoryItems || categoryItems.length === 0) return null;
                        return (
                          <section key={category.id}>
                            {/* Category heading — physical menu style */}
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-base">{category.icon}</span>
                              <h2 className={`text-sm sm:text-base font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#111]'}`}>{category.label}</h2>
                            </div>
                            {/* Dotted underline */}
                            <div className="mb-3 w-full" style={{ borderBottom: '2px dotted #8b0000' }} />

                            {viewMode === 'list' ? (
                              <div className="space-y-0">
                                {categoryItems.map((item, i) => (
                                  <MenuItemRow key={item._id} item={item} index={i} currency={settings?.currencySymbol || '₦'} isDark={isDark} />
                                ))}
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                {categoryItems.map((item, i) => (
                                  <MenuItemCard key={item._id} item={item} index={i} currency={settings?.currencySymbol || '₦'} isDark={isDark} />
                                ))}
                              </div>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  ) : viewMode === 'list' ? (
                    <div>
                      {items.map((item, i) => (
                        <MenuItemRow key={item._id} item={item} index={i} currency={settings?.currencySymbol || '₦'} isDark={isDark} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                      {items.map((item, i) => (
                        <MenuItemCard key={item._id} item={item} index={i} currency={settings?.currencySymbol || '₦'} isDark={isDark} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {items.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🍽️</div>
                <p className="text-[#555] text-sm">No items found</p>
                <p className="text-[#333] text-xs mt-1">Try a different search or category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* ── Footer ── */}
      <footer className={`border-t transition-colors duration-300 ${isDark ? 'border-[#1e1e1e]' : 'border-[#e8e8e8]'}`}>
        <div className="container mx-auto px-4">
          {/* Mobile */}
          <div className="sm:hidden py-4 flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/KUYASH_NORMAL_UPGRADED.png" alt="Kuyash Place" fill className={`object-contain ${isDark ? 'opacity-50' : 'opacity-60'}`} />
            </div>
            <div className={`w-px h-8 flex-shrink-0 ${isDark ? 'bg-[#2a2a2a]' : 'bg-[#e8e8e8]'}`} />
            <div className={`flex-1 min-w-0 flex flex-col gap-0.5 text-[11px] ${isDark ? 'text-[#444]' : 'text-[#bbb]'}`}>
              {settings?.phone && <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#e8281e] transition-colors truncate"><Phone className="w-2.5 h-2.5 flex-shrink-0" />{settings.phone}</a>}
              {settings?.email && <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#e8281e] transition-colors truncate"><Mail className="w-2.5 h-2.5 flex-shrink-0" />{settings.email}</a>}
              {settings?.instagram && <a href={`https://instagram.com/${settings.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#e8281e] transition-colors truncate"><Instagram className="w-2.5 h-2.5 flex-shrink-0" />{settings.instagram}</a>}
            </div>
            <p className={`text-[9px] text-right leading-tight flex-shrink-0 max-w-[70px] ${isDark ? 'text-[#2a2a2a]' : 'text-[#ddd]'}`}>© {new Date().getFullYear()}<br />{settings?.name}</p>
          </div>
          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-center gap-3 py-5">
            <div className="relative w-10 h-10">
              <Image src="/KUYASH_NORMAL_UPGRADED.png" alt="Kuyash Place" fill className={`object-contain ${isDark ? 'opacity-40' : 'opacity-60'}`} />
            </div>
            <p className={`text-xs ${isDark ? 'text-[#333]' : 'text-[#bbb]'}`}>© {new Date().getFullYear()} {settings?.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── List Row — physical menu style ── */
interface MenuItemRowProps { item: any; index: number; currency: string; isDark: boolean; }
function MenuItemRow({ item, index, currency, isDark }: MenuItemRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.015 }}
      className={`flex items-baseline justify-between gap-3 py-1.5 border-b transition-colors ${
        isDark ? 'border-[#181818] hover:bg-[#111]/60' : 'border-[#f0f0f0] hover:bg-white/80'
      }`}
    >
      <div className="flex-1 min-w-0">
        <span className="text-[#D4AF37] font-bold text-[12px] uppercase tracking-wide leading-snug">{item.name}</span>
        {item.description && (
          <p className={`text-[10px] line-clamp-1 ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`}>{item.description}</p>
        )}
      </div>
      <div className="flex-1 hidden sm:block" style={{ borderBottom: '1px dotted', borderColor: isDark ? '#222' : '#e0e0e0', marginBottom: '3px', minWidth: '30px', maxWidth: '100px' }} />
      <span className={`font-bold text-[12px] whitespace-nowrap flex-shrink-0 ${isDark ? 'text-white' : 'text-[#111]'}`}>
        {currency}{item.price.toLocaleString()}
      </span>
    </motion.div>
  );
}

/* ── Grid Card ── */
interface MenuItemCardProps { item: any; index: number; currency: string; isDark: boolean; }
function MenuItemCard({ item, index, currency, isDark }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ y: -2 }}
      className={`border rounded-xl overflow-hidden hover:border-[#e8281e]/30 transition-all duration-200 ${
        isDark ? 'bg-[#111111] border-[#1e1e1e]' : 'bg-white border-[#e8e8e8] shadow-sm'
      }`}
    >
      {item.image && (
        <div className={`h-28 sm:h-32 overflow-hidden ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f5f5f5]'}`}>
          <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className={`font-semibold text-[12px] leading-snug flex-1 ${isDark ? 'text-white' : 'text-[#111]'}`}>{item.name}</h3>
          <span className="text-[#e8281e] font-bold text-[12px] whitespace-nowrap flex-shrink-0">{currency}{item.price.toLocaleString()}</span>
        </div>
        {item.description && (
          <p className={`text-[10px] mt-0.5 line-clamp-1 leading-relaxed ${isDark ? 'text-[#444]' : 'text-[#999]'}`}>{item.description}</p>
        )}
      </div>
    </motion.div>
  );
}
