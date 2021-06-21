class AppError extends Error {
  message: any;
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export default AppError;
