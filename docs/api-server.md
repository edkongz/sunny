# Server

The server object as the first argument to every plugin

https://expressjs.com/en/4x/api.html#res

https://expressjs.com/en/4x/api.html#req

## Methods

### server.route(handler)
Adds a new route to the server. The route is defined by a `handler` object.

`handler` - *object*
* `method` - *GET | POST | PUT | HEAD | DELETE | PATCH*
* `path` - *string* - path of the route. To add path paramters use `:name`. For example to add `id` path paramter use `/:id`.
* `handler` - *(request, reply) => void* - Function that handles the request. `async` functions are supported, *async (request, reply) => void*
* `options` - *object*
  * `auth` - *false | string* - name of an authentication method to apply to this route. Or disable authentication with `false`
  * `cors` - *boolean | object* - disable or enable cors for this route. Or supply a cors options object that applies specifically for this route.

*Example*
{% code-tabs %}
{% code-tabs-item title="plugin.js" %}
```javascript
module.exports = {
  register: (server, options) => {
    server.route({
      method: "GET",
      path: "/",
      handler: (request, reply) => {
        reply.send("Everything is sunny");
      }
    })
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### serer.auth(method)

Adds an authentication method to the server. The authentication method is defined by `method` object.

`method` - **object**:
* `name` - *string* - unique name to identify the authentication method.
* `authenticate` - *(accept, reject) => void* - 

*Example*
{% code-tabs %}
{% code-tabs-item title="plugin.js" %}
```javascript
module.exports = {
  register: (server, options) => {
    server.auth({
      name: "basic",
      authenticate: (request, reply, authenticated) => {
        const { password } = request.body;
        if(password === "password") return authenticated({});
      }
    })
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}