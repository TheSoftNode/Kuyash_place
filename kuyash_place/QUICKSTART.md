# Quick Start Guide - Kuyash Place Dashboard

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env.local
```

### Step 3: Seed Database & Run
```bash
# Seed the database with menu data
npm run seed

# Start the development server
npm run dev
```

**Open your browser**: http://localhost:3000

---

## 📍 What You Get

### Dashboard Features
✅ **Real-time Analytics Dashboard** with charts and statistics
✅ **Menu Management** - Add, Edit, Delete, Reorder menu items
✅ **Drag & Drop Reordering** for menu items
✅ **QR Code Generator** for digital menu
✅ **Settings Management** for restaurant info
✅ **Public Menu View** for customers
✅ **Category Management** - Dynamic categories
✅ **Search & Filter** functionality
✅ **Dark/Light Mode** theme support
✅ **Fully Responsive** across all devices

### Pages Created
- `/dashboard` - Main analytics dashboard
- `/dashboard/menu` - Menu management (CRUD + Drag & Drop)
- `/dashboard/analytics` - Detailed analytics with charts
- `/dashboard/qr` - QR code generator
- `/dashboard/settings` - Restaurant settings
- `/menu/view` - Public menu display (for customers)

---

## 🎯 Quick Actions

### Add a New Menu Item
1. Go to `/dashboard/menu`
2. Click "Add Item" button
3. Fill in name, price, category, description
4. Click "Create"

### Generate QR Code
1. Go to `/dashboard/qr`
2. Click "Generate QR Code"
3. Download or print the QR code
4. Place it where customers can scan

### Update Restaurant Info
1. Go to `/dashboard/settings`
2. Update name, phone, email, etc.
3. Click "Save Changes"

### Reorder Menu Items
1. Go to `/dashboard/menu`
2. Select a category
3. Drag items to reorder
4. Changes save automatically

---

## 🎨 Customization

### Change Colors
1. Go to `/dashboard/settings`
2. Click "Appearance" tab
3. Select new colors for primary, secondary, accent
4. Click "Save Changes"

### Add New Category
1. Go to `/dashboard/settings`
2. Click "Categories" tab
3. Click "Add Category"
4. Enter details and save

---

## 📊 Database Structure

Your database has been seeded with:
- **10 Categories**: Salad, Proteins, Grills, Pastry, Rice Dish, Soups, Swallow, Noodles/Pasta, Chips, Sauce
- **100+ Menu Items**: All items from your restaurant menu
- **Restaurant Settings**: Kuyash Place contact information

---

## 🔧 Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **MongoDB** - Database
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Recharts** - Charts and analytics
- **QRCode** - QR code generation

---

## 💡 Pro Tips

1. **Responsive Sidebar**: Click the hamburger menu on mobile or collapse button on desktop
2. **Theme Toggle**: Click the sun/moon icon in the top bar to switch themes
3. **Search**: Use the search bar to quickly find menu items
4. **Filters**: Filter by category or availability status
5. **Activity Log**: Check recent activity in the dashboard

---

## 🐛 Common Issues

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**MongoDB not connecting?**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env.local`

**Need to reset data?**
```bash
npm run seed
```

---

## 📱 Mobile Access

The dashboard is fully responsive! Access it from:
- Desktop computers
- Tablets
- Mobile phones

The public menu view (`/menu/view`) is optimized for customer viewing on mobile devices.

---

## 🎉 You're All Set!

Your restaurant dashboard is ready to use. Start managing your menu, generate QR codes, and provide a modern digital experience for your customers!

**Need help?** Check `PROJECT_STRUCTURE.md` for detailed documentation.
