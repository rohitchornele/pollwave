import express from "express";
import cors from "cors";
import 'dotenv/config';
import rateLimit from 'express-rate-limit'
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.route.js";
import pollRouter from "./modules/poll/poll.route.js";
import ApiError from "./common/utils/api-error.js";
import voteRouter from "./modules/votes/vote.route.js";


const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://pollwave-eight.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {

        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new Error("CORS not allowed")
        );
    },

    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});

app.get("/health", (req, res) => {
    res.json({ status: 200, message: "Server is healthy" });
});

app.use("/api/auth", authRouter)
app.use("/api/polls", pollRouter)
app.use("/api/votes", voteRouter)

app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});


export default app;