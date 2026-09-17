import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site-config';
import { pseoService } from '@/lib/pseo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.isIndexable) return [];
  return ['/', '/services', '/services/' + pseoService.slug].map((path) => ({ url: absoluteUrl(path) }));
}
