"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressSetup_1 = __importDefault(require("./loader/ExpressSetup"));
const loader_1 = __importDefault(require("./loader"));
class App {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.initMain();
    }
    async initMain() {
        await new loader_1.default();
        const expressSetup = new ExpressSetup_1.default();
        const server = expressSetup.mainInit();
        server.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    }
}
new App();
