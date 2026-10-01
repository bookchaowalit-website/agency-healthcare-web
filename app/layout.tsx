import type { Metadata } from 'next';
import { Noto_Sans_Thai, Noto_Serif_Thai } from 'next/font/google';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { siteConfig } from '@/lib/site-config';
import './globals.css';

const sans = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '500', '600', '700'], variable: '--font-sans-thai', display: 'swap' });
const serif = Noto_Serif_Thai({ subsets: ['thai'], weight: ['400', '600', '700'], variable: '--font-serif-thai', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadataUrl),
  title: { default: site.name + ' — ' + site.thaiName, template: '%s — ' + site.name },
  description: site.promise,
  openGraph: { type: 'website', locale: 'th_TH', siteName: site.name, title: site.name + ' — ' + site.thaiName, description: site.promise },
  twitter: { card: 'summary_large_image', title: site.name + ' — ' + site.thaiName, description: site.promise },
  ...(siteConfig.publicUrl ? { alternates: { canonical: siteConfig.publicUrl } } : {}),
  robots: siteConfig.isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="th" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main-content">ข้ามไปเนื้อหาหลัก</a>{children}</body></html>;
}
