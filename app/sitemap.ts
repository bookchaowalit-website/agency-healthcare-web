import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig, sitemapPaths } from '@/lib/site-config';
import { pseoService } from '@/lib/pseo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.isIndexable) return [];
  return sitemapPaths(pseoService.slug).map((path) => ({ url: absoluteUrl(path) }));
}
