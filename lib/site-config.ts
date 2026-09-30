import type { Metadata } from 'next';
import { site } from './site.ts';

export type SiteEnv = Readonly<Record<string, string | undefined>>;

/** Accept only absolute http(s) origins; strips a trailing slash. */
export function parsePublicUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
    return url.toString().replace(/\/$/, '');
  } catch {
    return undefined;
  }
}

/**
 * The site is noindex by default. It only becomes indexable when an approved
 * public URL is configured AND NEXT_PUBLIC_SITE_INDEXABLE is exactly "true".
 */
export function resolveSiteConfig(env: SiteEnv) {
  const publicUrl = parsePublicUrl(env.NEXT_PUBLIC_SITE_URL);
  return {
    name: site.name,
    description: site.promise,
    publicUrl,
    metadataUrl: publicUrl ?? 'http://localhost:3010',
    isIndexable: Boolean(publicUrl) && env.NEXT_PUBLIC_SITE_INDEXABLE === 'true',
  } as const;
}

export type SiteConfig = ReturnType<typeof resolveSiteConfig>;

export const siteConfig: SiteConfig = resolveSiteConfig({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_INDEXABLE: process.env.NEXT_PUBLIC_SITE_INDEXABLE,
});

export function absoluteUrl(path: string, config: SiteConfig = siteConfig) {
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  return config.metadataUrl + normalizedPath;
}

export function canonicalUrl(path: string, config: SiteConfig = siteConfig) {
  return config.publicUrl ? absoluteUrl(path, config) : undefined;
}

export function pageMetadata(title: string, description: string, path: string, config: SiteConfig = siteConfig): Metadata {
  const canonical = canonicalUrl(path, config);
  return {
    title,
    description,
    openGraph: { type: 'website', locale: 'th_TH', title, description, siteName: site.name, ...(canonical ? { url: canonical } : {}) },
    twitter: { card: 'summary_large_image', title, description },
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: config.isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Paths published in the sitemap (trailing slash matches `trailingSlash: true`). */
export function sitemapPaths(serviceSlug: string) {
  return ['/', '/services/', '/services/' + serviceSlug + '/'];
}
