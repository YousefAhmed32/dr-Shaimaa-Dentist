import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(", ")}`);

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cookieDays: Number(process.env.COOKIE_DAYS || 7),
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrls: (process.env.CLIENT_URL || "http://127.0.0.1:5173,http://localhost:5173").split(",").map((value) => value.trim()).filter(Boolean),
};
