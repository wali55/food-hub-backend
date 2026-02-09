import { Request, Response } from "express";

function notFound(req: Request, res: Response) {
    return res.status(400).json({
        message: "Route not found!",
        path: req.originalUrl,
        time: Date()
    })
}

export default notFound;