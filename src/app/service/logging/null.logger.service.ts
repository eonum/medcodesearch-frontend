import { ILoggerService } from './i.logger.service';

/**
 * Implementation of {@link ILoggerService} for testing.
 * Won't log anything.
 */
export class NullLoggerService implements ILoggerService {
  public log(message: string): void {}
  public error(message: string): void {}
  public http(message: string): void {}
}
