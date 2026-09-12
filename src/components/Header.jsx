import { useEffect, useState } from "react";
import { Languages, LayoutDashboard, Menu, MessageCircle, UserRound, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getWhatsAppHref } from "../data/contact";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { t, language, isArabic, toggleLanguage } = useLanguage();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    ["/", t.nav.home],
    ["/cases", t.nav.cases],
    ["/credentials", t.nav.credentials],
    ["/about", t.nav.about],
  ];
  if (isAdmin) links.push(["/admin", isArabic ? "الإدارة" : "Dashboard"]);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label={t.nav.home}>
        <span className="brand-mark" aria-hidden="true">SM</span>
        <span className="brand-copy"><strong>{t.brandName}</strong><small>{t.brandRole}</small></span>
      </NavLink>
      <nav className="desktop-nav" aria-label={t.nav.home}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => isActive ? "active" : undefined}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <NavLink className="account-link" to="/account" aria-label={user ? (isArabic ? "الحساب" : "Account") : (isArabic ? "تسجيل الدخول" : "Sign in")}>
          {isAdmin ? <LayoutDashboard aria-hidden="true" /> : <UserRound aria-hidden="true" />}<span>{user ? user.name.split(" ")[0] : (isArabic ? "دخول" : "Sign in")}</span>
        </NavLink>
        <a className="header-cta" href={getWhatsAppHref(isArabic)} target="_blank" rel="noreferrer">{t.common.contactCta}<MessageCircle aria-hidden="true" /></a>
        <button className="language-switch" type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}>
          <Languages aria-hidden="true" /><span>{language === "ar" ? "EN" : "عربي"}</span>
        </button>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? t.common.close : t.common.openMenu}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label={t.nav.home}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => isActive ? "active" : undefined}>{label}</NavLink>)}
        <NavLink to="/account" className={({ isActive }) => isActive ? "active" : undefined}>{user ? (isArabic ? "الحساب" : "Account") : (isArabic ? "تسجيل الدخول" : "Sign in")}</NavLink>
      </nav>
    </header>
  );
}
