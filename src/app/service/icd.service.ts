import { IIcdService } from "./IIcdService";
import { IcdElement } from "../model/icd.element";
import { Injectable } from "@angular/core";
import { CatalogService } from "./catalog.service";
import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";

/**
 * Class IcdService queries the eonum API. It only uses
 * the ICD catalog part of the API.
 */
@Injectable()
export class IcdService extends CatalogService implements IIcdService {

    public constructor(http: Http, translate: TranslateService){
        super(http, translate);
    }

    search(version: string, search: string): Promise<IcdElement[]> {
        throw new Error('Method not implemented.');
    }
    getVersions(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    getByCode(version: string, code: string): Promise<IcdElement> {
        throw new Error('Method not implemented.');
    }
}