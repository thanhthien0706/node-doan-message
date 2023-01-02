import mongoose, { Date, Types } from "mongoose";
import { IListTask } from "../interface/ListTask.interface";
import { ITask } from "../interface/Task.interface";
import ListTaskModel from "../model/ListTask.model";
import TaskModel from "../model/Task.model";
import { updateTaskDto } from "../dto/request/TaskDTO";

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
      console.log("Id lis task: ", idListTask);
      ListTaskModel.findOneAndUpdate(
        { _id: idListTask as unknown as Types.ObjectId },
        {
          $push: { listTasks: idTask as unknown as Types.ObjectId },
        }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findTaskByIdMeAndType(idMe: string, type: string) {
    return new Promise((resolve, reject) => {
      ListTaskModel.find({
        members: { $in: [new mongoose.Types.ObjectId(idMe)] },
        type,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findAllTaskByIdListTask(idListTask: string) {
    return new Promise((resolve, reject) => {
      ListTaskModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(idListTask) } },
        {
          $lookup: {
            from: "tasks",
            localField: "listTasks",
            foreignField: "_id",
            as: "dataTasks",
          },
        },
        { $limit: 1 },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findAllTaskByIdListTaskAndStatus(idListTask: string, status: boolean) {
    return new Promise((resolve, reject) => {
      ListTaskModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(idListTask) } },
        {
          $lookup: {
            from: "tasks",
            localField: "listTasks",
            foreignField: "_id",
            pipeline: [
              {
                $match: {
                  completed: status,
                },
              },
            ],
            as: "dataTasks",
          },
        },
      ])
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  updateTask(dataTask: updateTaskDto) {
    return new Promise((resolve, reject) => {
      TaskModel.findOneAndUpdate(
        { _id: dataTask.idTask as unknown as Types.ObjectId },
        dataTask
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  updateCompletedTask(idTask: string, completed: boolean) {
    return new Promise((resolve, reject) => {
      TaskModel.updateOne(
        { _id: idTask as unknown as Types.ObjectId },
        {
          completed: completed,
        }
      )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findOneById(id: string) {
    return new Promise((resolve, reject) => {
      TaskModel.findOne({ _id: id as unknown as Types.ObjectId })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
}

export default new TaskRepository();
