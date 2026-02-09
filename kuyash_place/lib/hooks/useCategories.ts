'use client';

import { useState, useEffect, useCallback } from 'react';
import { categoriesAPI, APIError } from '@/lib/api/client';
import { CategoryInfo } from '@/lib/types/menu';

interface UseCategoriesReturn {
  categories: CategoryInfo[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createCategory: (data: Partial<CategoryInfo>) => Promise<void>;
  updateCategory: (id: string, data: Partial<CategoryInfo>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export function useCategories(activeOnly = false): UseCategoriesReturn {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await categoriesAPI.getAll(activeOnly);
      setCategories(response.data || []);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  const createCategory = useCallback(async (data: Partial<CategoryInfo>) => {
    try {
      setError(null);
      await categoriesAPI.create(data);
      await fetchCategories();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id: string, data: Partial<CategoryInfo>) => {
    try {
      setError(null);
      await categoriesAPI.update(id, data);
      await fetchCategories();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      setError(null);
      await categoriesAPI.delete(id);
      await fetchCategories();
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message);
      throw err;
    }
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
