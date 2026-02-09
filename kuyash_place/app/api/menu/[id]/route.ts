import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { MenuItemModel } from '@/lib/db/models/MenuItem';
import { ActivityModel } from '@/lib/db/models/Activity';

// GET - Fetch single menu item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const item = await MenuItemModel.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const oldItem = await MenuItemModel.findById(id);

    if (!oldItem) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    const updatedItem = await MenuItemModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    // Log activity
    await ActivityModel.create({
      type: 'update',
      item: updatedItem!.name,
      category: updatedItem!.category,
      details: {
        itemId: updatedItem!._id,
        changes: Object.keys(body),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedItem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const item = await MenuItemModel.findById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    await MenuItemModel.findByIdAndDelete(id);

    // Log activity
    await ActivityModel.create({
      type: 'delete',
      item: item.name,
      category: item.category,
      details: { itemId: id },
    });

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
