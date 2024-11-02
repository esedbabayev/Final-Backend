import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import AuthRouter from "./routes/auth/auth.routes.js";
import AdminProductsRouter from "./routes/admin/products.routes.js";

// DB connection
import { connectToDb } from "./config/connect.js";

connectToDb();

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());

// Use routes
server.use("/api/auth", AuthRouter);
server.use("/api/admin/products", AdminProductsRouter);

dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
