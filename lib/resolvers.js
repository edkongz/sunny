// const R = require("ramda");
// const cors = require("cors");
// const { noop } = require("./helpers");
// module.exports = {
//   /*---------------------------------------------------------------
//     cors
//     ---------------------------------------------------------------*/
//   cors: (pluginOptions, otherwise) => routeOptions => {
//     const result = R.find(hasValue, [
//       R.path(["options", "cors"], routeOptions),
//       R.path(["routes", "cors"], pluginOptions),
//       otherwise
//     ]);
//     if (result === false) return noop();
//     if (result === true) return noop();
//     return cors(result);
//   },
//   /*---------------------------------------------------------------
//     Auth
//     ---------------------------------------------------------------*/
//   auth: (methods, pluginOptions, otherwise) => routeOptions => {
//     const result = R.find(hasValue, [
//       R.path(["options", "auth"], routeOptions),
//       R.path(["routes", "auth"], pluginOptions),
//       otherwise
//     ]);
//     return result === false ? noop() : methods[result].authenticate;
//   },
//   /*---------------------------------------------------------------
//     Validate
//     ---------------------------------------------------------------*/
//   validate: () => routeOptions => {
//     const getKey = key => R.path(["options", "validate", key], routeOptions);
//     return ["body", "query", "params"]
//       .filter(getKey)
//       .map(key => validateFactory(key, getKey(key)));
//   },
//   /*---------------------------------------------------------------
//     Path
//     ---------------------------------------------------------------*/
//   path: (prefix, pluginOptions) => route =>
//     `${prefix}${R.pathOr("", ["routes", "prefix"], pluginOptions)}${route.path}`
// };
// /*################################################################
//   UTILS
//   ################################################################*/
// const hasValue = R.complement(R.isNil);
// const validateFactory = (key, fn) => (request, reply, next) => {
//   if (fn(request[key])) return next();
//   // BOOOM
// };
