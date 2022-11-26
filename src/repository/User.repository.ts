import UserModel, { statusActive } from "../model/User.model";
import { createUserDto } from "../dto/request/UserDTO";

class UserRepository {
  checkExists(condition: object) {
    return new Promise((resolve, reject) => {
      UserModel.exists(condition)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  checkExistUserGithub(idGithub: string) {
    return new Promise((resolve, reject) => {
      UserModel.exists({
        "github.id": idGithub,
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  create(userModel: createUserDto) {
    return new Promise((resolve, reject) => {
      UserModel.create(userModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  save(userModel: createUserDto) {
    return new Promise((resolve, reject) => {
      const newUser = new UserModel();
      newUser.userName = userModel.username;
      if (newUser.local) {
        newUser.local.email = userModel.email;
        newUser.local.password = newUser.generateHash(userModel.password);
      }
      newUser.activity = statusActive.ACTIVE;
      newUser.role = userModel.role;

      newUser
        .save()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  // saveGitHub(userModel);

  findOneByEmail(email: string) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ "local.email": email })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findOneAndUpdateByCondition(condition: object, update: object) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(condition, update)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findOneById(id: string) {
    return new Promise((resolve, reject) => {
      UserModel.findById(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findOneByIdGithub(idGithub: string) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({
        "github.id": idGithub,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  findAllHasShow(hasShow: object) {
    return new Promise((resolve, reject) => {
      UserModel.aggregate([
        { $match: {} },
        {
          $project: {
            ...hasShow,
          },
        },
      ])
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  deleteById(idUser: string) {
    return new Promise((resolve, reject) => {
      UserModel.deleteOne({ _id: idUser })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default new UserRepository();
