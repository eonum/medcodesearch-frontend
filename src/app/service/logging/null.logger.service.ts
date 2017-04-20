import { ILoggerService } from './i.logger.service';

/**
 * Implementation of {@link ILoggerService} for testing.
 * Won't log anything.
 */
export class NullLoggerService implements ILoggerService {
  public log(message: string, obj?: any): void { }
  public error(message: string, obj?: any): void { }
  public http(message: string): void { }
}
