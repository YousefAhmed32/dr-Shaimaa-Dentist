import { Images, ScanSearch } from "lucide-react";
import CaseGallery from "../components/CaseGallery";
import PageIntro from "../components/PageIntro";
import { useLanguage } from "../context/LanguageContext";
import { curatedImageCount } from "../data/cases";
import { useClinicalCases } from "../hooks/useClinicalCases";

export default function CasesPage() {
  const { t } = useLanguage();
  const { cases } = useClinicalCases();
  const categories = ["restorative", "prosthodontics", "endodontics", "surgery"];
  const imageCount = cases.reduce((total, item) => total + item.stages.length, 0) || curatedImageCount;
  return (
    <>
      <PageIntro kicker={t.cases.kicker} title={t.cases.title} lead={t.cases.lead} aside={<><Images aria-hidden="true" /><strong>{cases.length}</strong><span>{t.cases.countLabel} · {imageCount} {t.cases.imageCountLabel}</span></>} />
      <section className="gallery-section shell">
        <div className="gallery-note"><ScanSearch aria-hidden="true" /><span>{t.common.openImage}</span></div>
        <CaseGallery cases={cases} categories={categories} showFilters />
      </section>
    </>
  );
}
