import { connectDatabase } from "../config/database.js";
import Case from "../models/Case.js";
import { curatedCases } from "../../src/data/cases.js";

await connectDatabase();
for (const item of curatedCases) {
  await Case.updateOne({ caseId: item.id }, { $set: {
    caseId: item.id, slug: item.slug, category: item.category, titleAr: item.titleAr, titleEn: item.titleEn,
    summaryAr: item.summaryAr, summaryEn: item.summaryEn, featured: item.featured, status: "published", source: "curated",
    stages: item.stages.map((stage, order) => ({ path: stage.path, titleAr: stage.titleAr, titleEn: stage.titleEn, order })),
  } }, { upsert: true });
}
console.log(`Seeded ${curatedCases.length} curated cases.`);
process.exit(0);
