# Authentication

Authentication is handled on a per route/per plugin or globally via the manifest. You should load authentication plugins before actually using them.

### Plugin

```text
module.exports = {
    register: (server, options) => {
       server.auth({
          name: "basic",
          authenticate: async (request, reply, authenticated) => {
             if(request.body.password === "password") return authenticated();
          }
       });   
    }
}
```

### Usage

Once an authentication method is defined you can define as the global default via the `manifest`:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
defaults:
    routes:
        auth: "basic"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

It can be declared per plugin via the plugin options in the `manifest`:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
plugins: 
    - plugin: "./plugin.js",
      options:
        routes:
          auth: "basic"  
```
{% endcode-tabs-item %}
{% endcode-tabs %}

And it can also be set per route with the options in the route method of `server`:

```javascript
module.exports = {
    register: (server, options) => {
        server.route({
            method: "GET",
            path: "/",
            options: [
                auth: "basic"
            },
            handler: (request, reply) => {
                reply("Everything is sunny and secure");
            }
        });
    }
}
```



