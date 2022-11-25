import { IncomingHttpHeaders } from "http";
import createError from "http-errors";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/enviroment";
import { IJwtService } from "../IJwt.service";

class JwtService implements IJwtService {
  getToken(headers: IncomingHttpHeaders): string {
    if (headers && headers.authorization != "") {
      if (headers.authorization) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
          return parted[1];
        }
      }
    }
    throw createError(404, "Token Not Found");
  }

  async generateToken(data: object, options = {}): Promise<string | undefined> {
    if (JWT_SECRET) {
      try {
        let token = await jwt.sign(data, JWT_SECRET, {
          expiresIn: "30 days",
          ...options,
        });

        if (token) {
          return token;
        }
      } catch (error) {
        throw createError(401, "Not Generate Token");
      }
    }
  }

  async verifyToken(token: string, options = {}): Promise<any> {
    if (JWT_SECRET) {
      try {
        let data = await jwt.verify(token, JWT_SECRET, {
          ...options,
        });

        if (data) {
          return data;
        }
      } catch (error) {
        throw createError(401, "Not Verify Token");
      }
    }
  }
}

export default new JwtService();
