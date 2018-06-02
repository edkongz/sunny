const Joi = require("joi");

module.exports = {
  name: "routes/",
  register: (server, options) => {

    /*---------------------------------------------------------------
      Authentication
      ---------------------------------------------------------------*/
    server.auth({
      name: "basic",
      authenticate(request, reply, next) {
        console.log("authenticating")
        return next();
      }
    });

    /*---------------------------------------------------------------
      
      ---------------------------------------------------------------*/
    server.route({
      method: "POST",
      path: "/",
      options: {
        validate: {
          body: Joi.object().keys({
            username: Joi.string()
          })
        }
      },
      handler: (request, reply) => {
        reply.send("Everything is sunny");
      }
    });
  }
}