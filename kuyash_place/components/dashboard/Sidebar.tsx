'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Menu Management', href: '/dashboard/menu', icon: UtensilsCrossed },
  { label: 'View Public Menu', href: '/menu/view', icon: ExternalLink },
  { label: 'QR Code', href: '/dashboard/qr', icon: QrCode },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
}

export function Sidebar({ isOpen, isCollapsed, onToggle, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full z-50 transition-all duration-300 flex flex-col',
          'bg-[#111111] text-white border-r border-[#2a2a2a]',
          'md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'w-[70px]' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          'flex items-center justify-between border-b border-[#2a2a2a]',
          isCollapsed ? 'h-14 px-2 flex-col justify-center gap-1' : 'h-16 px-3'
        )}>
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/KUYASH_NORMAL_UPGRADED.png"
                  alt="Kuyash Place"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-white uppercase tracking-[0.2em] font-bold block">Admin Panel</span>
                <div className="w-5 h-[2px] bg-[#e8281e] rounded-full mt-0.5" />
              </div>
            </Link>
          )}

          {isCollapsed && (
            <Link href="/dashboard" className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/KUYASH_NORMAL_UPGRADED.png"
                alt="Kuyash Place"
                fill
                className="object-contain"
              />
            </Link>
          )}

          {/* Mobile Close */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden text-[#888] hover:text-white hover:bg-[#2a2a2a] flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Desktop Collapse */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className="hidden md:flex text-[#888] hover:text-white hover:bg-[#2a2a2a] flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className="hidden md:flex text-[#888] hover:text-white hover:bg-[#2a2a2a] w-6 h-6"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-[#e8281e] text-white shadow-md shadow-[#e8281e]/20'
                      : 'text-[#666] hover:bg-[#1e1e1e] hover:text-white'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={cn('flex-shrink-0', isCollapsed ? 'w-4 h-4 mx-auto' : 'w-4 h-4')} />
                  {!isCollapsed && <span className="font-medium text-[13px]">{item.label}</span>}
                  {isActive && !isCollapsed && <div className="ml-auto w-1 h-1 rounded-full bg-white/60" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className={cn('px-2 py-2 border-t border-[#2a2a2a]', isCollapsed ? 'flex justify-center' : '')}>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
              'flex items-center gap-2.5 rounded-lg transition-all duration-200 text-[#555] hover:text-white hover:bg-[#1e1e1e]',
              isCollapsed ? 'w-9 h-9 justify-center' : 'w-full px-2.5 py-2'
            )}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
            {!isCollapsed && <span className="text-[13px] font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>

        {/* Bottom accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#e8281e] to-transparent opacity-40" />
      </aside>
    </>
  );
}
