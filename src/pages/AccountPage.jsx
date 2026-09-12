import { useEffect, useRef, useState } from "react";
import { ArrowLeft, KeyRound, LayoutDashboard, LogIn, LogOut, ShieldCheck, UserPlus, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const labels = {
  ar: {
    kicker: "الحساب",
    title: "دخول آمن للزوار والإدارة.",
    lead: "أنشئ حسابًا لمتابعة المنصة، أو سجّل الدخول إلى لوحة الإدارة إذا كنت مسؤولًا.",
    login: "تسجيل الدخول", register: "إنشاء حساب", name: "الاسم الكامل", email: "البريد الإلكتروني", password: "كلمة المرور", confirm: "تأكيد كلمة المرور",
    loginButton: "دخول", registerButton: "إنشاء الحساب", required: "هذا الحقل مطلوب.", emailError: "اكتب بريدًا إلكترونيًا صحيحًا.", passwordError: "يجب ألا تقل كلمة المرور عن 10 أحرف.", matchError: "كلمتا المرور غير متطابقتين.",
    serverError: "تعذر إكمال الطلب. راجع البيانات وحاول مرة أخرى.", invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.", emailExists: "يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل.", suspended: "هذا الحساب موقوف حاليًا.", currentIncorrect: "كلمة المرور الحالية غير صحيحة.", welcome: "مرحبًا", clientRole: "حساب زائر", adminRole: "مسؤول المنصة", dashboard: "فتح لوحة الإدارة", logout: "تسجيل الخروج",
    changeTitle: "تغيير كلمة المرور المؤقتة", currentPassword: "كلمة المرور الحالية", newPassword: "كلمة المرور الجديدة", changeButton: "حفظ كلمة المرور الجديدة", changed: "تم تحديث كلمة المرور.",
  },
  en: {
    kicker: "Account",
    title: "Secure access for visitors and administrators.",
    lead: "Create a visitor account, or sign in to the administration dashboard if you are an authorized manager.",
    login: "Sign in", register: "Create account", name: "Full name", email: "Email address", password: "Password", confirm: "Confirm password",
    loginButton: "Sign in", registerButton: "Create account", required: "This field is required.", emailError: "Enter a valid email address.", passwordError: "Use at least 10 characters.", matchError: "The passwords do not match.",
    serverError: "The request could not be completed. Check the details and try again.", invalidCredentials: "The email address or password is incorrect.", emailExists: "An account already exists for this email address.", suspended: "This account is currently suspended.", currentIncorrect: "The current password is incorrect.", welcome: "Welcome", clientRole: "Visitor account", adminRole: "Platform administrator", dashboard: "Open administration dashboard", logout: "Sign out",
    changeTitle: "Change temporary password", currentPassword: "Current password", newPassword: "New password", changeButton: "Save new password", changed: "Password updated.",
  },
};

const friendlyError = (error, l) => ({ INVALID_CREDENTIALS: l.invalidCredentials, EMAIL_EXISTS: l.emailExists, ACCOUNT_SUSPENDED: l.suspended, CURRENT_PASSWORD_INCORRECT: l.currentIncorrect, WEAK_PASSWORD: l.passwordError }[error.code] || l.serverError);

export default function AccountPage() {
  const { isArabic } = useLanguage();
  const l = isArabic ? labels.ar : labels.en;
  const { user, isAdmin, login, register, logout, changePassword } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { if (Object.keys(errors).length) errorRef.current?.focus(); }, [errors]);

  const validate = () => {
    const next = {};
    if (mode === "register" && form.name.trim().length < 2) next.name = l.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = l.emailError;
    if (form.password.length < 10) next.password = l.passwordError;
    if (mode === "register" && form.password !== form.confirm) next.confirm = l.matchError;
    return next;
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length) return;
    setBusy(true);
    try {
      const nextUser = mode === "login" ? await login({ email: form.email, password: form.password }) : await register({ name: form.name, email: form.email, password: form.password });
      navigate(nextUser.role === "admin" ? "/admin" : (location.state?.from || "/account"), { replace: true });
    } catch (error) { setErrors({ form: friendlyError(error, l) }); }
    finally { setBusy(false); }
  };

  const submitPassword = async (event) => {
    event.preventDefault(); setBusy(true); setMessage(""); setErrors({});
    try { await changePassword(passwordForm); setPasswordForm({ currentPassword: "", newPassword: "" }); setMessage(l.changed); }
    catch (error) { setErrors({ passwordChange: friendlyError(error, l) }); }
    finally { setBusy(false); }
  };

  if (user) return (
    <section className={`account-page shell ${user.mustChangePassword ? "" : "account-page--single"}`}>
      <div className="account-card account-card--profile">
        <span className="account-avatar"><UserRound aria-hidden="true" /></span>
        <p className="section-kicker">{l.kicker}</p>
        <h1>{l.welcome}، {user.name}</h1>
        <p>{isAdmin ? l.adminRole : l.clientRole}</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
        <div className="account-actions">
          {isAdmin && !user.mustChangePassword ? <Link className="button button-primary" to="/admin">{l.dashboard}<LayoutDashboard aria-hidden="true" /></Link> : !isAdmin ? <Link className="button button-secondary" to="/cases">{isArabic ? "تصفّح الأعمال" : "Explore the work"}<ArrowLeft aria-hidden="true" /></Link> : null}
          <button className="button button-quiet" type="button" onClick={logout}>{l.logout}<LogOut aria-hidden="true" /></button>
        </div>
      </div>
      {user.mustChangePassword ? <form className="account-card password-card" onSubmit={submitPassword}>
        <ShieldCheck aria-hidden="true" /><h2>{l.changeTitle}</h2>
        {errors.passwordChange ? <p className="form-alert" role="alert">{errors.passwordChange}</p> : null}
        {message ? <p className="form-success" role="status">{message}</p> : null}
        <label><span>{l.currentPassword}</span><input type="password" autoComplete="current-password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))} required /></label>
        <label><span>{l.newPassword}</span><input type="password" autoComplete="new-password" minLength="10" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} required /></label>
        <button className="button button-primary" type="submit" disabled={busy}><KeyRound aria-hidden="true" />{l.changeButton}</button>
      </form> : null}
    </section>
  );

  return (
    <section className="auth-page shell">
      <div className="auth-intro"><p className="section-kicker">{l.kicker}</p><h1>{l.title}</h1><p>{l.lead}</p><div className="auth-signal"><ShieldCheck aria-hidden="true" /><span>{isArabic ? "جلسة محمية وصلاحيات منفصلة للإدارة" : "Protected session with role-based administration"}</span></div></div>
      <form className="auth-card" onSubmit={submit} noValidate>
        <div className="auth-tabs" role="tablist" aria-label={l.kicker}>
          <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => { setMode("login"); setErrors({}); }}>{l.login}</button>
          <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => { setMode("register"); setErrors({}); }}>{l.register}</button>
        </div>
        {errors.form ? <div className="form-alert" role="alert" tabIndex="-1" ref={errorRef}>{errors.form}</div> : null}
        {mode === "register" ? <label><span>{l.name}</span><input id="account-name" autoComplete="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "account-name-error" : undefined} />{errors.name ? <small id="account-name-error" className="field-error">{errors.name}</small> : null}</label> : null}
        <label><span>{l.email}</span><input id="account-email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "account-email-error" : undefined} />{errors.email ? <small id="account-email-error" className="field-error">{errors.email}</small> : null}</label>
        <label><span>{l.password}</span><input id="account-password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "account-password-error" : undefined} />{errors.password ? <small id="account-password-error" className="field-error">{errors.password}</small> : null}</label>
        {mode === "register" ? <label><span>{l.confirm}</span><input id="account-confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={(event) => setForm((current) => ({ ...current, confirm: event.target.value }))} aria-invalid={Boolean(errors.confirm)} aria-describedby={errors.confirm ? "account-confirm-error" : undefined} />{errors.confirm ? <small id="account-confirm-error" className="field-error">{errors.confirm}</small> : null}</label> : null}
        <button className="button button-primary auth-submit" type="submit" disabled={busy}>{mode === "login" ? <LogIn aria-hidden="true" /> : <UserPlus aria-hidden="true" />}{mode === "login" ? l.loginButton : l.registerButton}</button>
      </form>
    </section>
  );
}
