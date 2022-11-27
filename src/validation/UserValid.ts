import { Segments, Joi } from "celebrate";

export const createUserValid = {
  [Segments.BODY]: Joi.object().keys({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().pattern(new RegExp("gmail.com")).email().required(),
    password: Joi.string().min(8).max(32).required(),
  }),
};

export const signInUserValid = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().pattern(new RegExp("gmail.com")).email().required(),
    password: Joi.string().min(8).max(32).required(),
  }),
};

export const forgotPasswordValid = {
  [Segments.QUERY]: Joi.object().keys({
    email: Joi.string().pattern(new RegExp("gmail.com")).email().required(),
  }),
};

export const resetPasswordValid = {
  [Segments.QUERY]: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export const changePasswordValid = {
  [Segments.BODY]: Joi.object().keys({
    newPassword: Joi.string().min(8).max(32).required(),
    tokenReset: Joi.string().required(),
  }),
};

export const findUserValid = {
  [Segments.QUERY]: Joi.object().keys({
    search: Joi.string().required(),
  }),
};
