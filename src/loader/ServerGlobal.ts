import mongoose from "mongoose";
import { MONGO_ENDPOINT } from "../config/enviroment";

class ServerGlobal {
  static _instance: ServerGlobal;

  constructor() {
    this.initMongoose();
  }
  initMongoose() {
    mongoose
      .connect(
        "mongodb+srv://thanhthien:q5yTDRmTa0qMYF5e@cluster0.lqwkrcv.mongodb.net/db_doan_message?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connect mongo successfully ");
      })
      .catch((e) => {
        console.log("Connect mongo failed: " + e.message);
      });
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new ServerGlobal();

    return this._instance;
  }
}

export default ServerGlobal;
