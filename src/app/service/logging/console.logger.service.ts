import { environment } from '../../../environments/environment';
import { ILoggerService } from './i.logger.service';
import { Injectable } from '@angular/core';

/**
 * Implementation for {@link ILoggerService} which logs
 * all messages to the console.
 */
@Injectable()
export class ConsoleLoggerService implements ILoggerService {

  /**
   * Logs the specified message to the console.
   * @param message the message to log
   */
  public log(message: string): void {
    if (environment.dev) {
      console.log(message);
    }
  }
}
