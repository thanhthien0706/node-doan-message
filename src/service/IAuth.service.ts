import { NextFunction, Request, Response } from "express";

export interface IAuthService {
  signup(userModel: any): Promise<any>;

  signin(userModel: any): Promise<any>;

  forgotPassword(payload: any): Promise<any>;

  resetPassword(token: any): Promise<any>;

  changePassword(newPassword: string, token: string): Promise<any>;

  signinGithub(req: Request, res: Response, next: NextFunction): void;

  signinGithubCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}
