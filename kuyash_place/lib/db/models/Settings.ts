import mongoose, { Schema, Model } from 'mongoose';

export interface RestaurantSettings {
  _id?: string;
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
  updatedAt?: Date;
}

const SettingsSchema = new Schema<RestaurantSettings>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    instagram: String,
    address: String,
    description: String,
    logo: String,
    primaryColor: {
      type: String,
      default: '#1a1a1a',
    },
    secondaryColor: {
      type: String,
      default: '#ea580c',
    },
    accentColor: {
      type: String,
      default: '#f97316',
    },
    currency: {
      type: String,
      default: 'NGN',
    },
    currencySymbol: {
      type: String,
      default: '₦',
    },
    timezone: {
      type: String,
      default: 'Africa/Lagos',
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true,
  }
);

export const SettingsModel: Model<RestaurantSettings> =
  mongoose.models.Settings || mongoose.model<RestaurantSettings>('Settings', SettingsSchema);
