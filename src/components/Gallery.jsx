import { useMemo, useState } from "react";
import { Expand, Image as ImageIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import Lightbox from "./Lightbox";

export default function Gallery({ items, categories = [], showFilters = false, limit }) {
  const { t, isArabic } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const next = filter === "all" ? items : items.filter((media) => media.category === filter);
    return limit ? next.slice(0, limit) : next;
  }, [filter, items, limit]);

  return (
    <>
      {showFilters ? (
        <div className="filter-rail" aria-label={t.cases.filter}>
          {["all", ...categories].map((category) => (
            <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
              {t.categories[category]}
              <span>{category === "all" ? items.length : items.filter((media) => media.category === category).length}</span>
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length ? (
        <motion.div className="gallery-grid" layout={!reduceMotion}>
          <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((media, index) => {
            const title = isArabic ? media.titleAr : media.titleEn;
            return (
              <motion.article
                className={`gallery-card gallery-card--${media.kind}`}
                key={media.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: .24, ease: [.22, 1, .36, 1] }}
              >
                <button type="button" className="gallery-open" onClick={() => setActiveIndex(index)} aria-label={`${t.common.openImage}: ${title}`}>
                  <span className="gallery-image">
                    <img src={media.path} alt={title} loading="lazy" decoding="async" />
                    <span className="expand-chip"><Expand aria-hidden="true" /></span>
                  </span>
                  <span className="gallery-caption">
                    <span><small>{t.categories[media.category]}</small><strong>{title}</strong></span>
                    <ImageIcon aria-hidden="true" />
                  </span>
                </button>
              </motion.article>
            );
          })}
          </AnimatePresence>
        </motion.div>
      ) : <p className="empty-state">{t.cases.empty}</p>}

      <Lightbox items={filtered} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
    </>
  );
}
