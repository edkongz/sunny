const test = require("tape");
const { requestBasicServer } = require("./utils");

const request = requestBasicServer({
  plugins: [
    {
      plugin: {
        name: "route",
        register(server) {
          server.route({
            method: "GET",
            path: "/",
            handler(request, reply) {
              reply.status(200).send("Everything is sunny");
            }
          });
        }
      }
    }
  ]
});

test("Should create basic server", async t => {
  const response = await request.get("/");
  t.equal(response.status, 200);
  t.equal(response.text, "Everything is sunny");
  t.end();
});
