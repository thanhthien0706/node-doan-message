import { Segments, Joi } from "celebrate";

export const createdMessageValid = {
  [Segments.BODY]: Joi.object().keys({
    content: Joi.string().allow(null, ""),
    type: Joi.string().required(),
    conversation: Joi.string().required(),
    attachment: Joi.any().allow(null, ""),
  }),
};

export const findAllMessageValid = {
  [Segments.QUERY]: Joi.object().keys({
    conversationId: Joi.string().required(),
  }),
};
