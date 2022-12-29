"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoleValid = void 0;
const celebrate_1 = require("celebrate");
exports.createRoleValid = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().allow(null, ""),
    }),
};
