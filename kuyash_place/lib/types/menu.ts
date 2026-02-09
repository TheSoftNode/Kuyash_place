export interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  available: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryInfo {
  _id?: string;
  id: string;
  label: string;
  icon: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface MenuStats {
  totalItems: number;
  totalCategories: number;
  availableItems: number;
  recentUpdates: number;
}

export interface OrderAnalytics {
  totalOrders: number;
  revenue: number;
  topItems: Array<{
    item: string;
    orders: number;
    revenue: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    percentage: number;
    count: number;
  }>;
}

export interface DashboardData {
  stats: MenuStats;
  analytics: OrderAnalytics;
  recentActivity: Array<{
    id: string;
    type: 'create' | 'update' | 'delete';
    item: string;
    timestamp: Date;
    user?: string;
  }>;
}
