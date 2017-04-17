import { environment } from '../../../environments/environment';
import { ILoggerService } from './i.logger.service';
import { Injectable } from '@angular/core';

/**
 * Implementation for {@link ILoggerService} which logs
 * all messages to the console.
 */
@Injectable()
export class ConsoleLoggerService implements ILoggerService {

  private logStyle = 'background: #f2ebf0; color: #0D0D0F';
  private errorStyle = 'background: #F2552C; color: white; font-size:12pt;';
  private httpStyle = 'background: white; color: #00477e; font-size:10pt;';
  /**
   * Logs the specified message to the console.
   * @param message the message to log
   */
  public log(message: string): void {
    if (environment.dev) {
      console.log(`LOG: %c ${message}`, this.logStyle);
    }
  }

  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public error(message: string): void {
    if (environment.dev) {
      console.log(`ERROR: %c ${message}`, this.errorStyle);
    }
  }

  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public http(message: string): void {
    if (environment.dev) {
      console.log(`GET: %c ${message}`, this.httpStyle);
    }
  }


}
