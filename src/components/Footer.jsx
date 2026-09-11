import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getWhatsAppHref, PHONE_DISPLAY, PHONE_HREF } from "../data/contact";

export default function Footer() {
  const { t, isArabic } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="section-kicker">{t.common.contact}</p>
          <h2>{t.brandName}</h2>
          <p className="footer-role">{t.brandRole}</p>
        </div>
        <address className="contact-list">
          <a href="mailto:shymaahassan39@gmail.com"><Mail aria-hidden="true" /><span><small>{t.common.email}</small>shymaahassan39@gmail.com</span></a>
          <a href={PHONE_HREF}><Phone aria-hidden="true" /><span><small>{t.common.phone}</small><bdi>{PHONE_DISPLAY}</bdi></span></a>
          <a href={getWhatsAppHref(isArabic)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><small>{t.common.whatsapp}</small>{t.common.whatsappCta}</span></a>
          <span><MapPin aria-hidden="true" /><span><small>{t.common.locationLabel}</small>{t.common.location}</span></span>
        </address>
      </div>
      <div className="shell privacy-rail"><strong>{t.common.privateLabel}</strong><span>{t.common.privacy}</span></div>
    </footer>
  );
}
