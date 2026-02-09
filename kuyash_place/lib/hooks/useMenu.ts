'use client';

import { useState, useEffect, useCallback } from 'react';
import { menuAPI, APIError } from '@/lib/api/client';
import { MenuItem } from '@/lib/types/menu';

interface UseMenuOptions {
  category?: string;
  available?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseMenuReturn {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  refetch: () => Promise<void>;
  createItem: (data: Partial<MenuItem>) => Promise<void>;
  updateItem: (id: string, data: Partial<MenuItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  reorderItems: (items: Array<{ id: string; order: number }>) => Promise<void>;
}

export function useMenu(options: UseMenuOptions = {}): UseMenuReturn {
  const { autoFetch = true, ...params } = options;
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseMenuReturn['pagination']>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await menuAPI.getAll(params);
      setItems(response.data || []);
      setPagination(response.pagination || null);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  const createItem = useCallback(async (data: Partial<MenuItem>) => {
    try {
      setError(null);
      await menuAPI.create(data);
      await fetchItems();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchItems]);

  const updateItem = useCallback(async (id: string, data: Partial<MenuItem>) => {
    try {
      setError(null);
      await menuAPI.update(id, data);
      await fetchItems();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchItems]);

  const deleteItem = useCallback(async (id: string) => {
    try {
      setError(null);
      await menuAPI.delete(id);
      await fetchItems();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchItems]);

  const reorderItems = useCallback(async (reorderedItems: Array<{ id: string; order: number }>) => {
    try {
      setError(null);
      await menuAPI.reorder(reorderedItems);
      await fetchItems();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchItems]);

  useEffect(() => {
    if (autoFetch) {
      fetchItems();
    }
  }, [autoFetch, fetchItems]);

  return {
    items,
    loading,
    error,
    pagination,
    refetch: fetchItems,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
  };
}
