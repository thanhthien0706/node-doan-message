import ServerGlobal from "./ServerGlobal";
import PassportService from "../service/Passport.service";

class Index {
  constructor() {
    this.initMainLoader();
  }
  async initMainLoader() {
    await ServerGlobal.getInstance();
    await PassportService();
  }
}

export default Index;
