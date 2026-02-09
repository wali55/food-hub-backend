import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));


app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.use(notFound)
app.use(errorHandler);

export default app;