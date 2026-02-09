import mongoose, { Schema, Model } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

export const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);
