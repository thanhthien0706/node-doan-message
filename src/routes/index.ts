import { Application } from "express";
import createError from "http-errors";

import { ErrorHandler } from "../middleware/ErrorHandler.middleware";
import CheckAccountMiddleware from "../middleware/CheckAccount.middleware";

import AuthRouter from "./Auth.router";
import RoleRouter from "./Role.router";
import UserRouter from "./User.router";
import FriendRouter from "./Friend.router";
import ConversationRouter from "./Conversation.router";

class Index {
  private app: Application;
  constructor(appContext: Application) {
    this.app = appContext;

    this.initRoutes();
  }
  initRoutes() {
    this.app.use(
      "/conversation",
      CheckAccountMiddleware.checkLogin,
      ConversationRouter
    );
    this.app.use("/friend", CheckAccountMiddleware.checkLogin, FriendRouter);
    this.app.use("/user", UserRouter);
    this.app.use("/auth", AuthRouter);
    this.app.use("/role", RoleRouter);
    this.app.use((req, res, next) => {
      next(new createError.NotFound("Link Api Not Found"));
    });
    this.app.use(ErrorHandler);
  }
}

export default Index;
