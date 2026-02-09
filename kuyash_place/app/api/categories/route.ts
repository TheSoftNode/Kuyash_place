import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { CategoryModel } from '@/lib/db/models/Category';

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const query = activeOnly ? { isActive: true } : {};

    const categories = await CategoryModel.find(query)
      .sort({ order: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Get the highest order number
    const highestOrder = await CategoryModel.findOne()
      .sort({ order: -1 })
      .select('order')
      .lean();

    const newCategory = await CategoryModel.create({
      ...body,
      order: highestOrder ? highestOrder.order + 1 : 0,
    });

    return NextResponse.json({
      success: true,
      data: newCategory,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
