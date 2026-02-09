'use client';

import { BarChart3, TrendingUp, Package, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CategoryChart } from '@/components/dashboard/analytics/CategoryChart';
import { RecentActivity } from '@/components/dashboard/analytics/RecentActivity';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30');
  const { data, loading } = useAnalytics(period);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights about your menu</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* Price Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Average Price"
              value={`₦${data?.priceStats.avgPrice.toLocaleString() || 0}`}
              icon={DollarSign}
              color="blue"
              index={0}
            />
            <StatsCard
              title="Lowest Price"
              value={`₦${data?.priceStats.minPrice.toLocaleString() || 0}`}
              icon={TrendingUp}
              color="green"
              index={1}
            />
            <StatsCard
              title="Highest Price"
              value={`₦${data?.priceStats.maxPrice.toLocaleString() || 0}`}
              icon={Package}
              color="orange"
              index={2}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            {data?.categoryBreakdown && data.categoryBreakdown.length > 0 && (
              <CategoryChart data={data.categoryBreakdown} />
            )}

            {/* Category Bar Chart */}
            {data?.categoryBreakdown && data.categoryBreakdown.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Items per Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.categoryBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          {data?.recentActivity && <RecentActivity activities={data.recentActivity} />}

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              title="Total Items"
              value={data?.stats.totalItems || 0}
              icon={Package}
              color="purple"
            />
            <StatsCard
              title="Categories"
              value={data?.stats.totalCategories || 0}
              icon={BarChart3}
              color="blue"
            />
            <StatsCard
              title="Available"
              value={data?.stats.availableItems || 0}
              icon={TrendingUp}
              color="green"
            />
            <StatsCard
              title="Recent Updates"
              value={data?.stats.recentUpdates || 0}
              icon={Package}
              color="orange"
            />
          </div>
        </>
      )}
    </div>
  );
}
