import { BadgeCheck, BookOpenCheck, GraduationCap } from "lucide-react";
import Gallery from "../components/Gallery";
import PageIntro from "../components/PageIntro";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import { credentialMedia } from "../data/media";

export default function CredentialsPage() {
  const { t, isArabic } = useLanguage();
  const featured = credentialMedia[0];
  return (
    <>
      <PageIntro kicker={t.credentials.kicker} title={t.credentials.title} lead={t.credentials.lead} aside={<><BadgeCheck aria-hidden="true" /><strong>127+</strong><span>{t.credentials.total}</span></>} />
      <section className="credential-metrics shell" aria-label={t.credentials.kicker}>
        <div><GraduationCap aria-hidden="true" /><strong>84</strong><span>{t.credentials.ortho}</span></div>
        <div><BookOpenCheck aria-hidden="true" /><strong>42</strong><span>{t.credentials.congress}</span></div>
        <div><BadgeCheck aria-hidden="true" /><strong>01</strong><span>ADA C.E.R.P</span></div>
      </section>
      <section className="featured-credential shell">
        <button type="button" className="credential-visual" aria-label={`${t.common.openImage}: ${isArabic ? featured.titleAr : featured.titleEn}`} onClick={() => document.getElementById("credential-gallery")?.querySelector("button")?.click()}>
          <img src={featured.path} alt={isArabic ? featured.titleAr : featured.titleEn} />
        </button>
        <div className="credential-copy">
          <p className="section-kicker">{t.credentials.featured}</p>
          <h2>{t.credentials.featuredTitle}</h2>
          <p>{t.credentials.featuredBody}</p>
          <dl><div><dt>84</dt><dd>{isArabic ? "ساعة معتمدة" : "Credit hours"}</dd></div><div><dt>2026</dt><dd>{isArabic ? "الإسكندرية، مصر" : "Alexandria, Egypt"}</dd></div><div><dt><bdi>#202602027</bdi></dt><dd>{isArabic ? "رمز التحقق" : "Verification code"}</dd></div></dl>
        </div>
      </section>
      <section className="content-section content-section--border shell" id="credential-gallery">
        <SectionHeading kicker={t.nav.credentials} title={isArabic ? "السجل الكامل للشهادات والتقدير." : "The complete credential archive."} lead={isArabic ? "اضغط على أي شهادة لعرضها بالحجم الكامل والتنقل بين المستندات." : "Open any credential at full size and move through the archive without leaving the page."} />
        <Gallery items={credentialMedia} />
      </section>
    </>
  );
}
