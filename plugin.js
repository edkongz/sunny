module.exports = {
  name: "routes/",
  register: (server, options) => {
    server.route({
      method: "GET",
      path: "/",
      options: {
      },
      handler: (request, reply) => {
        reply.send("Everything is sunny");
      }
    });
  }
}