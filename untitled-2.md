# CORS

Cross origin is supported with the CORS middleware from express. To enable CORS globally either set to `true` or provide the appropriate CORS options object.

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```text
defaults:
    routes:
        cors: true
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
defaults:
    routes:
        cors:
            origin: "example.com"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

CORS can also be enabled per plugin via the manifest.

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
plugins:
  - plugin: "./plugin"
    options:
      routes:
        cors: true

```
{% endcode-tabs-item %}
{% endcode-tabs %}

CORS can also be enabled per route via the options in the route handler

{% code-tabs %}
{% code-tabs-item title="plugin.js" %}
```javascript
module.exports = {
  register: (server, options) => {
    server.route({
      method: "GET",
      path: "/",
      options: {
        cors: true,
      },
      handler: async (request, reply) => {
        return reply("Everything is sunny");
      }
    })        
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### CORS options

CORS is implemented using the CORS middleware from express.

{% hint style="info" %}
For full list of options see the CORS documentation
{% endhint %}

