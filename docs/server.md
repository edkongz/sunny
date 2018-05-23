# Server

Everything in Sunny is defined as a plugin. With each plugin a `register` function that receives the `server` as a parameter.

{% code-tabs %}
{% code-tabs-item title="plugin.js" %}
```javascript
module.exports = {
    register: (server, options) => {
        // do stuff    
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Server API

### server.route\(handler\)

`route` adds a route to the server. The route method takes a route handler as an argument.

{% code-tabs %}
{% code-tabs-item title="hello-world.js" %}
```text
module.exports = {
    register: (server, options) => {
        server.route({
            method: "GET",
            path: "/",
            handler: (request, reply) => {
                reply("Everything is sunny");
            }
        });
    }
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

| path | string |  |
| --- | --- | --- |
| handler | function |  |
| method | GET \| POST \| PUT \| HEAD \| DELETE \| PATCH | HTTP method |

### server.auth\(method\)

auth adds an authentication method to the server. Once added an authentication method can be used can be used on a per route basis, per plugin or globally via the manifest.

{% code-tabs %}
{% code-tabs-item title="authenticate.js" %}
```text
module.exports = {
    register: (server, options) => {
        server.auth({
            name: "basic",
            authenticate: (request, reply, next) => {
               // authenticate here
            }
        });
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Example



