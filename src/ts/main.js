"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((_req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hi!");
});
server.listen(3000);
