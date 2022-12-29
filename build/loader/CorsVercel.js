"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowCors = (fn) => async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", 0);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};
const handler = (req, res) => {
    const d = new Date();
    res.end(d.toString());
};
exports.default = allowCors(handler);
