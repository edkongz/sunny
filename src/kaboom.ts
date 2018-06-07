export class Kaboom extends Error {
  isKaboom: boolean = true;
  statusCode: number;
  output: any;

  constructor(statusCode, message, payload, code) {
    super(message);
    this.statusCode = statusCode;
    this.output = {
      statusCode,
      message,
      payload,
      code
    };
  }
}

/*################################################################
  4xx Errors
  ################################################################*/
export const BadRequest = ({
  payload = {},
  code = "BAD_REQUEST",
  message = "Bad request"
} = {}) => {
  throw new Kaboom(400, message, payload, code);
};

export const Unauthorized = ({
  payload = {},
  code = "UNAUTHORIZED",
  message = "Unauthorized"
} = {}) => {
  throw new Kaboom(401, message, payload, code);
};

export const Forbidden = ({
  payload = {},
  code = "FORBIDDEN",
  message = "Forbidden"
} = {}) => {
  throw new Kaboom(403, message, payload, code);
};

export const NotFound = ({
  payload = {},
  code = "NOT_FOUND",
  message = "Not found"
} = {}) => {
  throw new Kaboom(404, message, payload, code);
};

export const Conflict = ({
  payload = {},
  code = "CONFLICT",
  message = "Conflict"
} = {}) => {
  throw new Kaboom(409, message, payload, code);
};

/*################################################################
  5xx Errors
  ################################################################*/
export const BadImplementation = ({
  payload = {},
  code = "BAD_IMPLEMENTATION",
  message = "Bad implementation"
} = {}) => {
  throw new Kaboom(500, message, payload, code);
};

export const NotImplemented = ({
  payload = {},
  code = "NOT_IMPLEMENTED",
  message = "Not implemented"
} = {}) => {
  throw new Kaboom(501, message, payload, code);
};

export const BadGateway = ({
  payload = {},
  code = "BAD_GATEWAY",
  message = "Bad gateway"
} = {}) => {
  throw new Kaboom(502, message, payload, code);
};

export const ServerUnavailable = ({
  payload = {},
  code = "SERVER_UNAVAILABLE",
  message = "Server unavailable"
} = {}) => {
  throw new Kaboom(503, message, payload, code);
};

export const GatewayTimeout = ({
  payload = {},
  code = "GATEWAY_TIMEOUT",
  message = "Gateway timeout"
} = {}) => {
  throw new Kaboom(504, message, payload, code);
};
