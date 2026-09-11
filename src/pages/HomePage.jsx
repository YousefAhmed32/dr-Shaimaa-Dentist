import { ArrowUpRight, Download, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import { clinicalMedia, conceptMedia } from "../data/media";

export default function HomePage() {
  const { t, isArabic } = useLanguage();
  const featuredCases = clinicalMedia.filter(({ id }) => ["r04", "r08", "p03", "e02"].includes(id));

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="section-kicker">01 / {t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-lead">{t.home.lead}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/cases">{t.home.primary}<MoveUpRight aria-hidden="true" /></Link>
            <Link className="button button-quiet" to="/about">{t.home.secondary}</Link>
          </div>
          <dl className="metric-rail">
            {["127+", "84", "2025"].map((value, index) => <div key={value}><dt>{value}</dt><dd>{t.home.metrics[index]}</dd></div>)}
          </dl>
        </div>
        <figure className="hero-stage">
          <div className="stage-grid" aria-hidden="true" />
          <img src="/media/concept/floating-ceramic-molar.png" alt={isArabic ? "مجسم ثلاثي الأبعاد لضرس سيراميكي أبيض عائم" : "A three-dimensional floating white ceramic molar"} />
          <figcaption><span>{t.home.visualIndex}</span><strong>{t.home.visualTitle}</strong></figcaption>
        </figure>
      </section>

      <section className="signal-strip" aria-label={t.home.kicker}>
        <div className="shell signal-inner">{t.home.disciplines.map((item) => <span key={item}>{item}<i aria-hidden="true" /></span>)}</div>
      </section>

      <section className="content-section shell">
        <SectionHeading index="02" kicker={t.home.systemsKicker} title={t.home.systemsTitle} lead={t.home.systemsLead} action={<Link className="text-link" to="/cases">{t.common.viewAll}<ArrowUpRight aria-hidden="true" /></Link>} />
        <Gallery items={conceptMedia} limit={5} />
      </section>

      <section className="content-section content-section--border shell">
        <SectionHeading index="03" kicker={t.home.casesKicker} title={t.home.casesTitle} lead={t.home.casesLead} action={<Link className="text-link" to="/cases">{t.nav.cases}<ArrowUpRight aria-hidden="true" /></Link>} />
        <Gallery items={featuredCases} />
      </section>

      <section className="profile-band">
        <div className="shell profile-band-grid">
          <div>
            <p className="section-kicker">04 / {t.home.profileKicker}</p>
            <h2>{t.home.profileTitle}</h2>
          </div>
          <div className="profile-band-copy">
            <p>{t.home.profileBody}</p>
            <div className="mini-timeline">
              <div><time>2021—2024</time><span>{t.about.traineeRole}<small>{t.about.traineePlace}</small></span></div>
              <div><time>2025—{isArabic ? "الآن" : "Present"}</time><span>{t.about.currentRole}<small>{t.about.currentPlace}</small></span></div>
            </div>
            <a className="button button-inverse" href="/downloads/Dr-Shaimaa-Mahmoud-Hassan-CV.pdf" download>{t.about.download}<Download aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </>
  );
}
