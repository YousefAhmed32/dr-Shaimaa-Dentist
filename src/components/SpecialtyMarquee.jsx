import { useState } from "react";
import { Layers3, Pause, Play, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const disciplineIcons = [Sparkles, Layers3, ScanLine, ShieldCheck];

export default function SpecialtyMarquee() {
  const { t, isArabic } = useLanguage();
  const [paused, setPaused] = useState(false);

  return (
    <section className={`capability-rail ${paused ? "is-paused" : ""}`} aria-label={t.home.disciplinesLabel}>
      <div className="shell capability-shell">
        <div className="capability-intro">
          <span>
            <small>{t.home.disciplinesLabel}</small>
            <strong>{t.home.disciplinesHint}</strong>
          </span>
          <button
            type="button"
            className="marquee-toggle"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? t.home.resumeMotion : t.home.pauseMotion}
            aria-pressed={paused}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>

        <div className="marquee-viewport">
          <div className="marquee-track">
            {[0, 1].map((copyIndex) => (
              <div className="marquee-group" key={copyIndex} aria-hidden={copyIndex === 1 ? "true" : undefined}>
                {t.home.disciplines.map((item, itemIndex) => {
                  const Icon = disciplineIcons[itemIndex];
                  return (
                    <span className="marquee-item" key={`${copyIndex}-${item}`} dir={isArabic ? "rtl" : "ltr"}>
                      <i aria-hidden="true"><Icon /></i>
                      <span>{item}</span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
