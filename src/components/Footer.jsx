import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
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
          <a href="tel:+201118814870"><Phone aria-hidden="true" /><span><small>{t.common.phone}</small><bdi>+20 111 881 4870</bdi></span></a>
          <span><MapPin aria-hidden="true" /><span><small>{t.common.location}</small>Egyptian Dental Syndicate</span></span>
        </address>
      </div>
      <div className="shell privacy-rail"><strong>{t.common.privateLabel}</strong><span>{t.common.privacy}</span></div>
    </footer>
  );
}
