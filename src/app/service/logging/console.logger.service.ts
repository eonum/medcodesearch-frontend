import { environment } from '../../../environments/environment';
import { ILoggerService } from './i.logger.service';
import { Injectable } from '@angular/core';

/**
 * Implementation for {@link ILoggerService} which logs
 * all messages to the console.
 */
@Injectable()
export class ConsoleLoggerService implements ILoggerService {

  private defaultStyle = 'background: #f2ebf0; color: #0D0C0E';
  private errorStyle = 'background: #F2552C; color: white; font-size:12pt;';
  private httpStyle = 'background: #00CED1; color: #00477e; font-size:10pt;';
  private lifecycleStyle = 'background: brown; color: snow';


  /**
   * Logs the specified message to the console.
   * @param message the message to log
   */
  public log(message: string, obj?: any): void {
    this.toConsole(message, 'INFO', this.defaultStyle, obj);
  }

  private toConsole(msg: string, prefix: string, style: string, obj?: any): void {
    if (environment.dev) {
      if (obj) {
        console.log(`${prefix}: %c${msg}`, style || style, obj);
      } else {
        console.log(`${prefix}: %c${msg}`, style || style);
      }
    }
  }

  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public error(message: string, obj?: any): void {
    this.toConsole(message, 'ERR', this.errorStyle, obj);
  }

  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public http(message: string): void {
    this.toConsole(message, 'GET', this.httpStyle);
  }


}
