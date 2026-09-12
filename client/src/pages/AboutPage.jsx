import { Download, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { useLanguage } from "../context/LanguageContext";
import { getWhatsAppHref, PHONE_DISPLAY, PHONE_HREF } from "../data/contact";

export default function AboutPage() {
  const { t, isArabic } = useLanguage();
  return (
    <>
      <PageIntro
        kicker={t.about.kicker}
        title={t.about.title}
        lead={t.about.lead}
        aside={(
          <figure className="education-identity-visual">
            <img
              src="/media/brand/king-salman-international-university-logo.jpeg"
              alt={isArabic ? "شعار جامعة الملك سلمان الدولية" : "King Salman International University logo"}
            />
            <figcaption>
              <span>{isArabic ? "الجامعة" : "Alma mater"}</span>
              <strong>{isArabic ? "جامعة الملك سلمان الدولية" : "King Salman International University"}</strong>
            </figcaption>
          </figure>
        )}
      />
      <section className="about-grid shell">
        <article className="about-summary">
          <p className="section-kicker">{t.about.summaryTitle}</p>
          <h2>{t.about.summary}</h2>
          <a className="button button-primary" href="/downloads/Dr-Shaimaa-Mahmoud-Hassan-CV.pdf" download>{t.about.download}<Download aria-hidden="true" /></a>
        </article>
        <div className="about-details">
          <section>
            <h3>{t.about.education}</h3>
            <div className="detail-block"><time>2025</time><strong>{t.about.degree}</strong><span>{t.about.university}</span></div>
          </section>
          <section>
            <h3>{t.about.experience}</h3>
            <div className="detail-block"><time>2025—{isArabic ? "الآن" : "Present"}</time><strong>{t.about.currentRole}</strong><span>{t.about.currentPlace}</span></div>
            <div className="detail-block"><time>2021—2024</time><strong>{t.about.traineeRole}</strong><span>{t.about.traineePlace}</span></div>
          </section>
          <section>
            <h3>{t.about.skills}</h3>
            <ul className="skills-list">{t.about.skillItems.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </section>
          <section>
            <h3>{t.about.professionalDetails}</h3>
            <div className="detail-block"><strong>{t.about.affiliationLabel}</strong><span>{t.about.affiliation}</span></div>
            <div className="detail-block"><strong>{t.about.languagesLabel}</strong><span>{t.about.languages}</span></div>
          </section>
        </div>
      </section>
      <section className="contact-band shell">
        <div><p className="section-kicker">{t.common.contact}</p><h2>{isArabic ? "متاحة لفرص العمل والتعاون مع العيادات." : "Open to professional opportunities and clinic collaboration."}</h2></div>
        <address>
          <a href="mailto:shymaahassan39@gmail.com"><Mail aria-hidden="true" />shymaahassan39@gmail.com</a>
          <a href={PHONE_HREF}><Phone aria-hidden="true" /><bdi>{PHONE_DISPLAY}</bdi></a>
          <a href={getWhatsAppHref(isArabic)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" />{t.common.whatsappCta}</a>
          <span><MapPin aria-hidden="true" />{t.common.location}</span>
        </address>
      </section>
    </>
  );
}
