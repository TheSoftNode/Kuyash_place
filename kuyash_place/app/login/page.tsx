'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, ArrowRight, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const isDark = theme === 'dark';

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
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f4f4f4]'}`}>

      {/* ─── LEFT — BRANDING PANEL ─── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className={`hidden lg:flex lg:w-[52%] relative overflow-hidden transition-colors duration-500 ${
          isDark ? 'bg-[#080808]' : 'bg-white'
        }`}
      >
        {/* === DARK MODE background === */}
        {isDark && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#160000] via-[#0a0a0a] to-[#0d0d0d]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8281e]/8 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.04]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="gridDark" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#e8281e" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridDark)" />
              </svg>
            </div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border-[40px] border-[#e8281e] opacity-[0.04]" />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[30px] border-[#e8281e] opacity-[0.04]" />
          </>
        )}

        {/* === LIGHT MODE background — white, elegant === */}
        {!isDark && (
          <>
            {/* Subtle warm gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#fff5f5]" />
            {/* Very subtle red glow bottom right */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#e8281e]/5 rounded-full blur-3xl" />
            {/* Top left light accent */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#e8281e]/4 rounded-full blur-3xl" />
            {/* Fine dot grid */}
            <div className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: 'radial-gradient(circle, #e8281e 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }}
            />
            {/* Decorative ring bottom-left */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-[2px] border-[#e8281e]/10" />
            <div className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full border-[2px] border-[#e8281e]/8" />
            {/* Decorative ring top-right */}
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border-[2px] border-[#e8281e]/10" />
            {/* Red accent bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e8281e] to-transparent opacity-30" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-14 xl:px-20">

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 90 }}
            className="relative w-56 h-56 mb-6"
          >
            <Image
              src="/KUYASH_NORMAL_UPGRADED.png"
              alt="Kuyash Place"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.35 }}
            className={`w-16 h-[2px] mb-5 ${isDark ? 'bg-[#e8281e]' : 'bg-[#e8281e]'}`}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-sm text-center max-w-xs leading-relaxed font-medium ${
              isDark ? 'text-[#555]' : 'text-[#888]'
            }`}
          >
            Professional Restaurant Management System
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 space-y-3 w-full max-w-xs"
          >
            {['Full menu management & CRUD', 'QR code for digital menu', 'Real-time analytics dashboard'].map((text, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-[#111] border-[#1e1e1e]'
                  : 'bg-white border-[#f0f0f0] shadow-sm'
              }`}>
                <div className="w-2 h-2 rounded-full bg-[#e8281e] flex-shrink-0" />
                <p className={`text-sm font-medium ${isDark ? 'text-[#666]' : 'text-[#444]'}`}>{text}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right edge separator */}
        <div className={`absolute right-0 top-0 h-full w-px ${
          isDark
            ? 'bg-gradient-to-b from-transparent via-[#e8281e]/20 to-transparent'
            : 'bg-gradient-to-b from-transparent via-[#e0e0e0] to-transparent'
        }`} />
      </motion.div>

      {/* ─── RIGHT — LOGIN FORM ─── */}
      <div className={`w-full lg:w-[48%] flex items-center justify-center relative transition-colors duration-500 ${
        isDark ? 'bg-[#0d0d0d]' : 'bg-[#f0f0f0]'
      }`}>

        {/* Light mode right panel background details */}
        {!isDark && (
          <>
            <div className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage: 'radial-gradient(circle, #e8281e 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#e8281e]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#e8281e]/4 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {/* Dark mode right panel background details */}
        {isDark && (
          <>
            <div className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'radial-gradient(circle, #e8281e 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }}
            />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#e8281e]/5 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {/* Theme Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 z-20 ${
            isDark
              ? 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#555] hover:text-[#e8281e] hover:border-[#e8281e]/40'
              : 'bg-white border border-[#e0e0e0] text-[#aaa] hover:text-[#e8281e] hover:border-[#e8281e]/30 shadow-sm'
          }`}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 w-full max-w-[520px] px-8 py-12"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <div className="relative w-28 h-28 mb-4">
              <Image src="/KUYASH_NORMAL_UPGRADED.png" alt="Kuyash Place" fill className="object-contain" />
            </div>
            <div className="w-10 h-[2px] bg-[#e8281e] mb-2" />
            <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isDark ? 'text-[#444]' : 'text-[#bbb]'}`}>
              Admin Panel
            </p>
          </div>

          {/* Form card */}
          <div className={`rounded-3xl p-10 transition-colors duration-500 ${
            isDark
              ? 'bg-[#141414] border border-[#1e1e1e] shadow-2xl shadow-black/60'
              : 'bg-white border border-[#e8e8e8] shadow-2xl shadow-black/8'
          }`}>

            {/* Red top accent line */}
            <div className="w-10 h-[3px] bg-[#e8281e] rounded-full mb-7" />

            {/* Heading */}
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e8281e] mb-3">
                Admin Portal
              </p>
              <h2 className={`text-[2rem] font-bold leading-tight mb-2 tracking-tight ${isDark ? 'text-white' : 'text-[#111]'}`}>
                Welcome Back
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-[#444]' : 'text-[#aaa]'}`}>
                Sign in to manage your restaurant dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-[11px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-[#444]' : 'text-[#999]'}`}>
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-12 h-13 rounded-xl text-sm border transition-all duration-200 ${
                      isDark
                        ? 'bg-[#0d0d0d] border-[#2a2a2a] text-white placeholder:text-[#282828] focus-visible:border-[#e8281e] focus-visible:ring-[#e8281e]/15'
                        : 'bg-[#fafafa] border-[#ececec] text-[#111] placeholder:text-[#ccc] focus-visible:border-[#e8281e] focus-visible:ring-[#e8281e]/10'
                    }`}
                    style={{ height: '52px' }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-[11px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-[#444]' : 'text-[#999]'}`}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 ${isDark ? 'text-[#333]' : 'text-[#ccc]'}`} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-12 rounded-xl text-sm border transition-all duration-200 ${
                      isDark
                        ? 'bg-[#0d0d0d] border-[#2a2a2a] text-white placeholder:text-[#282828] focus-visible:border-[#e8281e] focus-visible:ring-[#e8281e]/15'
                        : 'bg-[#fafafa] border-[#ececec] text-[#111] placeholder:text-[#ccc] focus-visible:border-[#e8281e] focus-visible:ring-[#e8281e]/10'
                    }`}
                    style={{ height: '52px' }}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8281e] hover:bg-[#cc1f16] disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#e8281e]/25 hover:shadow-[#e8281e]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm mt-1 tracking-wide"
                style={{ height: '52px' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className={`mt-8 flex items-center gap-3`}>
              <div className={`flex-1 h-px ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#ebebeb]'}`} />
              <span className={`text-[9px] tracking-[0.3em] font-bold ${isDark ? 'text-[#2a2a2a]' : 'text-[#ccc]'}`}>SECURED</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#ebebeb]'}`} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
