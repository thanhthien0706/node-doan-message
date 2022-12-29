"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserValid = exports.changePasswordValid = exports.resetPasswordValid = exports.forgotPasswordValid = exports.signInUserValid = exports.createUserValid = void 0;
const celebrate_1 = require("celebrate");
exports.createUserValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        fullname: celebrate_1.Joi.string().required(),
        username: celebrate_1.Joi.string().required(),
        phone: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().pattern(new RegExp("gmail.com")).email().required(),
        password: celebrate_1.Joi.string().min(8).max(32).required(),
    }),
};
exports.signInUserValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().pattern(new RegExp("gmail.com")).email().required(),
        password: celebrate_1.Joi.string().min(8).max(32).required(),
    }),
};
exports.forgotPasswordValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().pattern(new RegExp("gmail.com")).email().required(),
    }),
};
exports.resetPasswordValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        token: celebrate_1.Joi.string().required(),
    }),
};
exports.changePasswordValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        newPassword: celebrate_1.Joi.string().min(8).max(32).required(),
        tokenReset: celebrate_1.Joi.string().required(),
    }),
};
exports.findUserValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        search: celebrate_1.Joi.string().required(),
    }),
};
