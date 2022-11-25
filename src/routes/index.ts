import { Application } from "express";

import { ErrorHandler } from "../middleware/ErrorHandler.middleware";
import createError from "http-errors";

import AuthRouter from "./Auth.router";
import RoleRouter from "./Role.router";

class Index {
  private app: Application;
  constructor(appContext: Application) {
    this.app = appContext;

    this.initRoutes();
  }
  initRoutes() {
    this.app.use("/auth", AuthRouter);
    this.app.use("/role", RoleRouter);
    this.app.use((req, res, next) => {
      next(new createError.NotFound("Link Api Not Found"));
    });
    this.app.use(ErrorHandler);
  }
}

export default Index;
