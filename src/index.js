const express = require("express");

const next = () => (request, reply, next) => next();

// function route(route) {
//   app[route.method](
//     route.path,
//     authentication(route),
//     validation(route),
//     handler
//   );
// }

/*---------------------------------------------------------------
  Validate the request
  ---------------------------------------------------------------*/
function validation(route) {
  return next();
}

/*---------------------------------------------------------------
  Authenticate the request
  ---------------------------------------------------------------*/
function authentication(route) {
  return next();
}

// const route = {
//   method: "GET",
//   path: "/:id/",
//   auth: false,
//   validate: {},
//   handler: (request, reply) => {}
// };

function createServer(options) {
  const server = express();
  const authSchemas = {};
  const authDefault = false;

  return {
    server,
    route(route) {
      server[route.method](
        route.path,
        authentication(route),
        validation(route),
        handler
      );
    },
    register(plugin) {
      plugin.register(server);
    },
    authSchema(name, schema) {
      auth[name] = schema;
    },
    authDefault(name) {
      authDefault = name;
    }
  };
}

module.exports = createServer;
