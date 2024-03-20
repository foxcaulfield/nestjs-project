import http from "http";

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-type": "text/plain" });
	res.end("Hi! " + req.socket.remoteAddress + " " + req.headers["x-forwarded-for"]);
});

server.listen(3000);
