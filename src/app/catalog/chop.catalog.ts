import { Catalog } from './catalog'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class CHOPCatalog extends Catalog {
    
    constructor(@Inject("ICatalogService") service: ICatalogService) {
        super(service);
        this.name = "CHOP";
        this.codeRegex = "^[\\d\\.]$";
        this.service.init(['chops'], ['chops'], 'chops');
    }
}