const item = (id, path, category, titleEn, titleAr, kind) => ({ id, path, category, titleEn, titleAr, kind });

export const conceptMedia = [
  item("d01", "/media/concept/floating-ceramic-molar.png", "concept", "Floating ceramic molar", "الضرس السيراميكي العائم", "concept"),
  item("d02", "/media/concept/glass-root-canal-tooth.png", "concept", "Glass tooth with illuminated root canals", "سن زجاجي بقنوات جذرية مضيئة", "concept"),
  item("d03", "/media/concept/precision-crown-fit.png", "concept", "Precision ceramic crown marginal fit", "دقة حواف التاج السيراميكي", "concept"),
  item("d04", "/media/concept/sapphire-orthodontic-bracket.png", "concept", "Sapphire orthodontic bracket", "فص تقويم سافاير شفاف", "concept"),
  item("d05", "/media/concept/rubber-dam-isolation.png", "concept", "Absolute isolation visual system", "النظام البصري للعزل المطلق", "concept"),
  item("d06", "/media/concept/digital-dental-arches.png", "concept", "Minimal digital dental arches", "أقواس سنية رقمية بنمط Minimal Tech", "concept"),
];

export const credentialMedia = [
  item("a01", "/media/certificates-and-awards/cert-asker-orthodontics-ada-cerp-84hrs.png", "credentials", "Clinical Orthodontic Secrets — 84 credit hours", "دورة أسرار تقويم الأسنان — 84 ساعة معتمدة", "credential"),
  item("a02", "/media/certificates-and-awards/cert-capp-ada-cerp-periodontology-webinar-1hr.jpeg", "credentials", "Periodontology treatment guidelines — 1 CE hour", "إرشادات العلاج في دواعم الأسنان — ساعة معتمدة", "credential"),
  item("a03", "/media/certificates-and-awards/cert-idc23-international-dental-congress-18hrs.jpeg", "credentials", "International Dental Congress 2023 — 18 hours", "المؤتمر الدولي لطب الأسنان 2023 — 18 ساعة", "credential"),
  item("a04", "/media/certificates-and-awards/cert-idc26-international-dental-congress-24hrs.jpeg", "credentials", "International Dental Congress 2026 — 24 hours", "المؤتمر الدولي لطب الأسنان 2026 — 24 ساعة", "credential"),
  item("a05", "/media/certificates-and-awards/cert-trophy-appreciation-asker-orthodontics.png", "credentials", "Asker Orthodontics appreciation award", "درع تقدير Asker Orthodontics", "credential"),
];

export const mediaItems = [...conceptMedia, ...credentialMedia];
