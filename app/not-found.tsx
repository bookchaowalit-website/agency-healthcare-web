import Link from 'next/link';

export default function NotFound() {
  return <main id="main-content" className="site-main"><section className="story-section"><h1>ไม่พบหน้านี้</h1><p>กลับไปที่<Link href="/">หน้า showcase หลัก</Link>เพื่อดูขอบเขตของ vertical นี้</p></section></main>;
}
