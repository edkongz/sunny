# Validation

Validation is handled on a per route basis. We recommend you use `joi` from the hapi ecosystem its amazing. We support it out of the box otherwise the method to validate an object is defined below:

```javascript
module.exports = {
    register: (server, options) => {
        server.route({
            method: "GET",
            path: "/",
            options: {
                validate: {
                    query: Joi()
                }
            },
            handler: (request, reply) => {
                reply("Everthing is sunny");
            }
        });
    }
}
```



