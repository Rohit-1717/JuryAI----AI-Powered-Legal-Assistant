import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed", err);
  });

console.log("Mongo URI:", process.env.MONGODB_URI);
