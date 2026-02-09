'use client';

import { useState, useEffect, useCallback } from 'react';
import { analyticsAPI, APIError } from '@/lib/api/client';

interface AnalyticsData {
  stats: {
    totalItems: number;
    totalCategories: number;
    availableItems: number;
    recentUpdates: number;
  };
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'create' | 'update' | 'delete';
    item: string;
    category?: string;
    timestamp: Date;
    user?: string;
  }>;
  priceStats: {
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
}

interface UseAnalyticsReturn {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAnalytics(period = '30'): UseAnalyticsReturn {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await analyticsAPI.get(period);
      setData(response.data || null);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
