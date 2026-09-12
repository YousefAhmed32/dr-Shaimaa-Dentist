import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import Case from "../models/Case.js";
import User from "../models/User.js";
// test  يي
const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/stats", async (_request, response, next) => {
  try {
    const [totalUsers, clients, admins, activeUsers, totalCases, publishedCases, imageResult, recentUsers] = await Promise.all([
      User.countDocuments(), User.countDocuments({ role: "client" }), User.countDocuments({ role: "admin" }), User.countDocuments({ status: "active" }),
      Case.countDocuments(), Case.countDocuments({ status: "published" }),
      Case.aggregate([{ $project: { imageCount: { $size: "$stages" } } }, { $group: { _id: null, total: { $sum: "$imageCount" } } }]),
      User.find().sort({ createdAt: -1 }).limit(6).select("name email role status createdAt"),
    ]);
    response.json({
      users: { total: totalUsers, clients, admins, active: activeUsers },
      cases: { total: totalCases, published: publishedCases, images: imageResult[0]?.total || 0 },
      recentUsers: recentUsers.map((user) => ({ id: user._id.toString(), name: user.name, email: user.email, role: user.role, status: user.status, createdAt: user.createdAt })),
    });
  } catch (error) { next(error); }
});

router.get("/users", async (request, response, next) => {
  try {
    const page = Math.max(1, Number(request.query.page || 1));
    const limit = Math.min(50, Math.max(1, Number(request.query.limit || 20)));
    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select("name email role status createdAt lastLoginAt"),
      User.countDocuments(),
    ]);
    response.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
});

export default router;
