import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Lightbox({ items, activeIndex, onClose, onChange }) {
  const { t, isArabic } = useLanguage();
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const isOpen = activeIndex !== null && items[activeIndex];

  useEffect(() => {
    if (!isOpen) return undefined;
    returnFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % items.length);
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + items.length) % items.length);
      if (event.key === "Tab") {
        const focusable = [...document.querySelectorAll(".lightbox button:not([disabled])")];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [activeIndex, isOpen, items.length, onChange, onClose]);

  useEffect(() => setZoomed(false), [activeIndex]);
  if (!isOpen) return null;

  const media = items[activeIndex];
  const title = isArabic ? media.titleAr : media.titleEn;
  const previous = () => onChange((activeIndex - 1 + items.length) % items.length);
  const next = () => onChange((activeIndex + 1) % items.length);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="lightbox-panel">
        <header className="lightbox-header">
          <div><small>{t.common.image} {activeIndex + 1} {t.common.of} {items.length}</small><h2 id="lightbox-title">{title}</h2></div>
          <div className="lightbox-tools">
            <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? t.common.zoomOut : t.common.zoomIn} aria-pressed={zoomed}>{zoomed ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.common.close}><X aria-hidden="true" /></button>
          </div>
        </header>
        <div className={`lightbox-stage ${zoomed ? "is-zoomed" : ""}`}>
          <button className="lightbox-nav lightbox-nav--previous" type="button" onClick={previous} aria-label={t.common.previous}><ChevronLeft aria-hidden="true" /></button>
          <div className="lightbox-scroll"><img src={media.path} alt={title} onClick={() => setZoomed((value) => !value)} /></div>
          <button className="lightbox-nav lightbox-nav--next" type="button" onClick={next} aria-label={t.common.next}><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
