import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { MenuItemModel } from '@/lib/db/models/MenuItem';
import { CategoryModel } from '@/lib/db/models/Category';
import { ActivityModel } from '@/lib/db/models/Activity';

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const periodDate = new Date();
    periodDate.setDate(periodDate.getDate() - parseInt(period));

    // Get menu stats
    const [totalItems, availableItems, totalCategories] = await Promise.all([
      MenuItemModel.countDocuments(),
      MenuItemModel.countDocuments({ available: true }),
      CategoryModel.countDocuments({ isActive: true }),
    ]);

    // Get recent updates count
    const recentUpdates = await ActivityModel.countDocuments({
      timestamp: { $gte: periodDate },
    });

    // Get category breakdown
    const categoryBreakdown = await MenuItemModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'id',
          as: 'categoryInfo',
        },
      },
      {
        $project: {
          category: { $arrayElemAt: ['$categoryInfo.label', 0] },
          count: 1,
        },
      },
    ]);

    const total = categoryBreakdown.reduce((sum, item) => sum + item.count, 0);
    const categoryData = categoryBreakdown.map((item) => ({
      category: item.category || item._id,
      count: item.count,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }));

    // Get recent activity
    const recentActivity = await ActivityModel.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    // Get price statistics
    const priceStats = await MenuItemModel.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalItems,
          totalCategories,
          availableItems,
          recentUpdates,
        },
        categoryBreakdown: categoryData,
        recentActivity: recentActivity.map((a) => ({
          id: a._id,
          type: a.type,
          item: a.item,
          category: a.category,
          timestamp: a.timestamp,
          user: a.user,
        })),
        priceStats: priceStats[0] || {
          avgPrice: 0,
          minPrice: 0,
          maxPrice: 0,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
