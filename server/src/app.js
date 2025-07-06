import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware.js";


dotenv.config(); // Load environment variables

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

// Parse incoming JSON requests
app.use(
  express.json({
    limit: "16kb",
  })
);

// Parse URL-encoded data (form submissions)
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(errorHandler);

// Serve static files (e.g., for uploaded files or public assets)
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// ROUTES IMPORT
import userRouter from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// ROUTES DECLARATION
app.use("/api/v1/users", userRouter);
// Example: http://localhost:8000/api/v1/users/register

app.use("/api/v1/users/admin", adminRoutes);
// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("🧠 JuryAI Server is Running");
});

export { app };
