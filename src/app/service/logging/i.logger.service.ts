export interface ILoggerService {
  log(message: string, obj?: any): void;
  error(message: string, obj?: any): void;
  http(message: string): void;
}
