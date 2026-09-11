const item = (id, path, category, titleEn, titleAr, kind = "case") => ({
  id, path, category, titleEn, titleAr, kind,
});

export const mediaItems = [
  item("r01", "/media/restorative-dentistry/restorative-amalgam-breakdown-pre-op.jpeg", "restorative", "Amalgam breakdown and secondary caries — pre-operative", "تآكل حشو أملغم وتسوس ثانوي — قبل العلاج"),
  item("r02", "/media/restorative-dentistry/restorative-anterior-aesthetic-smile-before-after.jpeg", "restorative", "Anterior aesthetic smile — before and after", "ترميم تجميلي أمامي للابتسامة — قبل وبعد"),
  item("r03", "/media/restorative-dentistry/restorative-anterior-palatal-caries-pre-post.jpeg", "restorative", "Anterior palatal caries — pre and post treatment", "تسوس حنكي أمامي — قبل وبعد العلاج"),
  item("r04", "/media/restorative-dentistry/restorative-class-i-step-by-step-collage.jpeg", "restorative", "Class I composite restoration — step by step", "ترميم كومبوزيت Class I — خطوة بخطوة"),
  item("r05", "/media/restorative-dentistry/restorative-composite-layering-technique.jpeg", "restorative", "Anatomical composite layering technique", "تقنية الطبقات التشريحية بالكومبوزيت"),
  item("r06", "/media/restorative-dentistry/restorative-maxillary-molar-restoration.jpeg", "restorative", "Maxillary molar direct restoration", "ترميم مباشر لضرس علوي"),
  item("r07", "/media/restorative-dentistry/restorative-mirror-view-cavity-prep.jpeg", "restorative", "Mirror view of conservative cavity preparation", "منظر بالمرآة لتحضير محافظ للتجويف"),
  item("r08", "/media/restorative-dentistry/restorative-molar-composite-before-after.jpeg", "restorative", "Posterior composite — before and after", "ترميم كومبوزيت خلفي — قبل وبعد"),
  item("r09", "/media/restorative-dentistry/restorative-rubber-dam-posterior-buildup.jpeg", "restorative", "Posterior build-up under rubber dam", "بناء خلفي تحت العزل المطاطي"),

  item("c01", "/media/clinical-cases/case01-isolation-matrix-preparation.jpeg", "clinical", "Isolation, matrix placement and preparation", "العزل وتركيب الماتريكس وتحضير التجويف"),
  item("c02", "/media/clinical-cases/case02-broken-crown-pre-op.jpeg", "clinical", "Broken clinical crown — pre-operative", "كسر بالتاج السريري — قبل العلاج"),
  item("c03", "/media/clinical-cases/case02-rubber-dam-butterfly-clamp.jpeg", "clinical", "Butterfly clamp rubber dam isolation", "عزل مطاطي باستخدام Butterfly Clamp"),
  item("c04", "/media/clinical-cases/case03-cervical-reconstruction-transformation.jpeg", "clinical", "Cervical reconstruction transformation", "إعادة بناء عنق السن — النتيجة التحويلية"),
  item("c05", "/media/clinical-cases/case03-clinical-quadrant-view.jpeg", "clinical", "Clinical quadrant overview", "منظر سريري شامل للربع السني"),
  item("c06", "/media/clinical-cases/case03-occlusal-cavity-prep-rubber-dam.jpeg", "clinical", "Occlusal cavity preparation under rubber dam", "تحضير إطباقي تحت العزل المطاطي"),
  item("c07", "/media/clinical-cases/case03-pediatric-anterior-aesthetic-makeover.jpeg", "clinical", "Pediatric anterior aesthetic restoration", "ترميم تجميلي أمامي لطفل"),
  item("c08", "/media/clinical-cases/case03-posterior-composite-art-transformation.jpeg", "clinical", "Posterior composite anatomical transformation", "إعادة تشكيل تشريحي بكومبوزيت خلفي"),
  item("c09", "/media/clinical-cases/case04-quadrant-rubber-dam-isolation.jpeg", "clinical", "Quadrant rubber dam isolation", "عزل مطاطي كامل لربع الأسنان"),
  item("c10", "/media/clinical-cases/case04-sectional-matrix-ring-placement.jpeg", "clinical", "Sectional matrix and separation ring placement", "تركيب Sectional Matrix وحلقة الفصل"),
  item("c11", "/media/clinical-cases/case04-upper-arch-restoration-final.jpeg", "clinical", "Upper arch restoration — final view", "ترميم القوس العلوي — النتيجة النهائية"),

  item("e01", "/media/endodontics/endo-obturated-molar-crown-radiograph.jpeg", "endodontics", "Obturated molar with crown — radiographic review", "ضرس محشو الجذور مع تاج — مراجعة بالأشعة"),
  item("e02", "/media/endodontics/endo-periapical-curved-canals-radiograph.jpeg", "endodontics", "Curved root canals — periapical radiograph", "قنوات جذرية منحنية — أشعة حول ذروية"),
  item("e03", "/media/endodontics/endo-post-obturation-seal-radiograph.jpeg", "endodontics", "Post-obturation apical seal", "إحكام ذروي بعد حشو القنوات"),
  item("e04", "/media/endodontics/endo-working-length-radiograph.jpeg", "endodontics", "Working-length confirmation radiograph", "أشعة تأكيد طول العمل"),

  item("s01", "/media/oral-surgery/lower-molar-root-separation-extraction.jpeg", "surgery", "Lower molar root separation and extraction", "فصل جذور ضرس سفلي وخلعه"),

  item("p01", "/media/prosthodontics/anterior-rehabilitation-smile-after.jpeg", "prosthodontics", "Anterior rehabilitation — final smile", "إعادة تأهيل الأسنان الأمامية — الابتسامة النهائية"),
  item("p02", "/media/prosthodontics/anterior-rehabilitation-smile-before.jpeg", "prosthodontics", "Anterior rehabilitation — initial smile", "إعادة تأهيل الأسنان الأمامية — قبل العلاج"),
  item("p03", "/media/prosthodontics/bridge-3unit-prep-and-cementation.jpeg", "prosthodontics", "Three-unit bridge — preparation and cementation", "جسر ثلاثي — التحضير والتثبيت"),
  item("p04", "/media/prosthodontics/custom-stamp-technique-matrix.jpeg", "prosthodontics", "Custom stamp technique matrix", "ماتريكس مخصص بتقنية Stamp"),
  item("p05", "/media/prosthodontics/endocrown-preparation-retraction-cord.jpeg", "prosthodontics", "Endocrown preparation and retraction cord", "تحضير Endocrown وخيط إزاحة اللثة"),
  item("p06", "/media/prosthodontics/maxillary-bridge-cemented-after.jpeg", "prosthodontics", "Maxillary bridge — after cementation", "جسر علوي — بعد التثبيت"),
  item("p07", "/media/prosthodontics/maxillary-edentulous-space-before.jpeg", "prosthodontics", "Maxillary edentulous space — pre-operative", "فراغ سني علوي — قبل العلاج"),
  item("p08", "/media/prosthodontics/metal-framework-try-in.jpeg", "prosthodontics", "Metal framework clinical try-in", "تجربة الإطار المعدني سريريًا"),

  item("d01", "/media/concept/floating-ceramic-molar.png", "concept", "Floating ceramic molar", "الضرس السيراميكي العائم", "concept"),
  item("d02", "/media/concept/glass-root-canal-tooth.png", "concept", "Glass tooth with illuminated root canals", "سن زجاجي بقنوات جذرية مضيئة", "concept"),
  item("d03", "/media/concept/precision-crown-fit.png", "concept", "Precision ceramic crown marginal fit", "دقة حواف التاج السيراميكي", "concept"),
  item("d04", "/media/concept/sapphire-orthodontic-bracket.png", "concept", "Sapphire orthodontic bracket", "فص تقويم سافاير شفاف", "concept"),
  item("d05", "/media/concept/rubber-dam-isolation.png", "concept", "Absolute isolation visual system", "النظام البصري للعزل المطلق", "concept"),
  item("d06", "/media/concept/digital-dental-arches.png", "concept", "Minimal digital dental arches", "أقواس سنية رقمية بنمط Minimal Tech", "concept"),

  item("a01", "/media/certificates-and-awards/cert-asker-orthodontics-ada-cerp-84hrs.png", "credentials", "Clinical Orthodontic Secrets — 84 credit hours", "دورة أسرار التقويم السريري — 84 ساعة معتمدة", "credential"),
  item("a02", "/media/certificates-and-awards/cert-capp-ada-cerp-periodontology-webinar-1hr.jpeg", "credentials", "Periodontology treatment guidelines — 1 CE hour", "إرشادات العلاج في دواعم الأسنان — ساعة معتمدة", "credential"),
  item("a03", "/media/certificates-and-awards/cert-idc23-international-dental-congress-18hrs.jpeg", "credentials", "International Dental Congress 2023 — 18 hours", "المؤتمر الدولي لطب الأسنان 2023 — 18 ساعة", "credential"),
  item("a04", "/media/certificates-and-awards/cert-idc26-international-dental-congress-24hrs.jpeg", "credentials", "International Dental Congress 2026 — 24 hours", "المؤتمر الدولي لطب الأسنان 2026 — 24 ساعة", "credential"),
  item("a05", "/media/certificates-and-awards/cert-trophy-appreciation-asker-orthodontics.png", "credentials", "Asker Orthodontics appreciation award", "درع تقدير Asker Orthodontics", "credential"),
];

export const clinicalMedia = mediaItems.filter(({ kind }) => kind === "case" || kind === "concept");
export const credentialMedia = mediaItems.filter(({ kind }) => kind === "credential");
export const conceptMedia = mediaItems.filter(({ kind }) => kind === "concept");
