# Upgrade plan — agency-healthcare-web

## สถานะปัจจุบัน: 8/10 (เดิม 6/10)

Static showcase ทำงานครบ มี lint/typecheck/unit test/build ใน CI และ indexing gate
ถูกทดสอบแล้ว; ยังไม่มี OG image และยังไม่ได้ยืนยัน public URL

## Backlog

### P0
- (ไม่มี)

### P1
- เพิ่ม `app/opengraph-image.tsx` ตาม palette ใน `lib/site.ts` (ตอนนี้ card เป็น `summary` ไม่มีรูป)
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
