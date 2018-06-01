# Manifest

## Scheme reference

A scheme is how the server is configured. The manifest can contain many schemes but only one is resolved and applied at runtime.

`Scheme` - *object*
* `server` - *object* - defines what port and address the server should listen on
  * `port` - *integer* - Port number for server to run
  * `address` - *string* - Address the server should listen on
* `routes` - *object* - defines the default values for every route
  * `prefix` - *string* - default string to prefix to all URLs
  * `cors` - *boolean|object* - enable or disable cors. Otherwise supply a cors options object that will apply to all routes.
  * `auth` - *false|string* - disable authentication server wide or provide a string for an authentication method that was registered.
* `plugins` - *object[]* - defines the plugins to load and the options to configure those plugins
  * `plugin` - *string* - name of an installed module or a path to a javascript file
  * `options` - *object* - Anything the plugin requires
    * `routes` - *object*
      * `prefix` - *string* - prefix to every route in the plugin
      * `cors` - *boolean|object* - enable or disable for every route in the plugin. Or provide an object  which will apply to all routes in this plugin

### Default Scheme
If there is no manifest the default scheme is used:

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}
```yaml
server:
	port: 3000
	address: localhost
routes:
	prefix: ""
	cors: false
	auth: false
plugins: []
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Manifest Reference
The manifest is defined in a `manifest.yaml` , `manifest.json` or an object returned from `manifest.js`. The manifest extends the `Scheme` object but adds the `env` key. 

The `env` object allows multiple schemes to be defined in the manifest. The server will check `NODE_ENV` and if there is a key in the `env` with the same value it will merge the scheme.

`Manifest` - *Scheme*
* `env` - *object*
  * `[NAME]` - *Scheme* - name of the environment to apply the object scheme. Any values in the scheme will override the default and the root `Scheme`

*Example*

{% code-tabs %}
{% code-tabs-item title="manifest.yaml" %}

```yaml
server:
	port: 3000
env:
	production:
		server:
			port: 80
	staging:
		server:
			port: 8080
```
{% endcode-tabs-item %}
{% endcode-tabs %}

When `NODE_ENV` is set to either `production` or `staging` the port will change appropriately.