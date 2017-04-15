import { ILoggerService } from "./i.logger.service";

export class NullLoggerService implements ILoggerService {
  public log(message: string): void { }
}
