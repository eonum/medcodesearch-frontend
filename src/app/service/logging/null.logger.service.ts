import { ILoggerService } from './i.logger.service';

/**
 * Implementation of {@link ILoggerService} for testing.
 * Won't log anything.
 */
export class NullLoggerService implements ILoggerService {
  public log(message: string): void { }
}
