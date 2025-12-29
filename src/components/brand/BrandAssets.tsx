import { useState } from 'react';
import { Download, Loader2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import JSZip from 'jszip';

import nextWordmark from '@/assets/next-wordmark.svg';
import nextWordmarkWhite from '@/assets/next-wordmark-white.svg';
import nextIcon from '@/assets/next-icon.svg';
import nextIconWhite from '@/assets/next-icon-white.svg';
import nextBillionLabWordmark from '@/assets/next-billion-lab-wordmark.svg';
import nextStacked from '@/assets/next-stacked.svg';
import base44Logo from '@/assets/base44-logo.svg';

interface BrandAsset {
  name: string;
  path: string;
  description: string;
  category: 'primary' | 'secondary' | 'partner';
}

const BRAND_ASSETS: BrandAsset[] = [
  { name: 'next-wordmark.svg', path: nextWordmark, description: 'Primary NEXT_ wordmark (blue)', category: 'primary' },
  { name: 'next-wordmark-white.svg', path: nextWordmarkWhite, description: 'NEXT_ wordmark for dark backgrounds', category: 'primary' },
  { name: 'next-icon.svg', path: nextIcon, description: 'Underscore icon with dark background', category: 'primary' },
  { name: 'next-icon-white.svg', path: nextIconWhite, description: 'Underscore icon (white)', category: 'primary' },
  { name: 'next-billion-lab-wordmark.svg', path: nextBillionLabWordmark, description: 'Full name wordmark', category: 'secondary' },
  { name: 'next-stacked.svg', path: nextStacked, description: 'Stacked logo for square formats', category: 'secondary' },
  { name: 'base44-logo.svg', path: base44Logo, description: 'Base44 AI builder partner logo', category: 'partner' },
];

export function BrandAssets() {
  const [downloading, setDownloading] = useState(false);

  const downloadAsset = async (asset: BrandAsset) => {
    try {
      const response = await fetch(asset.path);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = asset.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Downloaded!',
        description: `${asset.name} saved successfully`,
      });
    } catch {
      toast({
        title: 'Download failed',
        description: 'Could not download the asset',
        variant: 'destructive',
      });
    }
  };

  const downloadBrandKit = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('next-brand-kit');
      
      if (!folder) throw new Error('Failed to create folder');

      // Add all assets to ZIP
      for (const asset of BRAND_ASSETS) {
        const response = await fetch(asset.path);
        const blob = await response.blob();
        folder.file(asset.name, blob);
      }

      // Add brand guidelines text file
      const guidelines = `
NEXT_ Brand System
==================

Logo Concept: The Underscore (_) represents the moment before creation - 
the blinking cursor waiting for the next command.

LOGO VARIATIONS
---------------
Wordmark: NEXT_ (with animated cursor)
Icon: _ (underscore only)
Full Name: NEXT BILLION LAB_

COLOR PALETTE
-------------
- Deep Navy (Background): #0A0F1C / hsl(222, 47%, 7%)
- Electric Blue (Primary): #3B82F6 / hsl(217, 91%, 60%)
- Warm Gold (Accent): #F59E0B / hsl(38, 92%, 50%)
- White (Text): #FFFFFF

TYPOGRAPHY
----------
- Primary: Inter or system-ui
- Weights: Regular (400), Medium (500), Semibold (600), Bold (700)
- Wordmark: Bold weight, tight letter-spacing (-0.02em)

USAGE GUIDELINES
----------------
- Always maintain clear space around logos (minimum 1x height)
- Electric Blue for main brand elements
- Gold for CTAs, highlights, and the underscore accent
- Deep Navy for primary backgrounds
- White wordmark on dark backgrounds only
- Never distort, rotate, or add effects to logos

ANIMATION
---------
The underscore (_) should blink with a 1-second interval:
  @keyframes cursor-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

Contact: brand@nextbillionlab.com
      `.trim();
      
      folder.file('brand-guidelines.txt', guidelines);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'next-brand-kit.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Brand Kit Downloaded!',
        description: 'All assets and guidelines saved as ZIP',
      });
    } catch {
      toast({
        title: 'Download failed',
        description: 'Could not create brand kit',
        variant: 'destructive',
      });
    } finally {
      setDownloading(false);
    }
  };

  const primaryAssets = BRAND_ASSETS.filter(a => a.category === 'primary');
  const secondaryAssets = BRAND_ASSETS.filter(a => a.category === 'secondary');
  const partnerAssets = BRAND_ASSETS.filter(a => a.category === 'partner');

  const AssetGrid = ({ assets, title }: { assets: BrandAsset[], title: string }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="glass-card border border-border/50 rounded-xl overflow-hidden group hover:border-primary/30 transition-all"
          >
            <div className={`h-32 flex items-center justify-center p-4 ${asset.name.includes('white') || asset.name.includes('icon.svg') ? 'bg-card' : 'bg-background'}`}>
              <img
                src={asset.path}
                alt={asset.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4 space-y-2 border-t border-border/50">
              <p className="font-medium text-foreground text-sm truncate">{asset.name}</p>
              <p className="text-xs text-muted-foreground">{asset.description}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border/50 hover:border-primary/50"
                onClick={() => downloadAsset(asset)}
              >
                <Download className="w-3 h-3 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Brand Assets</h2>
          <p className="text-muted-foreground">Download individual assets or the complete brand kit</p>
        </div>
        <Button 
          onClick={downloadBrandKit} 
          disabled={downloading}
          className="bg-gold hover:bg-gold/90 text-background"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Package className="w-4 h-4 mr-2" />
          )}
          Download Brand Kit
        </Button>
      </div>

      <AssetGrid assets={primaryAssets} title="Primary Logos" />
      <AssetGrid assets={secondaryAssets} title="Secondary Variations" />
      <AssetGrid assets={partnerAssets} title="Partner Logos" />
    </section>
  );
}