import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/database.js";
import User from "../models/User.js";

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) throw new Error("Set ADMIN_NAME, ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env");

await connectDatabase();
const user = await User.findOneAndUpdate({ email: ADMIN_EMAIL.toLowerCase().trim() }, {
  name: ADMIN_NAME.trim(), email: ADMIN_EMAIL.toLowerCase().trim(), passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
  role: "admin", status: "active", mustChangePassword: true,
}, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
console.log(`Admin ready: ${user.email}`);
process.exit(0);
