import { Segments, Joi } from "celebrate";

export const sendInvitationFriendValid = {
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required(),
    receiver: Joi.string().required(),
  }),
};

export const addFriendValid = {
  [Segments.QUERY]: Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.boolean().required(),
  }),
};

export const findFriendValid = {
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string().required(),
  }),
};
