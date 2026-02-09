// Centralized API client with type-safe methods

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `/api${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new APIError(
      data.error || 'An error occurred',
      response.status,
      data
    );
  }

  return data;
}

// Menu Items API
export const menuAPI = {
  getAll: (params?: {
    category?: string;
    available?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.set(key, String(value));
      });
    }
    return fetchAPI(`/menu?${searchParams}`);
  },

  getById: (id: string) => fetchAPI(`/menu/${id}`),

  create: (data: any) =>
    fetchAPI('/menu', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    fetchAPI(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI(`/menu/${id}`, {
      method: 'DELETE',
    }),

  reorder: (items: Array<{ id: string; order: number }>) =>
    fetchAPI('/menu/reorder', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: (activeOnly = false) =>
    fetchAPI(`/categories?active=${activeOnly}`),

  create: (data: any) =>
    fetchAPI('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    fetchAPI(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// Settings API
export const settingsAPI = {
  get: () => fetchAPI('/settings'),

  update: (data: any) =>
    fetchAPI('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Analytics API
export const analyticsAPI = {
  get: (period = '30') => fetchAPI(`/analytics?period=${period}`),
};

// QR Code API
export const qrAPI = {
  generate: (data: { url?: string; size?: number; errorCorrection?: string }) =>
    fetchAPI('/qr', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  download: (url?: string, size?: number) => {
    const params = new URLSearchParams();
    if (url) params.set('url', url);
    if (size) params.set('size', String(size));
    return `/api/qr?${params}`;
  },
};
