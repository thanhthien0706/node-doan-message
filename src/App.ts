import ExpressSetup from "./loader/ExpressSetup";
import loader from "./loader";
import { Application } from "express";

class App {
  private port: number | string;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.initMain();
  }
  async initMain() {
    await new loader();

    const expressSetup = new ExpressSetup();
    const server: Application = expressSetup.mainInit();

    server.listen(this.port, (): void => {
      console.log("listening on port " + this.port);
    });
  }
}

new App();
