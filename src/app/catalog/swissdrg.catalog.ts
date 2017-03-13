import { Catalog } from './Catalog'
import { ISwissDrgService } from '../service/ISwissDrgService'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class SwissDrgCatalog extends Catalog {
    
    constructor(@Inject('SwissDrgService') private service: ISwissDrgService) {
        super();
        this.name = "SwissDRG";
        this.codeRegex = "^[A-Z]{1}[0-9]{2,4}$";
    }

    protected async getBySearch(version: string, query: string): Promise<CatalogElement[]> {
        return this.service.search(version, query);
    }

    protected async getByCode(version: string, code: string): Promise<CatalogElement> {
        return this.service.getByCode(version, code);
    }

    public async getVersions(): Promise<string[]> {
        return this.service.getVersions();
    }
}