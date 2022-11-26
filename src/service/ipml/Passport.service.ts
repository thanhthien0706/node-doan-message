import passport from "passport";
import passportGitHub, { StrategyOptionsWithRequest } from "passport-github2";

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_URL_CALLBACK,
} from "../../config/enviroment";

import RoleService from "./Role.service";
import UserService from "./User.service";

const GitHubStrategy = passportGitHub.Strategy;

function PassportService() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_URL_CALLBACK,
      } as StrategyOptionsWithRequest,
      function (accessToken: any, refreshToken: any, profile: any, done: any) {
        process.nextTick(async () => {
          try {
            const checkUser = await UserService.checkExistUserGithub(
              profile.id
            );

            if (checkUser) {
              const user = await UserService.findOneByIdGithub(profile.id);
              return done(null, {
                userExist: user,
              });
            } else {
              const role = await RoleService.findOneByName("ROLE_USER");
              const newUser = {
                "github.id": profile.id,
                "github.token": accessToken,
                "github.displayName": profile.displayName,
                username: profile.username,
                activity: true,
                role: role._id,
              };
              const result = await UserService.saveGitHub(newUser);
              if (result) {
                return done(null, {
                  userCreate: newUser,
                });
              }
            }
          } catch (error: any) {
            return done(error.message);
          }
        });
      }
    )
  );
}

export default PassportService;
