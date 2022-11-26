import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import passport from "passport";

import {
  createUserDto,
  forgotPasswordDto,
  signinUserDto,
} from "../../dto/request/UserDTO";
import { IAuthService } from "../IAuth.service";
import FileService from "./File.service";
import JwtService from "./Jwt.service";
import MailService from "./Mail.service";
import RoleService from "./Role.service";
import UserService from "./User.service";

class AuthService implements IAuthService {
  async signup(userModel: createUserDto): Promise<any> {
    const dataRoleUser = await RoleService.findOneByName("ROLE_USER");
    if (dataRoleUser) {
      userModel.role = dataRoleUser._id;
      userModel.activity = true;
      const user = await UserService.save(userModel);
      return user;
    }
  }

  async signin(userModel: signinUserDto): Promise<any> {
    const dataUser: any = await UserService.findOneUserByEmail(userModel.email);

    console.log(dataUser);

    if (!dataUser.validPassword(userModel.password)) {
      throw createError(200, "Wrong Password");
    }

    const token = await JwtService.generateToken({ id: dataUser._id });

    return token;
  }

  async forgotPassword(payload: forgotPasswordDto): Promise<any> {
    const user = await UserService.findOneUserByEmail(payload.email);

    if (user) {
      const token = await JwtService.generateToken(
        { id: user._id },
        {
          expiresIn: "2h",
        }
      );

      const url = `${payload.protocol}://${payload.host}/auth/reset-password?token=${token}`;

      const contentMail = await FileService.readViewEjs(
        "mail/MailResetPassword.ejs",
        {
          link: url,
          hours: 2,
        }
      );

      const subject = `Reset Password for ${user._id}`;
      const toEmail = user.local.email;

      const resultSendMail = await MailService.sendMail(
        contentMail,
        subject,
        toEmail
      );

      if (resultSendMail) {
        return true;
      }
    }
  }

  async resetPassword(token: any): Promise<any> {
    const dataToken = await JwtService.verifyToken(token);

    if (dataToken.exp < new Date().getTime() / 1000) {
      throw createError(401, "Token Expired");
    }

    return true;
  }

  async changePassword(newPassword: string, token: string): Promise<any> {
    const dataToken = await JwtService.verifyToken(token);

    if (dataToken) {
      const oldUser = await UserService.findOneById(dataToken.id);
      const user = await UserService.findOneAndUpdateByCondition(
        {
          _id: dataToken.id,
        },
        {
          "local.password": oldUser.generateHash(newPassword),
        }
      );

      return true;
    }
  }

  signinGithub(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  }

  signinGithubCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate("github", async (err, user) => {
        if (err) {
          reject(createError(500, err));
        }

        if (user.userExist) {
          const token = await JwtService.generateToken({
            id: user.userExist._id,
          });
          resolve(token);
        } else {
          const token = await JwtService.generateToken({
            id: user.userCreate._id,
          });
          resolve(token);
        }
      })(req, res, next);
    });
  }
}

export default new AuthService();
