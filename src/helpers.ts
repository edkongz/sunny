import R from "ramda";

/*---------------------------------------------------------------
  noop request
  ---------------------------------------------------------------*/
const noop = (request, reply, next) => next();

/*---------------------------------------------------------------
  reject and reduce a list of arguments
  ---------------------------------------------------------------*/
const reduce = (fn, seed) => (...args) =>
  R.pipe(R.reject(R.isNil), R.reduce(fn, seed))(args);

export const merge = reduce(R.mergeDeepRight, {});
export const concat = reduce(R.concat, []);

/*---------------------------------------------------------------
  
  ---------------------------------------------------------------*/
