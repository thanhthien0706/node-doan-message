import express, { Application } from "express";
import session from "express-session";
import cors from "cors";
import Routes from "../routes";

const app: Application = express();

class ExpressSetup {
  constructor() {}
  mainInit() {
    app.use(cors());

    // view engine setup
    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static("./public"));
    app.use(
      session({
        secret: "thanhthien bla bla",
        resave: false,
        saveUninitialized: true,
      })
    );

    new Routes(app);

    return app;
  }
}

export default ExpressSetup;
