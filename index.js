import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/Auth.js";
import usersRoute from "./routes/User.js";
import requestRoute from "./routes/Request.js";
import groupRoute from "./routes/Group.js";
import permissionRoute from "./routes/Permission.js";
import workspaceRouter from "./routes/WorkSpace.js";
import dayOffRouter from "./routes/Dayoff.js";
import requestHistoryRouter from "./routes/RequestHistory.js";

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
app.use("/api/groups", groupRoute);
app.use("/api/permissions", permissionRoute);
app.use("/api/workspace", workspaceRouter);
app.use("/api/dayOff", dayOffRouter);
app.use("/api/histories", requestHistoryRouter);

app.listen(8000, () => {
  connect();
  console.log("Connected to backend!");
});
