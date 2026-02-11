import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import authRouter from "./modules/auth/auth.route";
import categoryRouter from "./modules/category/category.route";
import mealRouter from "./modules/meal/meal.route";
import providerProfileRouter from "./modules/providerProfile/providerProfile.route";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/provider-profile", providerProfileRouter);

app.use(notFound)
app.use(errorHandler);

export default app;