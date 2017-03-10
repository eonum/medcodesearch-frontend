import { Catalog } from './Catalog'
import { CatalogElement } from './CatalogElement'
import { ISwissDrgService } from '../service/ISwissDrgService'
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class SwissDrgCatalog extends Catalog {
    
    constructor(@Inject('SwissDrgService') private service: ISwissDrgService) {
        super();
        this.name = "SwissDRG";
        this.codeRegex = "^[A-Z]{1}[0-9]{2,4}$";
    }

    protected getBySearch(version: string, query: string): CatalogElement[] {
        return this.service.search(version, query);
    }

    getByCode(code: string): CatalogElement {
        return this.service.getByCode(code);
    }

    getVersions(): string[] {
        return this.service.getVersions();
    }
}