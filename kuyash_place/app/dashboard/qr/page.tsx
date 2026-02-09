'use client';

import { useState } from 'react';
import { QrCode, Download, Copy, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { qrAPI } from '@/lib/api/client';
import { useSettings } from '@/lib/hooks/useSettings';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function QRCodePage() {
  const { settings } = useSettings();
  const [qrCode, setQrCode] = useState<string>('');
  const [menuUrl, setMenuUrl] = useState('');
  const [qrSize, setQrSize] = useState('512');
  const [loading, setLoading] = useState(false);

  const fullMenuUrl = menuUrl || (typeof window !== 'undefined' ? `${window.location.origin}/menu/view` : '/menu/view');

  const generateQR = async () => {
    setLoading(true);
    try {
      const response: any = await qrAPI.generate({
        url: fullMenuUrl,
        size: parseInt(qrSize),
      });
      setQrCode(response.data.qrCode);
      toast.success('QR code generated successfully');
    } catch (error) {
      toast.error('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${settings?.name || 'menu'}-qr-code.png`;
    link.click();
    toast.success('QR code downloaded');
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(fullMenuUrl);
    toast.success('URL copied to clipboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-gray-600 mt-2">Generate a QR code for your digital menu</p>
      </div>

      {/* Configuration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Configuration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Menu URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={menuUrl}
                onChange={(e) => setMenuUrl(e.target.value)}
                placeholder={typeof window !== 'undefined' ? `${window.location.origin}/menu/view` : '/menu/view'}
              />
              <Button variant="outline" size="icon" onClick={copyUrl}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => window.open(fullMenuUrl, '_blank')}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">Leave empty to use default menu URL</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">QR Code Size</Label>
            <Select value={qrSize} onValueChange={setQrSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">Small (256x256)</SelectItem>
                <SelectItem value="512">Medium (512x512)</SelectItem>
                <SelectItem value="1024">Large (1024x1024)</SelectItem>
                <SelectItem value="2048">Extra Large (2048x2048)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateQR} disabled={loading} className="w-full">
            <QrCode className="w-4 h-4 mr-2" />
            {loading ? 'Generating...' : 'Generate QR Code'}
          </Button>
        </div>
      </Card>

      {/* QR Code Display */}
      {qrCode && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Your QR Code</h3>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img src={qrCode} alt="Menu QR Code" className="max-w-full h-auto" />
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={downloadQR}>
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  Print
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Scan this code to view the menu at: <br />
                <span className="font-mono text-xs">{fullMenuUrl}</span>
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Instructions */}
      <Card className="p-6 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
        <h3 className="text-lg font-semibold mb-3">How to use</h3>
        <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>1. Generate your QR code using the form above</li>
          <li>2. Download and print the QR code</li>
          <li>3. Place it on tables, menus, or anywhere customers can scan</li>
          <li>4. Customers scan the code to view your digital menu</li>
          <li>5. Update your menu anytime - the QR code stays the same!</li>
        </ol>
      </Card>
    </div>
  );
}
