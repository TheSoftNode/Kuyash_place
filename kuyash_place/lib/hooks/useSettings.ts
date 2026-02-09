'use client';

import { useState, useEffect, useCallback } from 'react';
import { settingsAPI, APIError } from '@/lib/api/client';
import { RestaurantSettings } from '@/lib/db/models/Settings';

interface UseSettingsReturn {
  settings: RestaurantSettings | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateSettings: (data: Partial<RestaurantSettings>) => Promise<void>;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await settingsAPI.get();
      setSettings(response.data || null);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (data: Partial<RestaurantSettings>) => {
    try {
      setError(null);
      const response: any = await settingsAPI.update(data);
      setSettings(response.data || null);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
    updateSettings,
  };
}
