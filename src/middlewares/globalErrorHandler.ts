import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let errorStatus = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    errorStatus = 400;
    errorMessage = "You have provided missing fields or incorrect field types!";
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      errorStatus = 400;
      errorMessage = "Wrong input!";
    } else if ((err.code = "P2002")) {
      errorStatus = 400;
      errorMessage = "Unique constraint failed!";
    } else if ((err.code = "P2003")) {
      errorStatus = 400;
      errorMessage = "Foreign key constraint failed!";
    }
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    errorMessage = "Unknown error!";
  }

  if (err instanceof Prisma.PrismaClientRustPanicError) {
    errorMessage = "Prisma engine crashed!";
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
        errorStatus = 401;
        errorMessage = "Authentication error!"
    } else if (err.errorCode === "P1001") {
        errorStatus = 400;
        errorMessage = "Can't reach database server!"
    }
  }
  res.status(errorStatus).json({ message: errorMessage, error: errorDetails });
}

export default errorHandler;