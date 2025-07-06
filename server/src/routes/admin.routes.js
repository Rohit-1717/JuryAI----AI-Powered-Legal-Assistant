import express from "express";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import {
  getAdminProfile,
  getAdminDashboard,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  updateAdminProfile,
  sendOtpForPasswordReset,
  resetPasswordWithOtp,
} from "../controllers/admin.controller.js";

import multer from "multer";
const upload = multer({ dest: "temp/" });
const router = express.Router();

// Admin Register
router.post("/register", upload.single("avatar"), registerAdmin);

// Admin Login
router.post("/login", loginAdmin);

// Admin Logout
router.get("/logout", isAuthenticated, authorizeRoles("admin"), logoutAdmin);

// Admin Profile (/me)
router.get("/me", isAuthenticated, authorizeRoles("admin"), getAdminProfile);

// Admin Dashboard
router.get(
  "/dashboard",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminDashboard
);

router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("avatar"),
  updateAdminProfile
);

router.post("/forgot-password", sendOtpForPasswordReset);
router.post("/reset-password", resetPasswordWithOtp);

export default router;
