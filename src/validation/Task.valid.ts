import { Segments, Joi } from "celebrate";
import e from "express";

export const createListTaskValid = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    members: Joi.array().items(Joi.string()),
  }),
};

export const createTaskValid = {
  [Segments.BODY]: Joi.object().keys({
    idListTask: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    dueDate: Joi.string().allow(null, ""),
    worker: Joi.string().allow(null, ""),
  }),
};

export const updateTaskValid = {
  [Segments.BODY]: Joi.object().keys({
    idTask: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
    completed: Joi.boolean().allow(null, ""),
    dueDate: Joi.string().allow(null, ""),
    worker: Joi.string().allow(null, ""),
  }),
};

export const paramQueryTaskValid = {
  [Segments.QUERY]: Joi.object().keys({
    type: Joi.string().required(),
  }),
};

export const paramGetTaskInListValid = {
  [Segments.PARAMS]: Joi.object().keys({
    idListTask: Joi.string().required(),
  }),
};

export const paramGetTaskInListWithStatusValid = {
  [Segments.PARAMS]: Joi.object().keys({
    idListTask: Joi.string().required(),
    statusTask: Joi.boolean().required(),
  }),
};

export const paramQueryConfirmTaskValid = {
  [Segments.PARAMS]: Joi.object().keys({
    idTask: Joi.string().required(),
  }),
};
