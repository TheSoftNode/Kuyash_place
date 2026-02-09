'use client';

import { Package, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CategoryChart } from '@/components/dashboard/analytics/CategoryChart';
import { RecentActivity } from '@/components/dashboard/analytics/RecentActivity';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const { data, loading, error } = useAnalytics('30');

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-32 animate-pulse bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error loading dashboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Items"
          value={data?.stats.totalItems || 0}
          icon={Package}
          color="orange"
          index={0}
        />
        <StatsCard
          title="Available Items"
          value={data?.stats.availableItems || 0}
          icon={CheckCircle}
          color="green"
          index={1}
        />
        <StatsCard
          title="Categories"
          value={data?.stats.totalCategories || 0}
          icon={TrendingUp}
          color="blue"
          index={2}
        />
        <StatsCard
          title="Recent Updates"
          value={data?.stats.recentUpdates || 0}
          icon={AlertCircle}
          color="purple"
          index={3}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.categoryBreakdown && data.categoryBreakdown.length > 0 && (
          <CategoryChart data={data.categoryBreakdown} />
        )}
        {data?.recentActivity && (
          <RecentActivity activities={data.recentActivity} />
        )}
      </div>

      {/* Price Statistics */}
      {data?.priceStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Average Price"
            value={`₦${data.priceStats.avgPrice.toLocaleString()}`}
            icon={TrendingUp}
            color="blue"
          />
          <StatsCard
            title="Lowest Price"
            value={`₦${data.priceStats.minPrice.toLocaleString()}`}
            icon={Package}
            color="green"
          />
          <StatsCard
            title="Highest Price"
            value={`₦${data.priceStats.maxPrice.toLocaleString()}`}
            icon={Package}
            color="orange"
          />
        </div>
      )}
    </div>
  );
}
