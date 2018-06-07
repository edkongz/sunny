const { Server } = require("../lib/server");
const request = require("supertest");

function requestBasicServer(manifest) {
  return request(Server({ manifest }));
}

module.exports = {
  requestBasicServer
};
