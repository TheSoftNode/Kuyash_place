'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Welcome back!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#111111] border-r border-[#2a2a2a]"
      >
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8a84b]/10 via-transparent to-[#7a6820]/20" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8a84b" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-24 h-24 bg-[#c8a84b] rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-[#c8a84b]/30"
          >
            <UtensilsCrossed className="w-14 h-14 text-[#111111]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold mb-2 text-center text-white"
          >
            Kuyash Place
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="w-16 h-0.5 bg-[#c8a84b] my-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-[#999] text-center max-w-md"
          >
            Professional Restaurant Management System
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 space-y-4"
          >
            {['Manage your menu effortlessly', 'Generate QR codes instantly', 'Track analytics in real-time'].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#c8a84b] rounded-full" />
                <p className="text-[#888]">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative glow */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#c8a84b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#c8a84b]/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0d0d0d]">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#c8a84b] rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-7 h-7 text-[#111111]" />
            </div>
            <span className="text-2xl font-bold text-white">Kuyash Place</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
            <div className="w-12 h-0.5 bg-[#c8a84b] mb-3" />
            <p className="text-[#888]">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#999]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555] z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kuyashplace.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#444] focus-visible:border-[#c8a84b] focus-visible:ring-[#c8a84b]/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#999]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555] z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#444] focus-visible:border-[#c8a84b] focus-visible:ring-[#c8a84b]/20"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#c8a84b] hover:bg-[#d4b86a] text-[#111111] font-semibold transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-[#555]">
            <p>Protected by enterprise-grade security</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
