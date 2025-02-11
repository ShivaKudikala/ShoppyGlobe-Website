import express from "express";
import connectDB from "./mongo.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";

// Create an express app
const app = express();
const PORT = 9898;

// Allow cross-origin requests
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Middleware to parse JSON data
app.use(express.json());

connectDB(); // Connect to the database

// Define routes
productRoutes(app);
cartRoutes(app);
userRoutes(app);

// Start the server
app.listen(PORT, ()=> {
    console.log("Server running of PORT 9898");
});



