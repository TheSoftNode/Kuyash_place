import mongoose, { Schema, Model } from 'mongoose';

export interface Category {
  _id?: string;
  id: string;
  label: string;
  icon: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<Category>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: String,
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.index({ order: 1 });
CategorySchema.index({ isActive: 1 });

export const CategoryModel: Model<Category> =
  mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema);
