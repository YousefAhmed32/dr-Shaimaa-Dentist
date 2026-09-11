import { Download, Mail, MapPin, Phone } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { useLanguage } from "../context/LanguageContext";

export default function AboutPage() {
  const { t, isArabic } = useLanguage();
  return (
    <>
      <PageIntro kicker={t.about.kicker} title={t.about.title} lead={t.about.lead} aside={<div className="monogram-large" aria-hidden="true">SM</div>} />
      <section className="about-grid shell">
        <article className="about-summary">
          <p className="section-kicker">02 / {t.about.summaryTitle}</p>
          <h2>{t.about.summary}</h2>
          <a className="button button-primary" href="/downloads/Dr-Shaimaa-Mahmoud-Hassan-CV.pdf" download>{t.about.download}<Download aria-hidden="true" /></a>
        </article>
        <div className="about-details">
          <section>
            <p className="detail-index">03</p><h3>{t.about.education}</h3>
            <div className="detail-block"><time>2025</time><strong>{t.about.degree}</strong><span>{t.about.university}</span></div>
          </section>
          <section>
            <p className="detail-index">04</p><h3>{t.about.experience}</h3>
            <div className="detail-block"><time>2025—{isArabic ? "الآن" : "Present"}</time><strong>{t.about.currentRole}</strong><span>{t.about.currentPlace}</span></div>
            <div className="detail-block"><time>2021—2024</time><strong>{t.about.traineeRole}</strong><span>{t.about.traineePlace}</span></div>
          </section>
          <section>
            <p className="detail-index">05</p><h3>{t.about.skills}</h3>
            <ul className="skills-list">{t.about.skillItems.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}</ul>
          </section>
        </div>
      </section>
      <section className="contact-band shell">
        <div><p className="section-kicker">06 / {t.common.contact}</p><h2>{isArabic ? "متاحة لفرص العمل والتعاون مع العيادات." : "Open to professional opportunities and clinic collaboration."}</h2></div>
        <address>
          <a href="mailto:shymaahassan39@gmail.com"><Mail aria-hidden="true" />shymaahassan39@gmail.com</a>
          <a href="tel:+201118814870"><Phone aria-hidden="true" /><bdi>+20 111 881 4870</bdi></a>
          <span><MapPin aria-hidden="true" />{t.common.location}</span>
        </address>
      </section>
    </>
  );
}
