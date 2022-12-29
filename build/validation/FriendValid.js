"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFriendValid = exports.addFriendValid = exports.sendInvitationFriendValid = void 0;
const celebrate_1 = require("celebrate");
exports.sendInvitationFriendValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        description: celebrate_1.Joi.string().required(),
        receiver: celebrate_1.Joi.string().required(),
    }),
};
exports.addFriendValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().required(),
        status: celebrate_1.Joi.boolean().required(),
    }),
};
exports.findFriendValid = {
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        search: celebrate_1.Joi.string().required(),
    }),
};
