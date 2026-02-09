import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { CategoryModel } from '../lib/db/models/Category';
import { MenuItemModel } from '../lib/db/models/MenuItem';
import { SettingsModel } from '../lib/db/models/Settings';
import { UserModel } from '../lib/db/models/User';

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kuyash_place';

// Seed categories from the menu images
const categories = [
  { id: 'SALAD', label: 'Salad', icon: '🥗', order: 0 },
  { id: 'PROTEINS', label: 'Proteins', icon: '🍖', order: 1 },
  { id: 'GRILLS', label: 'Grills', icon: '🍗', order: 2 },
  { id: 'PASTRY', label: 'Pastry', icon: '🥐', order: 3 },
  { id: 'RICE_DISH', label: 'Rice Dish', icon: '🍚', order: 4 },
  { id: 'SOUPS', label: 'Soups', icon: '🍲', order: 5 },
  { id: 'SWALLOW', label: 'Swallow', icon: '🫓', order: 6 },
  { id: 'NOODLES_PASTA', label: 'Noodles/Pasta', icon: '🍝', order: 7 },
  { id: 'CHIPS', label: 'Chips', icon: '🍟', order: 8 },
  { id: 'SAUCE', label: 'Sauce', icon: '🥫', order: 9 },
];

// Seed menu items from the images
const menuItems = [
  // SALAD
  { name: 'CHICKEN SALAD', price: 5000, category: 'SALAD', order: 0 },
  { name: 'CEASAR SALAD', price: 6000, category: 'SALAD', order: 1 },
  { name: 'MIXED VEGETABLE SALAD', price: 4000, category: 'SALAD', order: 2 },
  { name: 'COLESLAW', price: 1500, category: 'SALAD', order: 3 },

  // PROTEINS
  { name: 'TURKEY', price: 6000, category: 'PROTEINS', order: 0 },
  { name: 'GRILLED CHICKEN', price: 2000, category: 'PROTEINS', order: 1 },
  { name: 'CROAKER FISH', price: 3000, category: 'PROTEINS', order: 2 },
  { name: 'TITUS FISH', price: 2000, category: 'PROTEINS', order: 3 },
  { name: 'EGG', price: 500, category: 'PROTEINS', order: 4 },
  { name: 'GOAT MEAT', price: 1500, category: 'PROTEINS', order: 5 },
  { name: 'BEEF', price: 1500, category: 'PROTEINS', order: 6 },
  { name: 'WHOLE CHICKEN', price: 20000, category: 'PROTEINS', order: 7 },
  { name: 'GIZZARD', price: 1500, category: 'PROTEINS', order: 8 },
  { name: 'MIXED KEBAB', price: 2000, category: 'PROTEINS', order: 9 },

  // GRILLS
  { name: 'GRILLED CROAKER & CHIPS', price: 17000, category: 'GRILLS', order: 0 },
  { name: 'CHICKEN DRUMSTICK & CHIPS', price: 6000, category: 'GRILLS', order: 1 },
  { name: 'TURKEY & CHIPS', price: 9000, category: 'GRILLS', order: 2 },
  { name: 'CHICKEN WINGS & CHIPS', price: 5000, category: 'GRILLS', order: 3 },
  { name: 'GIZZARD & CHIPS', price: 5000, category: 'GRILLS', order: 4 },
  { name: 'CAT FISH BARBECUE', price: 15000, category: 'GRILLS', order: 5 },

  // PASTRY
  { name: 'CHICKEN SHAWARMA, SINGLE SAUSAGE', price: 3500, category: 'PASTRY', order: 0 },
  { name: 'CHICKEN SHAWARMA, DOUBLE SAUSAGE', price: 4000, category: 'PASTRY', order: 1 },
  { name: 'JUMBO SHAWARMA', price: 5000, category: 'PASTRY', order: 2 },
  { name: 'SANDWICH', price: 3000, category: 'PASTRY', order: 3 },
  { name: 'BEEF BURGER', price: 4000, category: 'PASTRY', order: 4 },
  { name: 'CHICKEN BURGER', price: 5000, category: 'PASTRY', order: 5 },
  { name: 'MEAT PIE (BIG)', price: 1500, category: 'PASTRY', order: 6 },
  { name: 'MEAT PIE (SMALL)', price: 1000, category: 'PASTRY', order: 7 },
  { name: 'CHICKEN PIE (BIG)', price: 1500, category: 'PASTRY', order: 8 },
  { name: 'CHICKEN PIE (SMALL)', price: 1000, category: 'PASTRY', order: 9 },
  { name: 'DOUGHNUT', price: 500, category: 'PASTRY', order: 10 },
  { name: 'FISH PIE', price: 1000, category: 'PASTRY', order: 11 },
  { name: 'SEASON ROLL', price: 1000, category: 'PASTRY', order: 12 },
  { name: 'SAUSAGE ROLL', price: 1000, category: 'PASTRY', order: 13 },
  { name: 'COCONUT BREAD', price: 2500, category: 'PASTRY', order: 14 },
  { name: 'SLICE BREAU', price: 2000, category: 'PASTRY', order: 15 },
  { name: 'BURGER BREAD', price: 1500, category: 'PASTRY', order: 16 },

  // RICE DISH
  { name: 'SPECIAL FRIED RICE', price: 7000, category: 'RICE_DISH', order: 0 },
  { name: 'ARABIAN RICE', price: 7000, category: 'RICE_DISH', order: 1 },
  { name: 'JAMBALAYA RICE', price: 7000, category: 'RICE_DISH', order: 2 },
  { name: 'JOLLOF RICE', price: 3000, category: 'RICE_DISH', order: 3 },
  { name: 'COCONUT RICE', price: 3000, category: 'RICE_DISH', order: 4 },
  { name: 'FRIED RICE', price: 3000, category: 'RICE_DISH', order: 5 },
  { name: 'NATIVE RICE', price: 4000, category: 'RICE_DISH', order: 6 },
  { name: 'WHITE RICE', price: 2000, category: 'RICE_DISH', order: 7 },
  { name: 'WHITE RICE & BEANS', price: 3000, category: 'RICE_DISH', order: 8 },
  { name: 'OFADA RICE', price: 2000, category: 'RICE_DISH', order: 9 },

  // SOUPS
  { name: 'EGUSI SOUP', price: 3000, category: 'SOUPS', order: 0 },
  { name: 'VEGETABLE SOUP', price: 3000, category: 'SOUPS', order: 1 },
  { name: 'OKRA SOUP', price: 3000, category: 'SOUPS', order: 2 },
  { name: 'OGBONO SOUP', price: 3000, category: 'SOUPS', order: 3 },
  { name: 'BANGA SOUP', price: 5000, category: 'SOUPS', order: 4 },
  { name: 'SEA FOOD OKRA', price: 7000, category: 'SOUPS', order: 5 },

  // SWALLOW
  { name: 'POUNDO', price: 2000, category: 'SWALLOW', order: 0 },
  { name: 'SEMO', price: 1500, category: 'SWALLOW', order: 1 },
  { name: 'STARCH', price: 1500, category: 'SWALLOW', order: 2 },
  { name: 'EBA', price: 1000, category: 'SWALLOW', order: 3 },
  { name: 'WHEAT', price: 2000, category: 'SWALLOW', order: 4 },

  // NOODLES_PASTA
  { name: 'SINGAPORE NOODLES', price: 5500, category: 'NOODLES_PASTA', order: 0 },
  { name: 'KUYASH SPECIAL NOODLES', price: 2500, category: 'NOODLES_PASTA', order: 1 },
  { name: 'JOLLOF PASTA', price: 4000, category: 'NOODLES_PASTA', order: 2 },
  { name: 'NATIVE PASTA', price: 4000, category: 'NOODLES_PASTA', order: 3 },
  { name: 'STIR-FRIED PASTA', price: 5500, category: 'NOODLES_PASTA', order: 4 },

  // CHIPS
  { name: 'IRISH', price: 0, category: 'CHIPS', order: 0, available: false },
  { name: 'YAM', price: 0, category: 'CHIPS', order: 1, available: false },
  { name: 'FRENCH FRIES', price: 0, category: 'CHIPS', order: 2, available: false },

  // SAUCE
  { name: 'CHICKEN N\' CURRY SAUCE', price: 5000, category: 'SAUCE', order: 0 },
  { name: 'CHICKEN N\' CHILLI SAUCE', price: 5000, category: 'SAUCE', order: 1 },
  { name: 'SHREDDED BEEF SAUCE', price: 5000, category: 'SAUCE', order: 2 },
  { name: 'FISH SAUCE', price: 4000, category: 'SAUCE', order: 3 },
  { name: 'EGG SAUCE', price: 4000, category: 'SAUCE', order: 4 },
  { name: 'OFADA SAUCE', price: 3000, category: 'SAUCE', order: 5 },
  { name: 'TOMATOES STEW', price: 3000, category: 'SAUCE', order: 6 },
  { name: 'VEGETABLE SAUCE', price: 3000, category: 'SAUCE', order: 7 },
];

const settings = {
  name: 'Kuyash Place',
  phone: '080-328-86802',
  email: 'kuyashplaceng@gmail.com',
  instagram: '@kuyash_place',
  primaryColor: '#1a1a1a',
  secondaryColor: '#ea580c',
  accentColor: '#f97316',
  currency: 'NGN',
  currencySymbol: '₦',
  timezone: 'Africa/Lagos',
  language: 'en',
};

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      CategoryModel.deleteMany({}),
      MenuItemModel.deleteMany({}),
      SettingsModel.deleteMany({}),
      UserModel.deleteMany({}),
    ]);

    // Seed categories
    console.log('Seeding categories...');
    await CategoryModel.insertMany(categories.map(c => ({ ...c, isActive: true })));

    // Seed menu items
    console.log('Seeding menu items...');
    await MenuItemModel.insertMany(menuItems.map(m => ({ ...m, available: m.available !== false })));

    // Seed settings
    console.log('Seeding settings...');
    await SettingsModel.create(settings);

    // Seed default admin user
    console.log('Seeding default admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await UserModel.create({
      name: 'Admin User',
      email: 'thesoftnode@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Database seeded successfully!');
    console.log(`- ${categories.length} categories`);
    console.log(`- ${menuItems.length} menu items`);
    console.log('- 1 settings document');
    console.log('- 1 admin user (email: thesoftnode@gmail.com, password: admin123)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
