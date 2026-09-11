import { Images, ScanSearch } from "lucide-react";
import Gallery from "../components/Gallery";
import PageIntro from "../components/PageIntro";
import { useLanguage } from "../context/LanguageContext";
import { clinicalMedia } from "../data/media";

export default function CasesPage() {
  const { t } = useLanguage();
  const categories = ["restorative", "prosthodontics", "endodontics", "surgery", "clinical", "concept"];
  return (
    <>
      <PageIntro kicker={t.cases.kicker} title={t.cases.title} lead={t.cases.lead} aside={<><Images aria-hidden="true" /><strong>{clinicalMedia.length}</strong><span>{t.cases.countLabel}</span></>} />
      <section className="gallery-section shell">
        <div className="gallery-note"><ScanSearch aria-hidden="true" /><span>{t.common.openImage}</span></div>
        <Gallery items={clinicalMedia} categories={categories} showFilters />
      </section>
    </>
  );
}
