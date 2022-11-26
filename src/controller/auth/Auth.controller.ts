import { NextFunction, Request, Response } from "express";
import { forgotPasswordDto } from "../../dto/request/UserDTO";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";
import AuthService from "../../service/ipml/Auth.service";
// import AuthService;

class AuthController {
  // [POST] /auth/signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const dataUser = await AuthService.signup(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Create user successfully", dataUser));
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/signin
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.signin(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Sign in successfully", token));
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/forgot-password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: forgotPasswordDto = req.body;
      payload.host = req.get("host");
      payload.protocol = req.protocol;

      const forgotPassword = await AuthService.forgotPassword(payload);

      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Send mail forgot password", null));
    } catch (error) {
      next(error);
    }
  }

  // [GET] /auth/forgot-password?token=...
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token: any = req.query.token;

      const chekToken = await AuthService.resetPassword(token);

      if (chekToken) {
        return res.render("page/Resetpassword", {
          isShow: true,
          token,
          messPass: "",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // [PUT] /auth/changePassword
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword, tokenReset } = req.body;

      const resultChangePassword = await AuthService.changePassword(
        newPassword,
        tokenReset
      );

      if (resultChangePassword) {
        return res
          .status(200)
          .json(new ResponseBasicDTO(true, "Change Password Success", null));
      }
    } catch (error) {
      next(error);
    }
  }

  // [GET] /auth/github
  async signInGithub(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.signinGithub(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signInGithubCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await AuthService.signinGithubCallback(req, res, next);

      if (token) {
        return res
          .status(200)
          .json(new ResponseBasicDTO(true, "Sign in successfully", token));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
