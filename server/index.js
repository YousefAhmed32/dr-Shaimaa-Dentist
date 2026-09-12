import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { uploadsDirectory } from "./middleware/upload.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import caseRoutes from "./routes/cases.js";

const app = express();
const clientDistDirectory = fileURLToPath(new URL("../client/dist/", import.meta.url));
if (env.nodeEnv === "production") app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: (origin, callback) => (!origin || env.clientUrls.includes(origin)) ? callback(null, true) : callback(new Error("Origin not allowed")), credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(uploadsDirectory, { maxAge: env.nodeEnv === "production" ? "7d" : 0, immutable: env.nodeEnv === "production" }));

app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", (_request, response) => response.status(404).json({ message: "API route not found" }));

if (env.nodeEnv === "production") {
  app.use(express.static(clientDistDirectory));
  app.use((_request, response) => response.sendFile(path.join(clientDistDirectory, "index.html")));
}

app.use((error, _request, response, _next) => {
  const uploadLimit = error.code === "LIMIT_FILE_SIZE" || error.code === "LIMIT_FILE_COUNT";
  const invalidInput = error instanceof SyntaxError || error.message === "Only image files are allowed";
  const status = uploadLimit ? 413 : invalidInput ? 400 : 500;
  console.error(error);
  response.status(status).json({ message: uploadLimit ? "Image upload limit exceeded" : invalidInput ? error.message : "The server could not complete this request" });
});

connectDatabase().then(() => app.listen(env.port, "127.0.0.1", () => console.log(`API ready at http://127.0.0.1:${env.port}`))).catch((error) => { console.error("Database connection failed", error); process.exit(1); });
