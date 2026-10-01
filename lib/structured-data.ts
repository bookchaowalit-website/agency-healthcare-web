import type { PseoService } from './pseo.ts';
import { absoluteUrl, siteConfig } from './site-config.ts';
import type { SiteConfig } from './site-config.ts';

/** JSON-LD for a service page; `<` is escaped so the payload cannot close the script tag. */
export function serviceStructuredData(service: PseoService, config: SiteConfig = siteConfig) {
  const canonical = config.publicUrl ? absoluteUrl('/services/' + service.slug + '/', config) : undefined;
  return JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.context,
      serviceType: service.name,
      inLanguage: 'th',
      ...(canonical ? { url: canonical } : {}),
      provider: { '@type': 'Organization', name: 'Solo Empire Group' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Services', ...(config.publicUrl ? { item: absoluteUrl('/services/', config) } : {}) },
        { '@type': 'ListItem', position: 2, name: service.title, ...(canonical ? { item: canonical } : {}) },
      ],
    },
  ]).replace(/</g, '\\u003c');
}
