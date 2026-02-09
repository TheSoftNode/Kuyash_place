# Kuyash Place - Restaurant Dashboard

A professional, enterprise-level restaurant menu management system built with Next.js 14, TypeScript, MongoDB, and modern UI components.

## 🎯 Features

### Dashboard Features
- **Real-time Analytics**: View comprehensive statistics about menu items, categories, and updates
- **Interactive Charts**: Visualize data with pie charts, bar charts, and trend analysis
- **Recent Activity Tracking**: Monitor all CRUD operations on menu items

### Menu Management
- **Full CRUD Operations**: Create, Read, Update, and Delete menu items
- **Drag & Drop Reordering**: Intuitive interface to reorder menu items within categories
- **Category Management**: Dynamic categories that can be added, edited, or removed
- **Search & Filter**: Powerful search and category-based filtering
- **Availability Toggle**: Mark items as available or unavailable
- **Bulk Operations**: Handle multiple items efficiently

### QR Code Generation
- **Dynamic QR Codes**: Generate QR codes for the entire menu
- **Customizable Sizes**: Choose from multiple QR code sizes
- **Download & Print**: Easy download and print functionality
- **Auto-updating**: Menu changes reflect automatically without regenerating QR codes

### Public Menu View
- **Beautiful UI**: Modern, responsive menu display for customers
- **Category Tabs**: Easy navigation through menu categories
- **Search Functionality**: Quick item search for customers
- **Mobile Optimized**: Fully responsive design for all devices
- **Contact Information**: Display restaurant contact details

### Settings & Customization
- **Restaurant Information**: Manage name, phone, email, address
- **Theme Customization**: Customize primary, secondary, and accent colors
- **Currency Settings**: Configure currency symbol and format
- **Category Management**: Add, edit, or remove menu categories

## 🏗️ Project Structure

```
kuyash_place/
├── app/
│   ├── api/                    # API Routes (Backend)
│   │   ├── menu/              # Menu CRUD operations
│   │   │   ├── route.ts       # GET all, POST create
│   │   │   ├── [id]/route.ts  # GET, PUT, DELETE single item
│   │   │   └── reorder/route.ts # Drag & drop reordering
│   │   ├── categories/        # Category management
│   │   │   ├── route.ts       # GET all, POST create
│   │   │   └── [id]/route.ts  # PUT, DELETE category
│   │   ├── analytics/         # Analytics data
│   │   │   └── route.ts       # GET analytics
│   │   ├── settings/          # Settings management
│   │   │   └── route.ts       # GET, PUT settings
│   │   └── qr/               # QR code generation
│   │       └── route.ts       # POST generate, GET download
│   ├── dashboard/             # Dashboard Pages
│   │   ├── layout.tsx         # Dashboard layout wrapper
│   │   ├── page.tsx           # Main dashboard (analytics)
│   │   ├── menu/page.tsx      # Menu management page
│   │   ├── analytics/page.tsx # Detailed analytics
│   │   ├── qr/page.tsx        # QR code generator
│   │   └── settings/page.tsx  # Settings page
│   ├── menu/
│   │   └── view/page.tsx      # Public menu view
│   ├── layout.tsx             # Root layout with theme provider
│   ├── page.tsx               # Home (redirects to dashboard)
│   └── globals.css            # Global styles
├── components/
│   ├── dashboard/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx  # Main layout component
│   │   │   └── Topbar.tsx           # Top navigation bar
│   │   ├── menu/
│   │   │   └── MenuItemCard.tsx     # Menu item display card
│   │   ├── analytics/
│   │   │   ├── CategoryChart.tsx    # Pie chart component
│   │   │   └── RecentActivity.tsx   # Activity feed
│   │   ├── modals/
│   │   │   ├── MenuItemModal.tsx    # Create/Edit modal
│   │   │   └── DeleteConfirmModal.tsx # Delete confirmation
│   │   ├── Sidebar.tsx             # Collapsible sidebar
│   │   └── StatsCard.tsx           # Statistics card
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── ... (all other UI components)
├── lib/
│   ├── api/
│   │   └── client.ts          # API client with type-safe methods
│   ├── db/
│   │   ├── mongodb.ts         # MongoDB connection handler
│   │   └── models/
│   │       ├── MenuItem.ts    # Menu item schema
│   │       ├── Category.ts    # Category schema
│   │       ├── Settings.ts    # Settings schema
│   │       └── Activity.ts    # Activity log schema
│   ├── hooks/
│   │   ├── useMenu.ts         # Menu data hook
│   │   ├── useCategories.ts   # Categories hook
│   │   ├── useSettings.ts     # Settings hook
│   │   └── useAnalytics.ts    # Analytics hook
│   ├── types/
│   │   └── menu.ts            # TypeScript interfaces
│   ├── config/
│   │   └── app.ts             # App configuration
│   ├── constants/
│   │   └── categories.ts      # Category utilities (deprecated - now dynamic)
│   └── utils.ts               # Utility functions
├── scripts/
│   └── seed.ts                # Database seeding script
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── tsconfig.json             # TypeScript config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB installed and running locally or MongoDB Atlas account
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
The `.env.local` file is already set up with:
- MongoDB connection string
- App configuration
- Restaurant information

Update values as needed:
```env
MONGODB_URI=mongodb://localhost:27017/kuyash_place
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESTAURANT_NAME=Kuyash Place
RESTAURANT_PHONE=080-328-86802
# ... etc
```

3. **Seed the database**:
```bash
npm run seed
```

This will populate your database with:
- 10 menu categories (Salad, Proteins, Grills, etc.)
- 100+ menu items from the provided menu
- Default restaurant settings

4. **Start development server**:
```bash
npm run dev
```

5. **Open your browser**:
```
http://localhost:3000
```

## 📱 Pages & Routes

### Dashboard Routes (Protected)
- `/dashboard` - Main dashboard with analytics
- `/dashboard/menu` - Menu management (CRUD operations)
- `/dashboard/analytics` - Detailed analytics and charts
- `/dashboard/qr` - QR code generator
- `/dashboard/settings` - Restaurant settings

### Public Routes
- `/menu/view` - Public menu display (for QR code)

### API Routes
All API routes return JSON with structure:
```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}
```

## 🎨 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Drag & Drop**: @hello-pangea/dnd
- **QR Codes**: qrcode
- **Theme**: next-themes

## 🔧 Features Implementation

### Dynamic Everything
- **No hardcoded data**: All menu items, categories, and settings are stored in MongoDB
- **Real-time updates**: Changes reflect immediately across the application
- **Flexible categories**: Add, edit, or remove categories without code changes
- **Customizable settings**: All restaurant information can be updated via UI

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on desktop
- Full mobile navigation
- Touch-friendly interfaces

### Performance
- Server-side rendering for optimal SEO
- Client-side caching with React hooks
- Optimistic UI updates
- Lazy loading for images

### Type Safety
- Full TypeScript implementation
- Type-safe API client
- Validated schemas with Mongoose
- Strict type checking

## 📊 Database Schema

### MenuItem
```typescript
{
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  available: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Category
```typescript
{
  id: string;
  label: string;
  icon: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Settings
```typescript
{
  name: string;
  phone: string;
  email: string;
  instagram?: string;
  address?: string;
  description?: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  language: string;
}
```

### Activity
```typescript
{
  type: 'create' | 'update' | 'delete';
  item: string;
  category?: string;
  user?: string;
  details?: Record<string, any>;
  timestamp: Date;
}
```

## 🎯 Next Steps

1. **Add Authentication**: Implement user authentication (NextAuth.js recommended)
2. **Image Upload**: Add image upload functionality for menu items
3. **Multi-language Support**: Implement i18n for multiple languages
4. **Order Management**: Add ordering system integration
5. **Reports**: Generate PDF reports for menu analytics
6. **Backup System**: Implement automated database backups

## 📝 Development Notes

- All components follow single responsibility principle
- Separation of concerns: API layer, business logic, UI components
- Custom hooks for data fetching and state management
- Error handling at every level
- Loading states for better UX
- Toast notifications for user feedback

## 🐛 Troubleshooting

**MongoDB Connection Issues**:
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify MONGODB_URI in `.env.local`

**Port Already in Use**:
- Change port: `npm run dev -- -p 3001`

**Seed Script Fails**:
- Check MongoDB connection
- Ensure database name doesn't conflict

## 📄 License

Private project for Kuyash Place Restaurant.

---

Built with ❤️ using Next.js and modern web technologies.
