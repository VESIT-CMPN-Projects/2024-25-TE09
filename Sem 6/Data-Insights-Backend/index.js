import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./DB/connectDB.js";
import authRoutes from "./Routes/auth.routes.js";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration - properly configured for credentials
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"]
  })
);

// Remove the custom middleware that was conflicting with the cors package

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Add a special route to handle OPTIONS preflight requests for auth endpoints
app.options("/api/auth/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", frontendUrl);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Origin, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  connectDB(process.env.MONGO_URL);
  console.log(`Server is running on port http://localhost:${port}`);
});