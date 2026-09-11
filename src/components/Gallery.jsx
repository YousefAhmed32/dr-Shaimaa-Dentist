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
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: .98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: .15 }}
                transition={{ duration: .44, ease: [.22, 1, .36, 1], delay: Math.min(index, 5) * .035 }}
              >
                <button type="button" className="gallery-open" onClick={() => setActiveIndex(index)} aria-label={`${t.common.openImage}: ${title}`}>
                  <span className="gallery-image">
                    <img src={media.path} alt={title} loading="lazy" decoding="async" />
                    <span className="expand-chip"><Expand aria-hidden="true" /></span>
                  </span>
                  <span className="gallery-caption">
                    <span><small>{String(index + 1).padStart(2, "0")} / {t.categories[media.category]}</small><strong>{title}</strong></span>
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
