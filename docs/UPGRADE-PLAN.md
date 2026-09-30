# Upgrade plan — agency-healthcare-web

## สถานะปัจจุบัน: 8/10 (เดิม 6/10)

Static showcase ทำงานครบ มี lint/typecheck/unit test/build ใน CI และ indexing gate
ถูกทดสอบแล้ว; มี OG image แล้ว แต่ยังไม่ได้ยืนยัน public URL

## Backlog

### P0
- (ไม่มี)

### P1
- ยืนยัน public URL ที่อนุมัติ แล้วตั้ง `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_SITE_INDEXABLE` บน Vercel
- ย้าย `Artifact` switch (ทุก motif ของทุก vertical) ออกเป็น component ร่วม
  หรือเก็บเฉพาะ motif ของ site นี้เพื่อลด dead code

### P2
- เพิ่ม service page ที่สองเมื่อมี offer ที่อนุมัติแล้ว (`lib/pseo.ts` รองรับ service เดียว)
- ตรวจ contrast ของสี `muted` บน `panel` ด้วยเครื่องมืออัตโนมัติ

## Done in this pass
- เพิ่ม ESLint (`eslint-config-next` 16.3.3) และแก้ error `<a>` → `next/link` บนหน้าแรก
- `lib/site-config.ts` เป็น pure resolver (`resolveSiteConfig(env)`) ที่ทดสอบได้;
  JSON-LD แยกไป `lib/structured-data.ts`
- `tests/site.test.ts`: noindex gate, URL parsing, canonical/robots metadata,
  sitemap trailing slash, JSON-LD escaping, ความถูกต้องของข้อมูล service
- ลิงก์ภายในใช้ trailing slash ให้ตรงกับ `trailingSlash: true` (ไม่ต้อง redirect),
  canonical/sitemap ใช้ path เดียวกัน, OG มี `locale`/`url`
- breadcrumb เป็น `<nav aria-label>` พร้อม `aria-current`; หน้า 404 มีลิงก์กลับหน้าแรก
- GitHub Actions CI และ task `lint`/`test` ใน Taskfile; ignore `*.tsbuildinfo`

## Done in this pass (pass 2)
- เพิ่ม `app/opengraph-image.tsx` (PNG 1200×630 สร้างตอน build, `force-static` รองรับ `output: 'export'`)
  ใช้ palette/ชื่อ/scope จาก `lib/site.ts`; ข้อความเป็น ASCII เพราะ font ของ `ImageResponse` ไม่มี glyph ภาษาไทย
- Twitter card เปลี่ยนจาก `summary` เป็น `summary_large_image` ทั้ง layout และ `pageMetadata`
- test ใหม่ใน `tests/site.test.ts`: ข้อความบน social card เป็น ASCII และทุกหน้าใช้ large card
- ตรวจแล้วว่า sitemap/robots ใช้ pattern ที่ migrate แล้ว (`app/sitemap.ts`/`app/robots.ts` + `NEXT_PUBLIC_SITE_URL`, noindex เป็นค่าเริ่มต้น) — ไม่มีไฟล์ static ค้าง

## Done in this pass (pass 3)
- Edge-case pass on `lib/site-config.ts` (regression tests in `tests/site.test.ts`):
  - `parsePublicUrl` accepted `NEXT_PUBLIC_SITE_URL` values with a query,
    fragment or `user:password`; because paths are appended to that value,
    canonical/sitemap URLs became `https://x/?ref=a/services/` or leaked the
    credentials. Such values are now rejected (site stays noindex).
  - Only one trailing slash was stripped, so `https://example.com//` produced
    `https://example.com//services/`; all trailing slashes are now stripped.
