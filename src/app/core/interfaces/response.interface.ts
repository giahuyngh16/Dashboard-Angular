export interface IResponse<T> {
  data: T;
  statusCode: string;
  message: string;
  modelValidationErrors: T,
  errorDetails: T,
}
