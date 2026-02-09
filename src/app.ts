import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import authRouter from "./modules/auth/auth.route"

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.use("/api/v1/auth", authRouter);

app.use(notFound)
app.use(errorHandler);

export default app;