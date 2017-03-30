import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "./i.catalog.service";
import {Observable} from 'rxjs';

export class CatalogServiceMock implements ICatalogService {

    init(searchableCodes: string[], retrievableCodes: string[], versionParam: string): void {

    }

    private CONTENTS: CatalogElement[] = [
        { code: "Content 1", text: "Description content 1", url: "/url/to/content1" },
        { code: "Content 2", text: "Description content 2", url: "/url/to/content2" },
        { code: "Content 3", text: "Description content 3", url: "/url/to/content3" },
        { code: "Content 4", text: "Description content 4", url: "/url/to/content4" },
        { code: "Content 5", text: "Description content 5", url: "/url/to/content5" },
        { code: "Content 6", text: "Description content 6", url: "/url/to/content6" },
        { code: "Content 7", text: "Description content 7", url: "/url/to/content7" }
    ];

    search(version: string, search: string): Promise<CatalogElement[]> {
        return Promise.resolve(this.CONTENTS);
    }
    getVersions(language: string): Promise<string[]> {
        return Promise.resolve([ "V1.0","V2.0","V3.0","V4.0" ]);
    }
    getByCode(version: string, code: string): Promise<CatalogElement> {
        if (code == "P20A"){
            return Promise.resolve(this.CONTENTS[0]);
        }
        else {
            throw new Error("Not found");
        }
    }

    public getLocale():string {
      return 'de';
    }

    public getLangs(): string[] {
      return ['de', 'fr', 'it', 'en'];
    }
}
