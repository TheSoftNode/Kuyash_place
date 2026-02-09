import mongoose, { Schema, Model } from 'mongoose';
import { MenuItem } from '@/lib/types/menu';

const MenuItemSchema = new Schema<MenuItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

MenuItemSchema.index({ category: 1, order: 1 });
MenuItemSchema.index({ available: 1 });

export const MenuItemModel: Model<MenuItem> =
  mongoose.models.MenuItem || mongoose.model<MenuItem>('MenuItem', MenuItemSchema);
