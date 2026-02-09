import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import { SettingsModel } from '@/lib/db/models/Settings';

// GET - Fetch settings
export async function GET() {
  try {
    await connectDB();

    let settings = await SettingsModel.findOne().lean();

    // Create default settings if none exist
    if (!settings) {
      settings = await SettingsModel.create({
        name: process.env.RESTAURANT_NAME || 'Kuyash Place',
        phone: process.env.RESTAURANT_PHONE || '080-328-86802',
        email: process.env.RESTAURANT_EMAIL || 'kuyashplaceng@gmail.com',
        instagram: process.env.RESTAURANT_INSTAGRAM || '@kuyash_place',
        primaryColor: '#1a1a1a',
        secondaryColor: '#ea580c',
        accentColor: '#f97316',
        currency: 'NGN',
        currencySymbol: '₦',
        timezone: 'Africa/Lagos',
        language: 'en',
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    let settings = await SettingsModel.findOne();

    if (!settings) {
      settings = await SettingsModel.create(body);
    } else {
      settings = await SettingsModel.findOneAndUpdate({}, { $set: body }, { new: true });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
