import { Http } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class CatalogService {

    protected http: Http;
    protected translate: TranslateService;

    protected baseUrl: string = "https://search.eonum.ch/"

    public constructor(http: Http, translate: TranslateService) {
        this.http = http;
        this.translate = translate;
    }

    protected getLocale(): string {
        return this.translate.currentLang;
    }
}