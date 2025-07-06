import express from "express";
import multer from "multer";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordWithOtp,
  sendOtpForPasswordReset,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "temp/" });

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticated, getMyProfile);
router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("avatar"),
  updateProfile
);
router.post("/forgot-password", sendOtpForPasswordReset);
router.post("/reset-password", resetPasswordWithOtp);

export default router;
