"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMessageValid = exports.createdMessageValid = void 0;
const celebrate_1 = require("celebrate");
exports.createdMessageValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        content: celebrate_1.Joi.string().allow(null, ""),
        type: celebrate_1.Joi.string().required(),
        conversation: celebrate_1.Joi.string().required(),
        attachment: celebrate_1.Joi.any().allow(null, ""),
    }),
};
exports.findAllMessageValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        conversationId: celebrate_1.Joi.string().required(),
    }),
};
