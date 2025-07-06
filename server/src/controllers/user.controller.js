import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { generateToken } from "../utils/token.util.js";
import cloudinary from "../services/cloudinary.js";
import transporter from "../services/nodemailer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashOtp } from "../utils/hashOtp.js";

// Register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const avatarFile = req.file;

  if (!fullName || !email || !password || !avatarFile) {
    throw new ApiError(400, "All fields including avatar are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await cloudinary.v2.uploader.upload(avatarFile.path, {
    folder: "JuryAI/avatars",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  // Sending Welcome Email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Welcome to JuryAI!",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Hi ${user.fullName},</h2>
        <p>Welcome to <strong>JuryAI</strong>! 🎉</p>
        <p>We're excited to have you on board. Start exploring and enjoy the experience.</p>
        <hr />
        <p style="font-size:12px;color:#777;">If you didn't sign up for this, you can ignore this email.</p>
      </div>
    `,
  });

  const accessToken = generateToken(
    { id: user._id },
    process.env.JWT_SECRET,
    "1h"
  );

  const refreshToken = generateToken(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    "7d"
  );

  res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        201,
        {
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
          },
          accessToken,
        },
        "User registered successfully"
      )
    );
});

// Login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(404, "Invalid email or password");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new ApiError(401, "Invalid email or password");

  const accessToken = generateToken(
    { id: user._id },
    process.env.JWT_SECRET,
    "1h"
  );

  const refreshToken = generateToken(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    "7d"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar,
          },
          accessToken,
        },
        "Login successful"
      )
    );
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

// Get Profile
export const getMyProfile = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "User profile fetched successfully"
    )
  );
});

// Update User Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio } = req.body;
  const avatarFile = req.file;
  const userId = req.user._id;

  const updatePayload = {};

  if (fullName) updatePayload.fullName = fullName;
  if (bio) updatePayload.bio = bio;

  if (avatarFile) {
    const result = await cloudinary.v2.uploader.upload(avatarFile.path, {
      folder: "JuryAI/avatars",
      width: 150,
      crop: "scale",
    });

    updatePayload.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatePayload, {
    new: true,
  }).select("-password");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio || "",
        role: updatedUser.role,
      },
      "Profile updated successfully"
    )
  );
});

// OTP Based Forgot Password
export const sendOtpForPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("Email for OTP: ", email);

  if (!email) throw new ApiError(400, "Email is required.");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found.");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = hashOtp(otp);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = { code: hashedOtp, expiresAt };
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP - JuryAI",
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>Hi ${user.fullName},</h2>
        <p>Your OTP for JuryAI password reset is:</p>
        <h1 style="color:#007bff;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  });

  res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent to email successfully."));
});

// Password Reset
export const resetPasswordWithOtp = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "Email, OTP, and new password are required.");
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp) {
    throw new ApiError(400, "OTP not requested or already used.");
  }

  const isValidOtp =
    user.otp.code === hashOtp(otp) && user.otp.expiresAt > new Date();

  if (!isValidOtp) {
    throw new ApiError(401, "Invalid or expired OTP.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.otp = undefined; // clean up OTP

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully."));
});
