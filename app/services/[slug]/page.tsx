import { notFound } from 'next/navigation';
import { PseoLandingPage } from '@/components/pseo-page';
import { pseoService } from '@/lib/pseo';
import { pageMetadata } from '@/lib/site-config';

export function generateStaticParams() {
  return [{ slug: pseoService.slug }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return slug === pseoService.slug ? pageMetadata(pseoService.title, pseoService.description, '/services/' + pseoService.slug) : pageMetadata('Service', 'ไม่พบ service', '/services');
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== pseoService.slug) notFound();
  return <PseoLandingPage />;
}
