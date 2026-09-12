import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  titleAr: { type: String, required: true, trim: true, maxlength: 140 },
  titleEn: { type: String, required: true, trim: true, maxlength: 140 },
  order: { type: Number, required: true, min: 0 },
  originalName: { type: String, default: "" },
});

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true, index: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, enum: ["restorative", "prosthodontics", "endodontics", "surgery"], required: true, index: true },
  titleAr: { type: String, required: true, trim: true, maxlength: 180 },
  titleEn: { type: String, required: true, trim: true, maxlength: 180 },
  summaryAr: { type: String, default: "", trim: true, maxlength: 1200 },
  summaryEn: { type: String, default: "", trim: true, maxlength: 1200 },
  stages: { type: [stageSchema], validate: [(value) => value.length > 0, "A case requires at least one image"] },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ["draft", "published"], default: "published", index: true },
  source: { type: String, enum: ["curated", "admin"], default: "admin" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

caseSchema.index({ status: 1, category: 1, createdAt: -1 });
export default mongoose.model("Case", caseSchema);
