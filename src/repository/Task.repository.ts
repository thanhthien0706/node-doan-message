import { Types } from "mongoose";
import { IListTask } from "../interface/ListTask.interface";
import { ITask } from "../interface/Task.interface";
import ListTaskModel from "../model/ListTask.model";
import TaskModel from "../model/Task.model";

class TaskRepository {
  createListTask(listTaskModel: IListTask) {
    return new Promise((resolve, reject) => {
      ListTaskModel.create(listTaskModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  createTask(taskModel: ITask) {
    return new Promise((resolve, reject) => {
      TaskModel.create(taskModel)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  addTaskToListTask(idTask: string, idListTask: string) {
    return new Promise((resolve, reject) => {
      ListTaskModel.findOneAndUpdate(idListTask as unknown as Types.ObjectId, {
        $push: { listTasks: idTask as unknown as Types.ObjectId },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
}

export default new TaskRepository();
