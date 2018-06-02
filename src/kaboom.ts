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
export const BadRequest = ({payload={}, code="BAD_REQUEST"}={}) => {
  throw new Kaboom(400, "Bad Request", payload, code);
};

export const Unauthorized = ({payload={}, code="UNAUTHORIZED"}={}) => {
  throw new Kaboom(401, "Unauthorized", payload, code);
}

export const Forbidden = ({payload={}, code="FORBIDDEN"}={}) => {
  throw new Kaboom(403, "Forbidden", payload, code);
}

export const NotFound = ({payload={}, code="NOT_FOUND"}={}) => {
  throw new Kaboom(404, "NotFound", payload, code);
}

export const Conflict = ({payload={}, code="CONFLICT"}) => {
  throw new Kaboom(409, "Conflict", payload, code);
}

/*################################################################
  5xx Errors
  ################################################################*/
export const BadImplementation = ({payload={}, code="BAD_IMPLEMENTION"}) => {
  throw new Kaboom(500, "BadImplementation", payload, code);
}

export const NotImplemented = ({payload={}, code="NOT_IMPLEMENTED"}) => {
  throw new Kaboom(501, "NotImplemented", payload, code);
}

export const BadGateway = ({payload={}, code="BAD_GATEWAY"}) => {
  throw new Kaboom(502, "BadGateway", payload, code);
}

export const ServerUnavailable = ({payload={}, code="SERVER_UNAVAILABLE"}) => {
  throw new Kaboom(503, "ServerUnavailable", payload, code);
}

export const GatewayTimeout = ({payload={}, code="GATEWAY_TIMEOUT"}) => {
  throw new Kaboom(504, "GatewayTimeout", payload, code);
}