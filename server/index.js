import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

// Load environment variables
dotenv.config(); // ✅ .env from root is auto-detected

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
