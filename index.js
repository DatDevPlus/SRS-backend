import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/Auth.js'
import usersRoute from './routes/User.js'

const app = express();
dotenv.config();

const connect = () => {
    try {
        mongoose.connect(process.env.uri);
    } catch (error) {
        throw error;
    }
};

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
express.urlencoded({ extended: true })

//routes
app.use("/api/auth", authRoute)
app.use("/api/user", usersRoute)

app.listen(8000, () => {
    connect();
    console.log("Connected to backend!");
});