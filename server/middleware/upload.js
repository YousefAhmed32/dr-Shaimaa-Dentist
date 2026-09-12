import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

export const uploadsDirectory = fileURLToPath(new URL("../uploads/", import.meta.url));
const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${crypto.randomUUID()}${[".jpg", ".jpeg", ".png", ".webp"].includes(extension) ? extension : ".jpg"}`);
  },
});

export const uploadCaseImages = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 12 },
  fileFilter: (_request, file, callback) => file.mimetype.startsWith("image/") ? callback(null, true) : callback(new Error("Only image files are allowed")),
}).array("images", 12);
