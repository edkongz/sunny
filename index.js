const { Server } = require("./lib/server");

const server = Server();

server.listen(3000, () => console.log("Starting server"))