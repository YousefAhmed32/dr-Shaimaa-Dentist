const stage = (id, path, titleEn, titleAr) => ({ id, path, titleEn, titleAr });

const clinicalCase = (id, category, titleEn, titleAr, stages, options = {}) => ({
  id,
  slug: options.slug ?? id,
  category,
  titleEn,
  titleAr,
  summaryEn: options.summaryEn ?? "",
  summaryAr: options.summaryAr ?? "",
  stages,
  featured: Boolean(options.featured),
  source: "curated",
});

export const curatedCases = [
  clinicalCase("case-001", "restorative", "Secondary caries beneath an amalgam restoration", "تسوّس ثانوي أسفل حشو أملغم", [
    stage("01-pre-operative", "/media/clinical-cases/case-001-secondary-caries/01-pre-operative.jpeg", "Pre-operative assessment", "الفحص قبل العلاج"),
    stage("02-isolation-and-matrix", "/media/clinical-cases/case-001-secondary-caries/02-isolation-and-matrix.jpeg", "Isolation, preparation and matrix placement", "العزل والتحضير وتركيب الماتريكس"),
  ], { featured: true }),
  clinicalCase("case-002", "restorative", "Broken posterior crown under absolute isolation", "كسر بالجزء الظاهر من سن خلفي تحت العزل المطاطي", [
    stage("01-pre-operative", "/media/clinical-cases/case-002-broken-crown/01-pre-operative.jpeg", "Pre-operative view", "الحالة قبل العلاج"),
    stage("02-butterfly-clamp", "/media/clinical-cases/case-002-broken-crown/02-butterfly-clamp-isolation.jpeg", "Butterfly-clamp rubber dam isolation", "العزل المطاطي باستخدام مشبك الفراشة"),
  ]),
  clinicalCase("case-003", "restorative", "Cervical composite reconstruction", "إعادة بناء تجميلية لعنق السن", [
    stage("01-transformation", "/media/clinical-cases/case-003-cervical-reconstruction/01-transformation.jpeg", "Before-and-after transformation", "مقارنة قبل العلاج وبعده"),
  ]),
  clinicalCase("case-004", "restorative", "Conservative occlusal restoration", "ترميم إطباقي محافظ", [
    stage("01-quadrant-view", "/media/clinical-cases/case-004-occlusal-restoration/01-clinical-quadrant-view.jpeg", "Clinical quadrant assessment", "فحص الربع السني"),
    stage("02-cavity-preparation", "/media/clinical-cases/case-004-occlusal-restoration/02-cavity-preparation-under-rubber-dam.jpeg", "Cavity preparation under rubber dam", "تحضير التجويف تحت العزل المطاطي"),
  ]),
  clinicalCase("case-005", "restorative", "Pediatric anterior aesthetic restoration", "ترميم تجميلي للأسنان الأمامية لطفل", [
    stage("01-transformation", "/media/clinical-cases/case-005-pediatric-anterior/01-aesthetic-transformation.jpeg", "Aesthetic transformation", "النتيجة التجميلية"),
  ], { featured: true }),
  clinicalCase("case-006", "restorative", "Posterior anatomical composite restoration", "ترميم كومبوزيت تشريحي لسن خلفي", [
    stage("01-transformation", "/media/clinical-cases/case-006-posterior-composite/01-anatomical-transformation.jpeg", "Anatomical transformation", "إعادة التشكيل التشريحي"),
  ]),
  clinicalCase("case-007", "restorative", "Upper-arch restorative sequence", "مراحل ترميم أسنان القوس العلوي", [
    stage("01-isolation", "/media/clinical-cases/case-007-upper-arch-restorations/01-quadrant-isolation.jpeg", "Quadrant rubber dam isolation", "عزل مطاطي كامل للربع السني"),
    stage("02-sectional-matrix", "/media/clinical-cases/case-007-upper-arch-restorations/02-sectional-matrix-ring.jpeg", "Sectional matrix and separation ring", "تركيب الماتريكس القطاعي وحلقة الفصل"),
    stage("03-final", "/media/clinical-cases/case-007-upper-arch-restorations/03-final-upper-arch.jpeg", "Final upper-arch view", "النتيجة النهائية للقوس العلوي"),
  ], { featured: true }),

  clinicalCase("case-008", "restorative", "Anterior aesthetic smile restoration", "ترميم تجميلي أمامي للابتسامة", [stage("01-before-after", "/media/restorative-dentistry/restorative-anterior-aesthetic-smile-before-after.jpeg", "Before and after", "قبل العلاج وبعده")]),
  clinicalCase("case-009", "restorative", "Anterior palatal caries restoration", "ترميم تسوّس حنكي بالأسنان الأمامية", [stage("01-before-after", "/media/restorative-dentistry/restorative-anterior-palatal-caries-pre-post.jpeg", "Before and after treatment", "قبل العلاج وبعده")]),
  clinicalCase("case-010", "restorative", "Class I direct composite restoration", "ترميم كومبوزيت مباشر من الفئة الأولى", [stage("01-workflow", "/media/restorative-dentistry/restorative-class-i-step-by-step-collage.jpeg", "Step-by-step workflow", "مراحل العلاج خطوة بخطوة")], { featured: true }),
  clinicalCase("case-011", "restorative", "Anatomical composite layering", "بناء تشريحي بطبقات الكومبوزيت", [stage("01-layering", "/media/restorative-dentistry/restorative-composite-layering-technique.jpeg", "Layering technique", "تقنية بناء الطبقات")]),
  clinicalCase("case-012", "restorative", "Direct restoration of a maxillary molar", "ترميم مباشر لضرس علوي", [stage("01-final", "/media/restorative-dentistry/restorative-maxillary-molar-restoration.jpeg", "Clinical result", "النتيجة السريرية")]),
  clinicalCase("case-013", "restorative", "Conservative cavity preparation", "تحضير محافظ للتجويف", [stage("01-preparation", "/media/restorative-dentistry/restorative-mirror-view-cavity-prep.jpeg", "Mirror-view preparation", "التحضير بمنظر المرآة")]),
  clinicalCase("case-014", "restorative", "Posterior composite restoration", "ترميم كومبوزيت خلفي", [stage("01-before-after", "/media/restorative-dentistry/restorative-molar-composite-before-after.jpeg", "Before and after", "قبل العلاج وبعده")]),
  clinicalCase("case-015", "restorative", "Posterior build-up under rubber dam", "بناء خلفي تحت العزل المطاطي", [stage("01-isolated-build-up", "/media/restorative-dentistry/restorative-rubber-dam-posterior-buildup.jpeg", "Isolated build-up", "البناء تحت العزل")]),

  clinicalCase("case-016", "prosthodontics", "Anterior rehabilitation", "إعادة تأهيل الأسنان الأمامية", [
    stage("01-before", "/media/prosthodontics/anterior-rehabilitation-smile-before.jpeg", "Initial smile", "الابتسامة قبل العلاج"),
    stage("02-after", "/media/prosthodontics/anterior-rehabilitation-smile-after.jpeg", "Final smile", "الابتسامة النهائية"),
  ], { featured: true }),
  clinicalCase("case-017", "prosthodontics", "Three-unit fixed bridge", "جسر ثابت مكوّن من ثلاث وحدات", [stage("01-workflow", "/media/prosthodontics/bridge-3unit-prep-and-cementation.jpeg", "Preparation and cementation", "التحضير والتثبيت")]),
  clinicalCase("case-018", "prosthodontics", "Custom stamp technique", "تقنية الختم المخصّص", [stage("01-matrix", "/media/prosthodontics/custom-stamp-technique-matrix.jpeg", "Custom matrix", "الماتريكس المخصّص")]),
  clinicalCase("case-019", "prosthodontics", "Endocrown preparation", "تحضير لتركيبة الإندوكراون", [stage("01-preparation", "/media/prosthodontics/endocrown-preparation-retraction-cord.jpeg", "Preparation and retraction cord", "التحضير وخيط إزاحة اللثة")]),
  clinicalCase("case-020", "prosthodontics", "Maxillary fixed bridge", "جسر ثابت بالفك العلوي", [
    stage("01-before", "/media/prosthodontics/maxillary-edentulous-space-before.jpeg", "Edentulous space before treatment", "الفراغ السني قبل العلاج"),
    stage("02-after", "/media/prosthodontics/maxillary-bridge-cemented-after.jpeg", "Bridge after cementation", "الجسر بعد التثبيت"),
  ], { featured: true }),
  clinicalCase("case-021", "prosthodontics", "Metal framework try-in", "تجربة الإطار المعدني للتركيبة", [stage("01-try-in", "/media/prosthodontics/metal-framework-try-in.jpeg", "Clinical try-in", "التجربة داخل الفم")]),

  clinicalCase("case-022", "endodontics", "Root-filled molar with full-coverage crown", "ضرس محشو الجذور مع تاج كامل", [stage("01-radiograph", "/media/endodontics/endo-obturated-molar-crown-radiograph.jpeg", "Radiographic review", "المراجعة بالأشعة")]),
  clinicalCase("case-023", "endodontics", "Curved root canal anatomy", "قنوات جذرية منحنية", [stage("01-radiograph", "/media/endodontics/endo-periapical-curved-canals-radiograph.jpeg", "Periapical radiograph", "أشعة حول ذروية")], { featured: true }),
  clinicalCase("case-024", "endodontics", "Post-obturation apical seal", "إحكام ذروي بعد حشو القنوات", [stage("01-radiograph", "/media/endodontics/endo-post-obturation-seal-radiograph.jpeg", "Post-obturation radiograph", "أشعة بعد حشو القنوات")]),
  clinicalCase("case-025", "endodontics", "Working-length confirmation", "تأكيد طول العمل داخل القنوات", [stage("01-radiograph", "/media/endodontics/endo-working-length-radiograph.jpeg", "Working-length radiograph", "أشعة تأكيد طول العمل")]),
  clinicalCase("case-026", "surgery", "Lower molar root separation and extraction", "فصل جذور ضرس سفلي وخلعه", [stage("01-procedure", "/media/oral-surgery/lower-molar-root-separation-extraction.jpeg", "Clinical procedure", "الإجراء السريري")]),
];

export const curatedImageCount = curatedCases.reduce((total, item) => total + item.stages.length, 0);
