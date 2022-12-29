"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Role_controller_1 = __importDefault(require("../controller/admin/Role.controller"));
const RoleValid_1 = require("../validation/RoleValid");
router.get("/init-role", Role_controller_1.default.initData);
router.post("/add-role", (0, celebrate_1.celebrate)(RoleValid_1.createRoleValid), Role_controller_1.default.addRole);
exports.default = router;
