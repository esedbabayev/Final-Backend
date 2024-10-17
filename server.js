import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// DB connection
import { connectToDb } from "./config/connect.js";

connectToDb();

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
