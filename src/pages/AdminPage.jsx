import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Download, FileJson, ImagePlus, Save, ShieldCheck, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { createLocalCaseId, useClinicalCases } from "../hooks/useClinicalCases";

const labels = {
  ar: {
    kicker: "إدارة المحتوى المحلية",
    title: "إضافة حالة علاجية مرتّبة.",
    lead: "أنشئي الحالة مرة واحدة، ثم أضيفي صورها كمراحل متتابعة بدل ظهور كل صورة كعمل منفصل.",
    localTitle: "مهم قبل الاستخدام",
    localNote: "هذه لوحة Frontend بلا خادم. الإضافات تُحفظ على هذا الجهاز والمتصفح فقط. لتظهر للزوار على الموقع المنشور، صدّري ملف البيانات وسلّميه للمطور لإدراجه ثم إعادة النشر.",
    formTitle: "بيانات الحالة",
    titleAr: "اسم الحالة بالعربية",
    titleEn: "اسم الحالة بالإنجليزية",
    category: "التخصص",
    summaryAr: "ملخص عربي — اختياري",
    summaryEn: "English summary — optional",
    stagesTitle: "صور ومراحل الحالة",
    stagesHint: "اختاري الصور بترتيب التنفيذ، ثم عدّلي اسم كل مرحلة أو حرّكيها لأعلى وأسفل.",
    addImages: "إضافة صور",
    noImages: "لم تُضف صور بعد.",
    stageAr: "اسم المرحلة بالعربية",
    stageEn: "Stage name in English",
    moveUp: "تحريك لأعلى",
    moveDown: "تحريك لأسفل",
    remove: "حذف الصورة",
    consent: "أؤكد وجود موافقة مناسبة لعرض الصور وعدم احتوائها على بيانات تكشف هوية المريض.",
    save: "حفظ الحالة على هذا الجهاز",
    saved: "تم حفظ الحالة محليًا وإضافتها إلى معرض الأعمال على هذا الجهاز.",
    required: "أكملي اسمي الحالة، أضيفي صورة واحدة على الأقل، وأكدي بند الخصوصية.",
    storageError: "تعذر الحفظ لأن مساحة المتصفح غير كافية. صدّري الحالات الحالية أو استخدمي صورًا أصغر.",
    library: "الحالات المضافة محليًا",
    empty: "لا توجد حالات محلية حتى الآن.",
    export: "تصدير نسخة JSON",
    import: "استيراد نسخة",
    importError: "ملف النسخة غير صالح.",
    imported: "تم استيراد النسخة المحلية.",
    preview: "معاينة معرض الأعمال",
    images: "صور",
  },
  en: {
    kicker: "Local content manager",
    title: "Add one structured clinical case.",
    lead: "Create a case once, then arrange its images as treatment stages instead of publishing each image as a separate item.",
    localTitle: "Before you use this page",
    localNote: "This is a frontend-only manager with no server. Additions are stored only in this browser on this device. To publish them for every visitor, export the data file and give it to the developer for integration and redeployment.",
    formTitle: "Case details",
    titleAr: "Arabic case title",
    titleEn: "English case title",
    category: "Discipline",
    summaryAr: "Arabic summary — optional",
    summaryEn: "English summary — optional",
    stagesTitle: "Case images and stages",
    stagesHint: "Select images in treatment order, then edit each stage name or move it up and down.",
    addImages: "Add images",
    noImages: "No images added yet.",
    stageAr: "Arabic stage name",
    stageEn: "English stage name",
    moveUp: "Move up",
    moveDown: "Move down",
    remove: "Remove image",
    consent: "I confirm appropriate consent to display these images and that they contain no patient-identifying information.",
    save: "Save case on this device",
    saved: "The case was saved locally and added to the work archive on this device.",
    required: "Complete both case titles, add at least one image, and confirm the privacy statement.",
    storageError: "The browser has insufficient storage. Export current cases or use smaller images.",
    library: "Locally added cases",
    empty: "No local cases yet.",
    export: "Export JSON backup",
    import: "Import backup",
    importError: "The backup file is not valid.",
    imported: "The local backup was imported.",
    preview: "Preview work archive",
    images: "images",
  },
};

const categories = ["restorative", "prosthodontics", "endodontics", "surgery"];

function readAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maximum = 1800;
        const ratio = Math.min(1, maximum / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        canvas.getContext("2d", { alpha: false }).drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", .84));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const { isArabic, t } = useLanguage();
  const l = isArabic ? labels.ar : labels.en;
  const { localCases, addCase, removeCase, replaceLocalCases } = useClinicalCases();
  const importRef = useRef(null);
  const [form, setForm] = useState({ titleAr: "", titleEn: "", summaryAr: "", summaryEn: "", category: "restorative" });
  const [stages, setStages] = useState([]);
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const updateStage = (index, field, value) => setStages((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const moveStage = (index, direction) => setStages((current) => {
    const target = index + direction;
    if (target < 0 || target >= current.length) return current;
    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });

  const addImages = async (event) => {
    const files = [...event.target.files].filter((file) => file.type.startsWith("image/"));
    if (!files.length) return;
    setProcessing(true);
    const start = stages.length;
    try {
      const next = await Promise.all(files.map(async (file, index) => ({
        id: `stage-${Date.now().toString(36)}-${index}`,
        path: await readAndCompressImage(file),
        titleAr: `المرحلة ${start + index + 1}`,
        titleEn: `Stage ${start + index + 1}`,
      })));
      setStages((current) => [...current, ...next]);
    } finally {
      setProcessing(false);
      event.target.value = "";
    }
  };

  const saveCase = (event) => {
    event.preventDefault();
    if (!form.titleAr.trim() || !form.titleEn.trim() || !stages.length || !consent) {
      setMessage({ type: "error", text: l.required });
      return;
    }
    try {
      addCase({ id: createLocalCaseId(), slug: "local-case", ...form, stages, source: "local", featured: false, createdAt: new Date().toISOString() });
      setForm({ titleAr: "", titleEn: "", summaryAr: "", summaryEn: "", category: "restorative" });
      setStages([]);
      setConsent(false);
      setMessage({ type: "success", text: l.saved });
    } catch {
      setMessage({ type: "error", text: l.storageError });
    }
  };

  const exportCases = () => {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), cases: localCases }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `dr-shaimaa-cases-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importCases = async (event) => {
    try {
      const payload = JSON.parse(await event.target.files[0].text());
      if (!Array.isArray(payload.cases) || payload.cases.some((item) => !item.id || !Array.isArray(item.stages))) throw new Error("invalid");
      replaceLocalCases(payload.cases);
      setMessage({ type: "success", text: l.imported });
    } catch {
      setMessage({ type: "error", text: l.importError });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <section className="admin-page shell">
      <header className="admin-heading">
        <div><p className="section-kicker">{l.kicker}</p><h1>{l.title}</h1><p>{l.lead}</p></div>
        <Link className="button button-secondary" to="/cases">{l.preview}<ArrowLeft aria-hidden="true" /></Link>
      </header>

      <div className="admin-notice" role="note"><ShieldCheck aria-hidden="true" /><div><strong>{l.localTitle}</strong><p>{l.localNote}</p></div></div>

      <div className="admin-layout">
        <form className="case-editor" onSubmit={saveCase}>
          <section className="admin-panel">
            <div className="admin-panel-title"><span>01</span><div><h2>{l.formTitle}</h2></div></div>
            <div className="admin-fields">
              <label><span>{l.titleAr}</span><input name="titleAr" value={form.titleAr} onChange={updateForm} dir="rtl" /></label>
              <label><span>{l.titleEn}</span><input name="titleEn" value={form.titleEn} onChange={updateForm} dir="ltr" /></label>
              <label><span>{l.category}</span><select name="category" value={form.category} onChange={updateForm}>{categories.map((category) => <option key={category} value={category}>{t.categories[category]}</option>)}</select></label>
              <label><span>{l.summaryAr}</span><textarea name="summaryAr" value={form.summaryAr} onChange={updateForm} rows="3" dir="rtl" /></label>
              <label><span>{l.summaryEn}</span><textarea name="summaryEn" value={form.summaryEn} onChange={updateForm} rows="3" dir="ltr" /></label>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-title"><span>02</span><div><h2>{l.stagesTitle}</h2><p>{l.stagesHint}</p></div></div>
            <label className="image-upload"><ImagePlus aria-hidden="true" /><strong>{processing ? "…" : l.addImages}</strong><input type="file" accept="image/*" multiple onChange={addImages} disabled={processing} /></label>
            {stages.length ? <div className="stage-editor-list">
              {stages.map((item, index) => <article className="stage-editor" key={item.id}>
                <div className="stage-preview"><img src={item.path} alt="" /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="stage-fields">
                  <label><span>{l.stageAr}</span><input value={item.titleAr} onChange={(event) => updateStage(index, "titleAr", event.target.value)} dir="rtl" /></label>
                  <label><span>{l.stageEn}</span><input value={item.titleEn} onChange={(event) => updateStage(index, "titleEn", event.target.value)} dir="ltr" /></label>
                </div>
                <div className="stage-actions">
                  <button type="button" onClick={() => moveStage(index, -1)} disabled={index === 0} aria-label={l.moveUp}><ArrowUp aria-hidden="true" /></button>
                  <button type="button" onClick={() => moveStage(index, 1)} disabled={index === stages.length - 1} aria-label={l.moveDown}><ArrowDown aria-hidden="true" /></button>
                  <button type="button" className="danger" onClick={() => setStages((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={l.remove}><Trash2 aria-hidden="true" /></button>
                </div>
              </article>)}
            </div> : <p className="admin-empty">{l.noImages}</p>}
          </section>

          <label className="consent-check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{l.consent}</span></label>
          {message ? <p className={`admin-message is-${message.type}`} role="status">{message.text}</p> : null}
          <button className="button button-primary admin-save" type="submit"><Save aria-hidden="true" />{l.save}</button>
        </form>

        <aside className="local-library">
          <div className="local-library-head"><div><small>{String(localCases.length).padStart(2, "0")}</small><h2>{l.library}</h2></div><FileJson aria-hidden="true" /></div>
          <div className="backup-actions">
            <button type="button" onClick={exportCases} disabled={!localCases.length}><Download aria-hidden="true" />{l.export}</button>
            <button type="button" onClick={() => importRef.current?.click()}><Upload aria-hidden="true" />{l.import}</button>
            <input ref={importRef} className="visually-hidden" type="file" accept="application/json" onChange={importCases} />
          </div>
          {localCases.length ? <div className="local-case-list">{localCases.map((item) => <article key={item.id}>
            <img src={item.stages[0]?.path} alt="" />
            <div><small>{t.categories[item.category]} · {item.stages.length} {l.images}</small><strong>{isArabic ? item.titleAr : item.titleEn}</strong></div>
            <button type="button" onClick={() => removeCase(item.id)} aria-label={l.remove}><Trash2 aria-hidden="true" /></button>
          </article>)}</div> : <p className="admin-empty">{l.empty}</p>}
        </aside>
      </div>
    </section>
  );
}
