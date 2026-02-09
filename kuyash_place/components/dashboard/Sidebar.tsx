'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#2a2a2a]">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#c8a84b] rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-[#111111]" />
              </div>
              <span className="font-bold text-lg text-white">Kuyash Place</span>
            </div>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 bg-[#c8a84b] rounded-lg flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-5 h-5 text-[#111111]" />
            </div>
          )}

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden text-white hover:bg-[#2a2a2a]"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Desktop Collapse Button */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className="hidden md:flex text-[#999] hover:text-white hover:bg-[#2a2a2a]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Collapsed expand button */}
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            className="hidden md:flex mx-auto mt-2 text-[#999] hover:text-white hover:bg-[#2a2a2a]"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-[#c8a84b] text-[#111111] font-semibold'
                      : 'text-[#999999] hover:bg-[#1e1e1e] hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom border accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#c8a84b] via-[#d4b86a] to-[#c8a84b] opacity-60" />
      </aside>
    </>
  );
}
