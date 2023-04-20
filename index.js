import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/Auth.js";
import usersRoute from "./routes/User.js";
import requestRoute from "./routes/Request.js";
import groupRouter from "./routes/Group.js"
const app = express();
dotenv.config();

const connect = () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
express.urlencoded({ extended: true });

//routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/requests", requestRoute);
app.use("/api/groups", groupRouter);

app.listen(8000, () => {
  connect();
  console.log("Connected to backend!");
});
