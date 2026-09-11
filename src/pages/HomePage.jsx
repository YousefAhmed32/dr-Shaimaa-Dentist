import { ArrowLeft, ArrowUpLeft, Download, MoveUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import { clinicalMedia, conceptMedia, credentialMedia } from "../data/media";

export default function HomePage() {
  const { t, isArabic } = useLanguage();
  const reduceMotion = useReducedMotion();
  const featuredCases = clinicalMedia.filter(({ id }) => ["r04", "r08", "p03", "e02", "c04", "c07"].includes(id));

  return (
    <>
      <section className="hero shell">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
          <p className="section-kicker">{t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-lead">{t.home.lead}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/cases">{t.home.primary}<MoveUpRight aria-hidden="true" /></Link>
            <a className="button button-quiet" href="mailto:shymaahassan39@gmail.com">{t.home.secondary}<ArrowUpLeft aria-hidden="true" /></a>
          </div>
          <dl className="metric-rail">
            {["33", "127+", "84"].map((value, index) => <div key={value}><dt>{value}</dt><dd>{t.home.metrics[index]}</dd></div>)}
          </dl>
        </motion.div>

        <motion.figure className="hero-stage" initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .08, ease: [.22, 1, .36, 1] }}>
          <div className="stage-grid" aria-hidden="true" />
          <motion.img
            className="hero-molar"
            src="/media/concept/floating-ceramic-molar.png"
            alt={isArabic ? "مجسم ثلاثي الأبعاد لضرس سيراميكي أبيض" : "Three-dimensional white ceramic molar"}
            animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-.5, .7, -.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="hero-case-peek">
            <img src="/media/restorative-dentistry/restorative-class-i-step-by-step-collage.jpeg" alt="" />
            <span><small>{isArabic ? "عمل مختار" : "Selected work"}</small><strong>{isArabic ? "ترميم مباشر — خطوة بخطوة" : "Direct restoration — step by step"}</strong></span>
          </div>
          <figcaption><span>{t.home.visualIndex}</span><strong>{t.home.visualTitle}</strong></figcaption>
        </motion.figure>
      </section>

      <section className="signal-strip" aria-label={t.home.kicker}>
        <div className="shell signal-inner">{t.home.disciplines.map((item) => <span key={item}>{item}<i aria-hidden="true" /></span>)}</div>
      </section>

      <section className="content-section home-work shell">
        <SectionHeading kicker={t.home.casesKicker} title={t.home.casesTitle} lead={t.home.casesLead} />
        <Gallery items={featuredCases} />
        <div className="section-action">
          <Link className="button button-section" to="/cases"><span>{isArabic ? "استعرض معرض الأعمال كاملًا" : "Explore the complete work archive"}</span><ArrowLeft aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="content-section home-credentials shell">
        <SectionHeading kicker={t.home.credentialsKicker} title={t.home.credentialsTitle} lead={t.home.credentialsLead} />
        <Gallery items={credentialMedia.slice(0, 3)} />
        <div className="section-action">
          <Link className="button button-section" to="/credentials"><span>{isArabic ? "استعرض جميع الشهادات والاعتمادات" : "Explore all credentials"}</span><ArrowLeft aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="content-section content-section--contrast">
        <div className="shell">
          <SectionHeading kicker={t.home.systemsKicker} title={t.home.systemsTitle} lead={t.home.systemsLead} />
          <Gallery items={conceptMedia} limit={3} />
        </div>
      </section>

      <section className="profile-band">
        <div className="shell profile-band-grid">
          <div>
            <p className="section-kicker">{t.home.profileKicker}</p>
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

      <section className="home-cta shell">
        <div><p className="section-kicker">{t.common.contact}</p><h2>{t.home.ctaTitle}</h2><p>{t.home.ctaLead}</p></div>
        <a className="button button-primary" href="mailto:shymaahassan39@gmail.com">{t.home.ctaButton}<ArrowUpLeft aria-hidden="true" /></a>
      </section>
    </>
  );
}
