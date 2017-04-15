import { environment } from '../../environments/environment';
import { ILoggerService } from './i.logger.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DevLoggerService implements ILoggerService {
  public log(message: string): void {
    if (environment.dev) {
      console.log(message);
    }
  }
}
