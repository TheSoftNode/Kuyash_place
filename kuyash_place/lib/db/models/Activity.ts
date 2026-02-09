import mongoose, { Schema, Model } from 'mongoose';

export interface Activity {
  _id?: string;
  type: 'create' | 'update' | 'delete';
  item: string;
  category?: string;
  user?: string;
  details?: Record<string, any>;
  timestamp: Date;
}

const ActivitySchema = new Schema<Activity>({
  type: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete'],
  },
  item: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  user: {
    type: String,
    default: 'Admin',
  },
  details: {
    type: Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.index({ timestamp: -1 });

export const ActivityModel: Model<Activity> =
  mongoose.models.Activity || mongoose.model<Activity>('Activity', ActivitySchema);
