import { IUtilsService } from "../IUtils.service";

class UtilsService implements IUtilsService {
  randomString(len: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < len; i++) {
      result += characters.charAt(
        Math.floor(Math.random() + characters.length)
      );
    }

    return result;
  }
}

export default new UtilsService();
