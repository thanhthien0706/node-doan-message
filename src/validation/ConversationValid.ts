import { Segments, Joi } from "celebrate";

export const createConversation = {
  [Segments.BODY]: Joi.object().keys({
    idUser1: Joi.string(),
  }),
};

export const joinGroupChatValid = {
  [Segments.BODY]: Joi.object().keys({
    idUser: Joi.string(),
    idConversation: Joi.string(),
  }),
};
