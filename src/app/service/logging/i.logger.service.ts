export interface ILoggerService {
  log(message: string): void;
  error(message: string): void;
  http(message: string): void;
}
