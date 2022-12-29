"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGroupChatValid = exports.createConversation = void 0;
const celebrate_1 = require("celebrate");
exports.createConversation = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        idUser1: celebrate_1.Joi.string(),
    }),
};
exports.joinGroupChatValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        idUser: celebrate_1.Joi.string(),
        idConversation: celebrate_1.Joi.string(),
    }),
};
