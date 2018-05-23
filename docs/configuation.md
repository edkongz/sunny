# Configuation

### Scheme

{% hint style="info" %}
See installation if you haven't already
{% endhint %}

Sunny is highly configurable. Configuring Sunny requires a scheme defined in a manifest. The default scheme is:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
server:
    port: 3000
    address: "127.0.1"
defaults:
    routes:
        prefix: ""
        auth: false
        cors: false
plugins: []
```
{% endcode-tabs-item %}
{% endcode-tabs %}

To configure the server provide a scheme in a file named `manifest` in the root of the project:

* `manifest.yaml`
* `manifest.json`
* `manifest.js`

### Manifest

The manifest is scheme but also contains an extra key for environment specific configurations. For example to configure the server when in a production environment to have a different port:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
server:
    port: 3000
environment:
    production:
        server:
            port: 80
```
{% endcode-tabs-item %}
{% endcode-tabs %}

If `NODE_ENV` is set to `production` sunny will merge the default scheme, then the root scheme and finally the production scheme. You can add as many environments as you want but only one environment will be active at runtime.

## Example

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
server:
    port: 3000
environment:
    production:
        server:
            port: 80
```
{% endcode-tabs-item %}
{% endcode-tabs %}



