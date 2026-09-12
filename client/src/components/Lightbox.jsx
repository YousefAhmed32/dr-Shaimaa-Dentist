import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Lightbox({ items, activeIndex, onClose, onChange }) {
  const { t, isArabic } = useLanguage();
  const [zoomed, setZoomed] = useState(false);
  const isOpen = activeIndex !== null && Boolean(items[activeIndex]);

  useEffect(() => setZoomed(false), [activeIndex]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % items.length);
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, isOpen, items.length, onChange]);

  if (!isOpen) return null;
  const media = items[activeIndex];
  const title = isArabic ? media.titleAr : media.titleEn;
  const previous = () => onChange((activeIndex - 1 + items.length) % items.length);
  const next = () => onChange((activeIndex + 1) % items.length);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content className="lightbox-panel" aria-describedby={undefined}>
          <header className="lightbox-header">
            <div><small>{t.common.image} {activeIndex + 1} {t.common.of} {items.length}</small><Dialog.Title>{title}</Dialog.Title></div>
            <div className="lightbox-tools">
              <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? t.common.zoomOut : t.common.zoomIn} aria-pressed={zoomed}>{zoomed ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</button>
              <Dialog.Close asChild><button type="button" aria-label={t.common.close}><X aria-hidden="true" /></button></Dialog.Close>
            </div>
          </header>
          <div className={`lightbox-stage ${zoomed ? "is-zoomed" : ""}`}>
            <button className="lightbox-nav lightbox-nav--previous" type="button" onClick={previous} aria-label={t.common.previous}><ChevronLeft aria-hidden="true" /></button>
            <div className="lightbox-scroll"><img src={media.path} alt={title} onClick={() => setZoomed((value) => !value)} /></div>
            <button className="lightbox-nav lightbox-nav--next" type="button" onClick={next} aria-label={t.common.next}><ChevronRight aria-hidden="true" /></button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
