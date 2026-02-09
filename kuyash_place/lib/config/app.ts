// Centralized application configuration
// All values are dynamic and can be overridden by database settings

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Restaurant Dashboard',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'), // 5MB
    allowedTypes: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
  },

  // QR Code configuration
  qr: {
    errorCorrection: (process.env.NEXT_PUBLIC_QR_ERROR_CORRECTION || 'M') as 'L' | 'M' | 'Q' | 'H',
    size: parseInt(process.env.NEXT_PUBLIC_QR_SIZE || '512'),
  },

  // Pagination
  pagination: {
    itemsPerPage: parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE || '20'),
  },
};

// Restaurant information (fallback - will be overridden by database settings)
export const defaultRestaurantInfo = {
  name: process.env.RESTAURANT_NAME || 'Restaurant',
  phone: process.env.RESTAURANT_PHONE || '',
  email: process.env.RESTAURANT_EMAIL || '',
  instagram: process.env.RESTAURANT_INSTAGRAM || '',
  address: process.env.RESTAURANT_ADDRESS || '',
  description: process.env.RESTAURANT_DESCRIPTION || '',
};
