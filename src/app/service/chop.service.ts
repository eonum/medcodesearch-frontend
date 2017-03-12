import { IChopService } from "./IChopService";
import { ChopElement } from "../model/chop.element";
import { Injectable } from "@angular/core";
import { CatalogService } from "./catalog.service";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";

/**
 * Class ChopService queries the eonum API. It only uses
 * the CHOP catalog part of the API.
 */
@Injectable()
export class ChopService extends CatalogService implements IChopService {

    public constructor(http: Http, translate: TranslateService){
        super(http, translate);
    }

    search(version: string, search: string): Promise<ChopElement[]> {
        throw new Error('Method not implemented.');
    }
    getVersions(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    getByCode(version: string, code: string): Promise<ChopElement> {
        throw new Error('Method not implemented.');
    }


}