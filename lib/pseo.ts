export type PseoService = Readonly<{
  kind: 'service';
  slug: string;
  name: string;
  title: string;
  description: string;
  intent: string;
  buyer: string;
  context: string;
  workflow: readonly string[];
  deliverables: readonly string[];
  evidence: readonly string[];
  readiness: string;
  agencySlug: string;
  agencyName: string;
  agencyThaiName: string;
  agencyStatus: 'incubating' | 'target' | 'locked';
  agencyStage: string;
}>;

export const pseoService: PseoService = {
  "kind": "service",
  "slug": "health-medtech-readiness-map",
  "name": "Health and medtech readiness map (future)",
  "title": "Health & Medtech Readiness Map สำหรับระบบที่มีความเสี่ยงสูง",
  "description": "วางแผนระบบและ evidence boundary ผ่านผู้เชี่ยวชาญที่มีคุณสมบัติและใบอนุญาตเหมาะสม",
  "intent": "ต้องการจัดระบบ คน ข้อมูล และ evidence ของ health หรือ medtech use case ก่อนพัฒนาและขอคำปรึกษาเฉพาะทาง",
  "buyer": "Healthcare operator, provider และ medtech founder",
  "context": "เป็น future capability สำหรับ readiness map ไม่ใช่บริการทางการแพทย์ การวินิจฉัย หรือการรับข้อมูลสุขภาพ",
  "workflow": [
    "กำหนด use case, care context และผู้รับผิดชอบ",
    "แยก health data, safety, privacy และ clinical question",
    "ทำ evidence และ specialist handoff map",
    "จัด readiness backlog ก่อนเริ่ม pilot ที่ได้รับอนุญาต"
  ],
  "deliverables": [
    "use-case และ data boundary",
    "risk/evidence register",
    "clinical, privacy และ security handoff brief",
    "readiness backlog และ sign-off checklist"
  ],
  "evidence": [
    "ไม่ให้คำแนะนำทางการแพทย์หรืออ้าง clinical outcome",
    "ไม่เก็บ health data หรือ patient information ใน public site",
    "งาน regulated ต้องมีผู้เชี่ยวชาญและการอนุญาตตามกฎหมาย"
  ],
  "readiness": "ต้องมี healthcare lead, qualified clinical/privacy reviewer, consent และ secure data boundary ก่อนเปิด inquiry",
  "agencySlug": "healthcare",
  "agencyName": "Healthcare",
  "agencyThaiName": "สุขภาพและการแพทย์",
  "agencyStatus": "locked",
  "agencyStage": "P3"
};
