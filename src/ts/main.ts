import http from "node:http";

const server = http.createServer((_req, res) => {
	res.writeHead(200, { "Content-type": "text/plain" });
	res.end("Hi!");
});

server.listen(3000);
