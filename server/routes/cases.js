import fs from "node:fs/promises";
import path from "node:path";
import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadCaseImages, uploadsDirectory } from "../middleware/upload.js";
import Case from "../models/Case.js";
import { createSlug } from "../utils/slug.js";

const router = Router();
const categories = new Set(["restorative", "prosthodontics", "endodontics", "surgery"]);
const serialize = (item) => ({
  id: item.caseId,
  databaseId: item._id.toString(),
  slug: item.slug,
  category: item.category,
  titleAr: item.titleAr,
  titleEn: item.titleEn,
  summaryAr: item.summaryAr,
  summaryEn: item.summaryEn,
  stages: [...item.stages].sort((a, b) => a.order - b.order).map((stage) => ({ id: stage._id.toString(), path: stage.path, titleAr: stage.titleAr, titleEn: stage.titleEn })),
  featured: item.featured,
  status: item.status,
  source: item.source,
  createdAt: item.createdAt,
});

router.get("/", async (request, response, next) => {
  try {
    const filter = { status: "published" };
    if (request.query.category && categories.has(request.query.category)) filter.category = request.query.category;
    const items = await Case.find(filter).sort({ featured: -1, caseId: 1, createdAt: -1 });
    response.json({ cases: items.map(serialize) });
  } catch (error) { next(error); }
});

router.get("/admin", requireAuth, requireAdmin, async (_request, response, next) => {
  try {
    const items = await Case.find().sort({ createdAt: -1 });
    response.json({ cases: items.map(serialize) });
  } catch (error) { next(error); }
});

router.post("/", requireAuth, requireAdmin, (request, response, next) => {
  uploadCaseImages(request, response, (error) => error ? next(error) : next());
}, async (request, response, next) => {
  try {
    const files = request.files || [];
    const titleAr = String(request.body.titleAr || "").trim();
    const titleEn = String(request.body.titleEn || "").trim();
    const category = String(request.body.category || "");
    const stageMeta = JSON.parse(request.body.stages || "[]");
    if (!titleAr || !titleEn || !categories.has(category) || !files.length || stageMeta.length !== files.length) {
      await Promise.all(files.map((file) => fs.unlink(file.path).catch(() => {})));
      return response.status(400).json({ message: "Complete the case details and add at least one ordered image" });
    }
    const sequence = await Case.countDocuments({ source: "admin" });
    const item = await Case.create({
      caseId: `case-admin-${String(sequence + 1).padStart(3, "0")}-${Date.now().toString(36)}`,
      slug: `${createSlug(titleEn)}-${Date.now().toString(36)}`,
      category,
      titleAr,
      titleEn,
      summaryAr: String(request.body.summaryAr || "").trim(),
      summaryEn: String(request.body.summaryEn || "").trim(),
      featured: request.body.featured === "true",
      status: request.body.status === "draft" ? "draft" : "published",
      source: "admin",
      createdBy: request.user._id,
      stages: files.map((file, index) => ({
        path: `/uploads/${file.filename}`,
        titleAr: String(stageMeta[index]?.titleAr || `المرحلة ${index + 1}`).trim(),
        titleEn: String(stageMeta[index]?.titleEn || `Stage ${index + 1}`).trim(),
        order: index,
        originalName: file.originalname,
      })),
    });
    response.status(201).json({ case: serialize(item) });
  } catch (error) {
    await Promise.all((request.files || []).map((file) => fs.unlink(file.path).catch(() => {})));
    next(error);
  }
});

router.patch("/:id", requireAuth, requireAdmin, async (request, response, next) => {
  try {
    const allowed = ["titleAr", "titleEn", "summaryAr", "summaryEn", "featured", "status", "category"];
    const updates = Object.fromEntries(allowed.filter((key) => request.body[key] !== undefined).map((key) => [key, request.body[key]]));
    if (updates.category && !categories.has(updates.category)) return response.status(400).json({ message: "Invalid category" });
    if (updates.status && !["draft", "published"].includes(updates.status)) return response.status(400).json({ message: "Invalid status" });
    const item = await Case.findByIdAndUpdate(request.params.id, updates, { new: true, runValidators: true });
    if (!item) return response.status(404).json({ message: "Case not found" });
    response.json({ case: serialize(item) });
  } catch (error) { next(error); }
});

router.delete("/:id", requireAuth, requireAdmin, async (request, response, next) => {
  try {
    const item = await Case.findById(request.params.id);
    if (!item) return response.status(404).json({ message: "Case not found" });
    if (item.source === "curated") return response.status(400).json({ message: "Curated cases cannot be deleted from the dashboard" });
    const uploadsRoot = path.resolve(uploadsDirectory);
    await Promise.all(item.stages.map(async (stage) => {
      if (!stage.path.startsWith("/uploads/")) return;
      const filename = path.resolve(uploadsRoot, path.basename(stage.path));
      if (filename.startsWith(uploadsRoot)) await fs.unlink(filename).catch(() => {});
    }));
    await item.deleteOne();
    response.status(204).end();
  } catch (error) { next(error); }
});

export default router;
