import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { MenuItemModel } from '@/lib/db/models/MenuItem';

// POST - Reorder menu items
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { items } = body as { items: Array<{ id: string; order: number }> };

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Invalid items array' },
        { status: 400 }
      );
    }

    // Update all items in bulk
    const bulkOps = items.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));

    await MenuItemModel.bulkWrite(bulkOps);

    return NextResponse.json({
      success: true,
      message: 'Items reordered successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
