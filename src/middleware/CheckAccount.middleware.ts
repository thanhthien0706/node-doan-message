// import JwtService from "../service/ipml/Jwt.service";
// import createError from "http-errors";

// import RoleService from "../service/web/Role.service";
// import { NextFunction, Request, Response } from "express";
// import { Types } from "mongoose";

// class CheckAccount {
//   async checkLogin(req: Request, res: Response, next: NextFunction) {
//     const token = JwtService.getToken(req.headers);

//     if (token === null) {
//       throw createError(401, "Expired Tokens");
//     }

//     let dataToken = await JwtService.verifyToken(token);

//     if (dataToken.id === null) {
//       throw createError(401, "Not Verify Token");
//     } else {
//       next();
//     }
//   }

//   checkRole(roleName: string) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const token = JwtService.getToken(req.headers);
//         if (token == null) {
//           throw createError(401, "Expired Tokens");
//         }
//         let dataToken = await JwtService.verifyToken(token);
//         if (dataToken === null) {
//           throw createError(401, "Not Verify Token");
//         } else {
//           const idUser = dataToken.id;
//           const user = await UserService.findOneById(idUser);
//           if (!user) {
//             throw createError(404, "User Is Exist");
//           }
//           const role = await RoleService.findOneByField({
//             _id: user.role as Types.ObjectId,
//           });
//           if (role.name.toLowerCase() == roleName.toLowerCase()) {
//             return next();
//           }
//           throw createError(403, "Not Permission");
//         }
//       } catch (error) {
//         next(error);
//       }
//     };
//   }
// }

// export default new CheckAccount();
