import { CategoryInfo } from '@/lib/types/menu';

export const CATEGORIES: Partial<CategoryInfo>[] = [
  { id: 'SALAD', label: 'Salad', icon: '🥗', order: 0, isActive: true },
  { id: 'PROTEINS', label: 'Proteins', icon: '🍖', order: 1, isActive: true },
  { id: 'GRILLS', label: 'Grills', icon: '🍗', order: 2, isActive: true },
  { id: 'PASTRY', label: 'Pastry', icon: '🥐', order: 3, isActive: true },
  { id: 'RICE_DISH', label: 'Rice Dish', icon: '🍚', order: 4, isActive: true },
  { id: 'SOUPS', label: 'Soups', icon: '🍲', order: 5, isActive: true },
  { id: 'SWALLOW', label: 'Swallow', icon: '🫓', order: 6, isActive: true },
  { id: 'NOODLES_PASTA', label: 'Noodles/Pasta', icon: '🍝', order: 7, isActive: true },
  { id: 'CHIPS', label: 'Chips', icon: '🍟', order: 8, isActive: true },
  { id: 'SAUCE', label: 'Sauce', icon: '🥫', order: 9, isActive: true },
];

export const getCategoryLabel = (category: string): string => {
  return CATEGORIES.find((c) => c.id === category)?.label || category;
};

export const getCategoryIcon = (category: string): string => {
  return CATEGORIES.find((c) => c.id === category)?.icon || '🍽️';
};
