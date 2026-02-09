import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { appConfig } from '@/lib/config/app';

// POST - Generate QR code for menu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, size, errorCorrection } = body;

    const menuUrl = url || `${appConfig.url}/menu/view`;
    const qrSize = size || appConfig.qr.size;
    const errorCorrectionLevel = errorCorrection || appConfig.qr.errorCorrection;

    // Generate QR code as data URL
    const qrDataURL = await QRCode.toDataURL(menuUrl, {
      errorCorrectionLevel,
      width: qrSize,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        qrCode: qrDataURL,
        url: menuUrl,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Generate QR code as image (for direct download)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || `${appConfig.url}/menu/view`;
    const size = parseInt(searchParams.get('size') || String(appConfig.qr.size));

    const qrBuffer = await QRCode.toBuffer(url, {
      errorCorrectionLevel: appConfig.qr.errorCorrection,
      width: size,
      margin: 2,
    });

    return new NextResponse(qrBuffer as any, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="menu-qr-code.png"',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
