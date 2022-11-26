const ejs = require("ejs");
import createError from "http-errors";

class FileService {
  async readViewEjs(path: string, params: object) {
    const html = ejs.renderFile(
      `./src/views/${path}`,
      {
        ...params,
      },
      { async: true }
    );

    if (!html) {
      throw createError(501, "No Reading File");
    }

    return html;
  }
}

export default new FileService();
