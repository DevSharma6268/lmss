import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
// Load environment variables
dotenv.config(); // ✅ .env from root is auto-detected

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

const PORT = process.env.PORT || 3000;


//apis
app.use("/api/v1/user",userRoute)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
