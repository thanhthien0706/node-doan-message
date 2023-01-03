import express, { Application, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import Routes from "../routes";
import http from "http";
import SocketSetup from "./SocketSetup";
// import allowCors from "./CorsVercel";

const app: Application = express();

class ExpressSetup {
  private server: any;
  constructor() {
    this.server = http.createServer(app);
  }
  mainInit() {
    // app.use(allowCors);

    app.use(
      cors({
        origin: "*",
      })
    );

    // view engine setup
    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static("./src/public"));
    app.use(
      session({
        secret: "thanhthien bla bla",
        resave: false,
        saveUninitialized: true,
      })
    );

    new SocketSetup(this.server);
    new Routes(app);

    return this.server;
  }
}

export default ExpressSetup;
