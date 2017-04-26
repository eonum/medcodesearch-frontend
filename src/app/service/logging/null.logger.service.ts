import { ILoggerService } from './i.logger.service';
import { Injectable } from "@angular/core";

/**
 * Implementation of {@link ILoggerService} for testing.
 * Won't log anything.
 */
@Injectable()
export class NullLoggerService implements ILoggerService {
  public log(message: string, obj?: any): void { }
  public error(message: string, obj?: any): void { }
  public http(message: string): void { }
}
