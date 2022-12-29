import { Segments, Joi } from "celebrate";

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
    dueDate: Joi.date().allow(null, ""),
    worker: Joi.string().allow(null, ""),
  }),
};
