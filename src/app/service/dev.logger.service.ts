import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { ILoggerService } from "./i.logger.service";

@Injectable()
export class DevLoggerService implements ILoggerService {
    public log(message: string): void {
        if (environment.dev){
            console.log(message);
        }
    }
}