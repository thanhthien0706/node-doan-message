import { NextFunction, Request, Response } from "express";

import RoleService from "../../service/ipml/Role.service";
import ResponseBasicDTO from "../../dto/response/ResponseDTO";

import { createRoleDto } from "../../dto/request/RoleDTO";

class RoleController {
  async initData(req: Request, res: Response, next: NextFunction) {
    try {
      const arrayInforRole: createRoleDto[] = [
        {
          name: "ROLE_ADMIN",
          description: "",
        },
        {
          name: "ROLE_USER",
          description: "",
        },
      ];

      const listData: any[] = [];
      arrayInforRole.forEach((role: createRoleDto, index) => {
        RoleService.createRole(role)
          .then((data) => {
            listData.push(data);
            if (index == arrayInforRole.length - 1) {
              return res
                .status(200)
                .json(
                  new ResponseBasicDTO(
                    true,
                    "Create list role successfully",
                    listData
                  )
                );
            }
          })
          .catch((error) => {
            next(error);
          });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleData = await RoleService.createRole(req.body);
      return res
        .status(200)
        .json(new ResponseBasicDTO(true, "Create role successfully", roleData));
    } catch (error) {
      next(error);
    }
  }
}

export default new RoleController();
