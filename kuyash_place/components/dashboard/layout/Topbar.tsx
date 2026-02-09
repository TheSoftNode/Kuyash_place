'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    <header className="h-16 border-b border-[#2a2a2a] bg-[#111111] flex items-center justify-between px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-white hover:bg-[#2a2a2a]"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-[#c8a84b] font-bold text-lg">
            {settings?.name || 'Kuyash Place'}
          </span>
          <span className="hidden md:block text-[#555] text-sm">— Admin Dashboard</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-[#999] hover:text-white hover:bg-[#2a2a2a]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#c8a84b] rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1a1a1a] border-[#2a2a2a]">
            <DropdownMenuLabel className="text-[#c8a84b]">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem className="text-[#999] focus:bg-[#2a2a2a] focus:text-white">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-white">New menu item added</p>
                <p className="text-xs text-[#666]">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#2a2a2a]">
              <Avatar className="w-8 h-8 border border-[#c8a84b]">
                <AvatarFallback className="bg-[#c8a84b] text-[#111111] font-bold text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">
                {session?.user?.name || 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1a1a1a] border-[#2a2a2a]">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium text-white">{session?.user?.name || 'User'}</span>
                <span className="text-xs text-[#666]">{session?.user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer text-[#999] focus:bg-[#2a2a2a] focus:text-white">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer text-[#999] focus:bg-[#2a2a2a] focus:text-white">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2a2a2a]" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-400 cursor-pointer focus:bg-[#2a2a2a]">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
