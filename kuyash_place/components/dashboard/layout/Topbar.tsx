'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSettings } from '@/lib/hooks/useSettings';
import { toast } from 'sonner';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { settings } = useSettings();
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-[#2a2a2a] bg-[#111111] flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-[#888] hover:text-white hover:bg-[#1e1e1e]"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-1 h-6 bg-[#e8281e] rounded-full" />
          <span className="text-white font-semibold text-sm">
            {settings?.name || 'Kuyash Place'}
          </span>
          <span className="text-[#444] text-sm">— Admin Dashboard</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-[#888] hover:text-white hover:bg-[#1e1e1e]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#e8281e] rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1a1a1a] border-[#2a2a2a]">
            <DropdownMenuLabel className="text-[#e8281e] text-xs uppercase tracking-wider">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem className="focus:bg-[#2a2a2a]">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-white">System ready</p>
                <p className="text-xs text-[#666]">Dashboard loaded successfully</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#1e1e1e] px-2">
              <Avatar className="w-8 h-8 border border-[#e8281e]/50">
                <AvatarFallback className="bg-[#e8281e] text-white font-bold text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium leading-tight">
                  {session?.user?.name || 'Admin'}
                </span>
                <span className="text-[10px] text-[#e8281e] uppercase tracking-wider font-semibold">
                  {(session?.user as any)?.role || 'admin'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1a1a1a] border-[#2a2a2a]">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 py-1">
                <Avatar className="w-9 h-9 border border-[#e8281e]/50">
                  <AvatarFallback className="bg-[#e8281e] text-white font-bold">
                    {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white text-sm">{session?.user?.name || 'User'}</p>
                  <p className="text-xs text-[#666] truncate max-w-[120px]">{session?.user?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer text-[#999] focus:bg-[#2a2a2a] focus:text-white">
                <User className="w-4 h-4 mr-2" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer text-[#999] focus:bg-[#2a2a2a] focus:text-white">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-400 cursor-pointer focus:bg-[#2a2a2a] focus:text-red-300">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
