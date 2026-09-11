import { useLanguage } from "../context/LanguageContext";

export default function SpecialtyMarquee() {
  const { t, isArabic } = useLanguage();

  return (
    <section className="signal-strip" aria-label={t.home.disciplinesLabel}>
      <div className="marquee-viewport">
        <div className="marquee-track">
          {[0, 1].map((copyIndex) => (
            <div className="marquee-group" key={copyIndex} aria-hidden={copyIndex === 1 ? "true" : undefined}>
              {t.home.disciplines.map((item) => (
                <span className="marquee-item" key={`${copyIndex}-${item}`} dir={isArabic ? "rtl" : "ltr"}>
                  <i aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
