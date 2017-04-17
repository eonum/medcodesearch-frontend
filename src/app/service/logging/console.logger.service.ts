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

  private now():string {
    const currentdate = new Date();
    return currentdate.getHours() + ':' +currentdate.getMinutes() + ':' + currentdate.getSeconds();
  }
  /**
   * Logs the specified message to the console.
   * @param message the message to log
   */
  public log(message: string): void {
    this.toConsole(message, 'LOG', this.logStyle);
  }

  private toConsole(msg: string, prefix:string, style:string){
    if (environment.dev) {
      console.log(`${this.now()} ${prefix}: %c ${msg}`, style || style);
    }
  }



  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public error(message: string): void {
    this.toConsole(message, 'ERR', this.errorStyle);
  }

  /**
   * Logs the specified message  to the console.
   * @param message the message to log
   */
  public http(message: string): void {
    this.toConsole(message, 'GET', this.httpStyle);
  }


}
