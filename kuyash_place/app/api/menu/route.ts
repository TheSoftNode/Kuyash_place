import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { MenuItemModel } from '@/lib/db/models/MenuItem';
import { ActivityModel } from '@/lib/db/models/Activity';

// GET - Fetch all menu items with filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: any = {};

    if (category) query.category = category;
    if (available !== null && available !== undefined) query.available = available === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      MenuItemModel.find(query)
        .sort({ category: 1, order: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      MenuItemModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new menu item
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Get the highest order number for the category
    const highestOrder = await MenuItemModel.findOne({ category: body.category })
      .sort({ order: -1 })
      .select('order')
      .lean();

    const newItem = await MenuItemModel.create({
      ...body,
      order: highestOrder ? highestOrder.order + 1 : 0,
    });

    // Log activity
    await ActivityModel.create({
      type: 'create',
      item: newItem.name,
      category: newItem.category,
      details: { itemId: newItem._id },
    });

    return NextResponse.json({
      success: true,
      data: newItem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
