import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Eye, EyeOff, ImagePlus, Images, LoaderCircle, Save, ShieldCheck, Star, Trash2, UserRound, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { apiFetch, normalizeCase } from "../lib/api";

const copy = {
  ar: {
    kicker: "لوحة الإدارة", title: "المحتوى والحسابات في مكان واحد.", lead: "أضيفي حالة علاجية بمراحل مرتبة، تحكّمي في نشرها، وتابعي نمو حسابات الزوار من لوحة محمية.", preview: "معاينة معرض الأعمال",
    totalUsers: "إجمالي المسجلين", clients: "حسابات الزوار", cases: "الحالات", images: "الصور السريرية",
    formTitle: "بيانات الحالة", titleAr: "اسم الحالة بالعربية", titleEn: "اسم الحالة بالإنجليزية", category: "التخصص", summaryAr: "ملخص الحالة بالعربية — اختياري", summaryEn: "Case summary in English — optional",
    stagesTitle: "الصور ومراحل العلاج", stagesHint: "ارفعي الصور بترتيب التنفيذ، ثم اكتبي وصف كل مرحلة أو غيّري ترتيبها.", addImages: "إضافة صور", noImages: "لم تُضف صور بعد.", stageAr: "اسم المرحلة بالعربية", stageEn: "Stage name in English", moveUp: "تحريك لأعلى", moveDown: "تحريك لأسفل", remove: "حذف",
    privacy: "أؤكد وجود موافقة مناسبة لعرض الصور وأنها لا تحتوي على بيانات تكشف هوية المريض.", published: "نشر الحالة فورًا", featured: "تمييز الحالة في الواجهة الرئيسية", save: "حفظ الحالة", saving: "جارٍ الحفظ…", saved: "تم حفظ الحالة وإتاحتها من قاعدة البيانات.", required: "أكملي الاسمين، أضيفي صورة واحدة على الأقل، وأكدي بند الخصوصية.", serverError: "تعذر إكمال العملية. تأكدي أن الخادم يعمل ثم حاولي مرة أخرى.",
    library: "إدارة الحالات", empty: "لا توجد حالات بعد.", recent: "أحدث الحسابات", noUsers: "لا توجد حسابات مسجلة بعد.", admin: "مسؤول", client: "زائر", live: "منشورة", draft: "مسودة", curated: "أساسية", added: "مضافة", publish: "نشر", unpublish: "تحويل إلى مسودة", feature: "تمييز", unfeature: "إلغاء التمييز", deleteConfirm: "هل تريد حذف هذه الحالة وصورها نهائيًا؟",
  },
  en: {
    kicker: "Administration", title: "Content and accounts in one place.", lead: "Add structured treatment cases, control publishing, and monitor registered visitors from a protected dashboard.", preview: "Preview work archive",
    totalUsers: "Registered users", clients: "Visitor accounts", cases: "Clinical cases", images: "Clinical images",
    formTitle: "Case details", titleAr: "Arabic case title", titleEn: "English case title", category: "Discipline", summaryAr: "Arabic case summary — optional", summaryEn: "English case summary — optional",
    stagesTitle: "Images and treatment stages", stagesHint: "Upload images in treatment order, label each stage, or rearrange it.", addImages: "Add images", noImages: "No images added yet.", stageAr: "Arabic stage name", stageEn: "English stage name", moveUp: "Move up", moveDown: "Move down", remove: "Delete",
    privacy: "I confirm appropriate consent to display these images and that they contain no patient-identifying information.", published: "Publish immediately", featured: "Feature on the home page", save: "Save case", saving: "Saving…", saved: "The case was saved and is now available from the database.", required: "Complete both titles, add at least one image, and confirm the privacy statement.", serverError: "The operation could not be completed. Check the server and try again.",
    library: "Manage cases", empty: "No cases yet.", recent: "Recent accounts", noUsers: "No registered accounts yet.", admin: "Administrator", client: "Visitor", live: "Published", draft: "Draft", curated: "Curated", added: "Added", publish: "Publish", unpublish: "Move to draft", feature: "Feature", unfeature: "Remove feature", deleteConfirm: "Delete this case and its images permanently?",
  },
};

const categories = ["restorative", "prosthodontics", "endodontics", "surgery"];
const emptyForm = { titleAr: "", titleEn: "", summaryAr: "", summaryEn: "", category: "restorative", published: true, featured: false };

export default function AdminPage() {
  const { isArabic, t } = useLanguage();
  const l = isArabic ? copy.ar : copy.en;
  const [form, setForm] = useState(emptyForm);
  const [stages, setStages] = useState([]);
  const [consent, setConsent] = useState(false);
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      const [statsPayload, casesPayload] = await Promise.all([apiFetch("/api/admin/stats"), apiFetch("/api/cases/admin")]);
      setStats(statsPayload);
      setCases(casesPayload.cases.map(normalizeCase));
    } catch (error) { setMessage({ type: "error", text: error.message || l.serverError }); }
    finally { setLoading(false); }
  }, [l.serverError]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);
  const updateForm = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };
  const updateStage = (index, field, value) => setStages((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const moveStage = (index, direction) => setStages((current) => {
    const target = index + direction;
    if (target < 0 || target >= current.length) return current;
    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });
  const removeStage = (index) => setStages((current) => {
    URL.revokeObjectURL(current[index].preview);
    return current.filter((_, itemIndex) => itemIndex !== index);
  });
  const addImages = (event) => {
    const files = [...event.target.files].filter((file) => file.type.startsWith("image/"));
    const start = stages.length;
    setStages((current) => [...current, ...files.map((file, index) => ({ id: `${file.name}-${file.lastModified}-${index}`, file, preview: URL.createObjectURL(file), titleAr: `المرحلة ${start + index + 1}`, titleEn: `Stage ${start + index + 1}` }))]);
    event.target.value = "";
  };

  const saveCase = async (event) => {
    event.preventDefault(); setMessage(null);
    if (!form.titleAr.trim() || !form.titleEn.trim() || !stages.length || !consent) { setMessage({ type: "error", text: l.required }); return; }
    setBusy(true);
    try {
      const payload = new FormData();
      ["titleAr", "titleEn", "summaryAr", "summaryEn", "category"].forEach((key) => payload.append(key, form[key]));
      payload.append("status", form.published ? "published" : "draft");
      payload.append("featured", String(form.featured));
      payload.append("stages", JSON.stringify(stages.map(({ titleAr, titleEn }) => ({ titleAr, titleEn }))));
      stages.forEach(({ file }) => payload.append("images", file));
      await apiFetch("/api/cases", { method: "POST", body: payload });
      stages.forEach((stageItem) => URL.revokeObjectURL(stageItem.preview));
      setStages([]); setForm(emptyForm); setConsent(false); setMessage({ type: "success", text: l.saved });
      await loadDashboard();
    } catch (error) { setMessage({ type: "error", text: error.message || l.serverError }); }
    finally { setBusy(false); }
  };

  const updateCase = async (item, changes) => {
    try { await apiFetch(`/api/cases/${item.databaseId}`, { method: "PATCH", body: JSON.stringify(changes) }); await loadDashboard(); }
    catch (error) { setMessage({ type: "error", text: error.message || l.serverError }); }
  };
  const deleteCase = async (item) => {
    if (!window.confirm(l.deleteConfirm)) return;
    try { await apiFetch(`/api/cases/${item.databaseId}`, { method: "DELETE" }); await loadDashboard(); }
    catch (error) { setMessage({ type: "error", text: error.message || l.serverError }); }
  };

  const statCards = [
    { label: l.totalUsers, value: stats?.users.total ?? "—", icon: UsersRound },
    { label: l.clients, value: stats?.users.clients ?? "—", icon: UserRound },
    { label: l.cases, value: stats?.cases.total ?? "—", icon: ShieldCheck },
    { label: l.images, value: stats?.cases.images ?? "—", icon: Images },
  ];

  return (
    <section className="admin-page shell">
      <header className="admin-heading"><div><p className="section-kicker">{l.kicker}</p><h1>{l.title}</h1><p>{l.lead}</p></div><Link className="button button-secondary" to="/cases">{l.preview}<ArrowLeft aria-hidden="true" /></Link></header>
      <div className="admin-stats" aria-label={l.kicker}>{statCards.map(({ label, value, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><strong>{value}</strong><span>{label}</span></article>)}</div>

      <div className="admin-layout">
        <form className="case-editor" onSubmit={saveCase}>
          <section className="admin-panel">
            <div className="admin-panel-title"><span>01</span><div><h2>{l.formTitle}</h2></div></div>
            <div className="admin-fields">
              <label><span>{l.titleAr}</span><input name="titleAr" value={form.titleAr} onChange={updateForm} dir="rtl" maxLength="180" /></label>
              <label><span>{l.titleEn}</span><input name="titleEn" value={form.titleEn} onChange={updateForm} dir="ltr" maxLength="180" /></label>
              <label><span>{l.category}</span><select name="category" value={form.category} onChange={updateForm}>{categories.map((category) => <option key={category} value={category}>{t.categories[category]}</option>)}</select></label>
              <label><span>{l.summaryAr}</span><textarea name="summaryAr" value={form.summaryAr} onChange={updateForm} rows="3" dir="rtl" maxLength="1200" /></label>
              <label><span>{l.summaryEn}</span><textarea name="summaryEn" value={form.summaryEn} onChange={updateForm} rows="3" dir="ltr" maxLength="1200" /></label>
            </div>
          </section>
          <section className="admin-panel">
            <div className="admin-panel-title"><span>02</span><div><h2>{l.stagesTitle}</h2><p>{l.stagesHint}</p></div></div>
            <label className="image-upload"><ImagePlus aria-hidden="true" /><strong>{l.addImages}</strong><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addImages} /></label>
            {stages.length ? <div className="stage-editor-list">{stages.map((item, index) => <article className="stage-editor" key={item.id}>
              <div className="stage-preview"><img src={item.preview} alt="" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="stage-fields"><label><span>{l.stageAr}</span><input value={item.titleAr} onChange={(event) => updateStage(index, "titleAr", event.target.value)} dir="rtl" /></label><label><span>{l.stageEn}</span><input value={item.titleEn} onChange={(event) => updateStage(index, "titleEn", event.target.value)} dir="ltr" /></label></div>
              <div className="stage-actions"><button type="button" onClick={() => moveStage(index, -1)} disabled={index === 0} aria-label={l.moveUp}><ArrowUp aria-hidden="true" /></button><button type="button" onClick={() => moveStage(index, 1)} disabled={index === stages.length - 1} aria-label={l.moveDown}><ArrowDown aria-hidden="true" /></button><button type="button" className="danger" onClick={() => removeStage(index)} aria-label={l.remove}><Trash2 aria-hidden="true" /></button></div>
            </article>)}</div> : <p className="admin-empty">{l.noImages}</p>}
          </section>
          <div className="publish-options"><label><input type="checkbox" name="published" checked={form.published} onChange={updateForm} /><span>{l.published}</span></label><label><input type="checkbox" name="featured" checked={form.featured} onChange={updateForm} /><span>{l.featured}</span></label></div>
          <label className="consent-check"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{l.privacy}</span></label>
          {message ? <p className={`admin-message is-${message.type}`} role={message.type === "error" ? "alert" : "status"}>{message.text}</p> : null}
          <button className="button button-primary admin-save" type="submit" disabled={busy}>{busy ? <LoaderCircle className="is-spinning" aria-hidden="true" /> : <Save aria-hidden="true" />}{busy ? l.saving : l.save}</button>
        </form>

        <aside className="admin-side">
          <section className="local-library">
            <div className="local-library-head"><div><small>{String(cases.length).padStart(2, "0")}</small><h2>{l.library}</h2></div><Images aria-hidden="true" /></div>
            {loading ? <p className="admin-empty"><LoaderCircle className="is-spinning" aria-hidden="true" /></p> : cases.length ? <div className="local-case-list">{cases.map((item) => <article key={item.databaseId}>
              <img src={item.stages[0]?.path} alt="" /><div><small>{t.categories[item.category]} · {item.source === "curated" ? l.curated : l.added}</small><strong>{isArabic ? item.titleAr : item.titleEn}</strong><span>{item.status === "published" ? l.live : l.draft}</span></div>
              <div className="case-admin-actions"><button type="button" onClick={() => updateCase(item, { status: item.status === "published" ? "draft" : "published" })} aria-label={item.status === "published" ? l.unpublish : l.publish}>{item.status === "published" ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</button><button type="button" className={item.featured ? "is-featured" : ""} onClick={() => updateCase(item, { featured: !item.featured })} aria-label={item.featured ? l.unfeature : l.feature}><Star aria-hidden="true" /></button>{item.source === "admin" ? <button type="button" className="danger" onClick={() => deleteCase(item)} aria-label={l.remove}><Trash2 aria-hidden="true" /></button> : null}</div>
            </article>)}</div> : <p className="admin-empty">{l.empty}</p>}
          </section>
          <section className="recent-users"><div className="recent-users-head"><UsersRound aria-hidden="true" /><h2>{l.recent}</h2></div>{stats?.recentUsers?.length ? <ul>{stats.recentUsers.map((user) => <li key={user.id}><span className="user-initial">{user.name.slice(0, 1).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.email}</small></div><em>{user.role === "admin" ? l.admin : l.client}</em></li>)}</ul> : <p>{l.noUsers}</p>}</section>
        </aside>
      </div>
    </section>
  );
}
