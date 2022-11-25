import RoleModel from "../model/Role.model";
import IRole from "../interface/Role.interface";

class RoleRepository {
  checkExists(dataCheck: Object) {
    return new Promise((resolve, reject) => {
      RoleModel.exists(dataCheck)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  create(roleModel: IRole) {
    return new Promise((resolve, reject) => {
      RoleModel.create(roleModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findOneByField(conditionField: Object) {
    return new Promise((resolve, reject) => {
      RoleModel.findOne(conditionField)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  findOneByName(name: string) {
    return new Promise((resolve, reject) => {
      RoleModel.findOne({ name: name })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new RoleRepository();
