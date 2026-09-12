import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "client"], default: "client", index: true },
  status: { type: String, enum: ["active", "suspended"], default: "active", index: true },
  mustChangePassword: { type: Boolean, default: false },
  lastLoginAt: { type: Date, default: null },
}, { timestamps: true });

userSchema.index({ createdAt: -1 });
export default mongoose.model("User", userSchema);
