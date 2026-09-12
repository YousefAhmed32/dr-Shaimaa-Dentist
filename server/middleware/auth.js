import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import User from "../models/User.js";

const readUser = async (request) => {
  const token = request.cookies?.session;
  if (!token) return null;
  const payload = jwt.verify(token, env.jwtSecret);
  return User.findById(payload.sub).select("name email role status mustChangePassword createdAt");
};

export async function optionalAuth(request, _response, next) {
  try { request.user = await readUser(request); } catch { request.user = null; }
  next();
}

export async function requireAuth(request, response, next) {
  try {
    const user = await readUser(request);
    if (!user || user.status !== "active") return response.status(401).json({ code: "AUTH_REQUIRED", message: "Authentication required" });
    request.user = user;
    next();
  } catch { response.status(401).json({ code: "SESSION_EXPIRED", message: "Invalid or expired session" }); }
}

export function requireAdmin(request, response, next) {
  if (request.user?.role !== "admin") return response.status(403).json({ code: "ADMIN_REQUIRED", message: "Administrator access required" });
  if (request.user.mustChangePassword) return response.status(403).json({ code: "PASSWORD_CHANGE_REQUIRED", message: "Change the temporary password before using administration tools" });
  next();
}
