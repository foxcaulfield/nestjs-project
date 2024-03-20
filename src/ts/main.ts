import http from "http";
// import fs from "fs";

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-type": "text/plain" });
	res.write("Hi!\n");
	res.write(`remoteAddress: ${req.socket.remoteAddress}\n`);
	res.write(`req.headers["x-forwarded-for"]: ${req.headers["x-forwarded-for"]}\n`);
	res.write(`__dirname: ${__dirname}\n`);
	res.end();
});

server.listen(3000);
