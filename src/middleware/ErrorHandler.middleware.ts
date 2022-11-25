import { NextFunction, Request, Response } from "express";

import ErrorDTO from "../dto/response/ErrorDTO";

export const ErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusError = error.status;
  let messageError = error.message;

  if (error.details) {
    const errorRequest = error.details.get("body");
    statusError = 500;
    messageError = errorRequest.message;
  }

  res.status(statusError | 500);
  res.json(new ErrorDTO(statusError, messageError));
  return res;
};
