import { useMemo, useState } from "react";
import { ArrowUpRight, Images, Layers3 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import Lightbox from "./Lightbox";

const caseNumber = (id, index, isArabic) => {
  const numeric = id.match(/^case-(\d+)$/)?.[1];
  return numeric ? `${isArabic ? "حالة" : "Case"} ${numeric.padStart(3, "0")}` : `${isArabic ? "حالة مضافة" : "Added case"} ${String(index + 1).padStart(2, "0")}`;
};

export default function CaseGallery({ cases, categories = [], showFilters = false, limit, eager = false }) {
  const { t, isArabic } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [viewer, setViewer] = useState(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const next = filter === "all" ? cases : cases.filter((item) => item.category === filter);
    return limit ? next.slice(0, limit) : next;
  }, [cases, filter, limit]);

  const activeCase = viewer ? filtered.find((item) => item.id === viewer.caseId) : null;
  const lightboxItems = activeCase?.stages.map((item) => ({
    ...item,
    titleAr: `${activeCase.titleAr} — ${item.titleAr}`,
    titleEn: `${activeCase.titleEn} — ${item.titleEn}`,
    category: activeCase.category,
    kind: "case-stage",
  })) ?? [];

  return (
    <>
      {showFilters ? (
        <div className="filter-rail" aria-label={t.cases.filter}>
          {["all", ...categories].map((category) => (
            <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
              {t.categories[category]}
              <span>{category === "all" ? cases.length : cases.filter((item) => item.category === category).length}</span>
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length ? (
        <motion.div className="case-grid" layout={!reduceMotion}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((clinicalCase, index) => {
              const title = isArabic ? clinicalCase.titleAr : clinicalCase.titleEn;
              const cover = clinicalCase.stages[0];
              return (
                <motion.article
                  className="case-card"
                  key={clinicalCase.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: .28, ease: [.22, 1, .36, 1] }}
                >
                  <button className="case-card-cover" type="button" onClick={() => setViewer({ caseId: clinicalCase.id, stage: 0 })} aria-label={`${t.common.openCase}: ${title}`}>
                    <img src={cover.path} alt={title} loading={eager ? "eager" : "lazy"} decoding="async" />
                    <span className="case-sequence-badge"><Layers3 aria-hidden="true" />{clinicalCase.stages.length} {clinicalCase.stages.length === 1 ? t.common.stage : t.common.stages}</span>
                    <span className="case-open-chip"><ArrowUpRight aria-hidden="true" /></span>
                  </button>
                  <div className="case-card-body">
                    <div className="case-meta"><span>{caseNumber(clinicalCase.id, index, isArabic)}</span><small>{t.categories[clinicalCase.category]}</small></div>
                    <h3>{title}</h3>
                    {clinicalCase.stages.length > 1 ? (
                      <div className="case-stage-strip" aria-label={t.common.caseStages}>
                        {clinicalCase.stages.map((item, stageIndex) => (
                          <button key={item.id} type="button" onClick={() => setViewer({ caseId: clinicalCase.id, stage: stageIndex })} aria-label={`${t.common.stage} ${stageIndex + 1}: ${isArabic ? item.titleAr : item.titleEn}`}>
                            <img src={item.path} alt="" loading="lazy" />
                            <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button className="single-stage-link" type="button" onClick={() => setViewer({ caseId: clinicalCase.id, stage: 0 })}><Images aria-hidden="true" />{t.common.inspectCase}</button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : <p className="empty-state">{t.cases.empty}</p>}

      <Lightbox
        items={lightboxItems}
        activeIndex={viewer?.stage ?? null}
        onClose={() => setViewer(null)}
        onChange={(stage) => setViewer((current) => current ? { ...current, stage } : null)}
      />
    </>
  );
}
