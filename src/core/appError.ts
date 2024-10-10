export enum HttpCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  readonly httpCode: HttpCode;

  constructor(message: string, httpCode: HttpCode) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.httpCode = httpCode;
  }
}
