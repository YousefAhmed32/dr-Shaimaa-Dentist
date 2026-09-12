import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const publicUser = (user) => ({ id: user._id.toString(), name: user.name, email: user.email, role: user.role, status: user.status, mustChangePassword: user.mustChangePassword, createdAt: user.createdAt });

export function setSessionCookie(response, user) {
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  response.cookie("session", token, { httpOnly: true, secure: env.nodeEnv === "production", sameSite: "lax", maxAge: env.cookieDays * 86400000, path: "/" });
}

export function clearSessionCookie(response) {
  response.clearCookie("session", { httpOnly: true, secure: env.nodeEnv === "production", sameSite: "lax", path: "/" });
}
