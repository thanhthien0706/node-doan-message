import { Segments, Joi } from "celebrate";

export const createRoleValid = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(null, ""),
  }),
};
