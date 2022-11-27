import { Segments, Joi } from "celebrate";

export const addFriendValid = {
  [Segments.QUERY]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const findFriendValid = {
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string().required(),
  }),
};
