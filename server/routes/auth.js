import bcrypt from "bcryptjs";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";
import { clearSessionCookie, publicUser, setSessionCookie } from "../utils/auth.js";

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-8", legacyHeaders: false });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/me", optionalAuth, (request, response) => response.json({ user: request.user ? publicUser(request.user) : null }));

router.post("/register", authLimiter, async (request, response, next) => {
  try {
    const name = String(request.body.name || "").trim();
    const email = String(request.body.email || "").trim().toLowerCase();
    const password = String(request.body.password || "");
    if (name.length < 2 || !emailPattern.test(email) || password.length < 10) return response.status(400).json({ code: "INVALID_REGISTRATION", message: "Enter a valid name, email and a password of at least 10 characters" });
    if (await User.exists({ email })) return response.status(409).json({ code: "EMAIL_EXISTS", message: "An account already exists for this email" });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: "client" });
    setSessionCookie(response, user);
    response.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post("/login", authLimiter, async (request, response, next) => {
  try {
    const email = String(request.body.email || "").trim().toLowerCase();
    const password = String(request.body.password || "");
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return response.status(401).json({ code: "INVALID_CREDENTIALS", message: "Incorrect email or password" });
    if (user.status !== "active") return response.status(403).json({ code: "ACCOUNT_SUSPENDED", message: "This account is suspended" });
    user.lastLoginAt = new Date();
    await user.save();
    setSessionCookie(response, user);
    response.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post("/logout", (_request, response) => { clearSessionCookie(response); response.status(204).end(); });

router.patch("/password", requireAuth, async (request, response, next) => {
  try {
    const currentPassword = String(request.body.currentPassword || "");
    const newPassword = String(request.body.newPassword || "");
    if (newPassword.length < 10) return response.status(400).json({ code: "WEAK_PASSWORD", message: "The new password must contain at least 10 characters" });
    const user = await User.findById(request.user._id).select("+passwordHash");
    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) return response.status(400).json({ code: "CURRENT_PASSWORD_INCORRECT", message: "Current password is incorrect" });
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.mustChangePassword = false;
    await user.save();
    setSessionCookie(response, user);
    response.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

export default router;
