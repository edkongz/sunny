# Plugins

## Plugin

Everything in Sunny is handled by a plugin. A plugin is just a module that returns a `register` function.

{% code-tabs %}
{% code-tabs-item title="plugin.js" %}
```javascript
module.exports = {
    register: (server, options) => {
        // do stuff here
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The options passed through the plugin are defined in the manifest.

{% hint style="info" %}
See the server page
{% endhint %}

## Manifest

Plugins are added to the manifest via the plugins key:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
plugins:
  - plugin: "path/to/plugin1"
  - plugin: "path/to/plugin2"

```
{% endcode-tabs-item %}
{% endcode-tabs %}

Here two plugins are added to the manifest . The plugin value should be a path to plugin file.

The plugin can also accept an options object  to change the behaviour of the plugin.

## Example

Define a plugin:

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

Define the manifest

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```text
plugins:
  - plugin: "./hello-world"
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Start the server

```text
npx sunny start
```

Visit [localhost:3000](http://localhost:3000) and everything should be sunny!

