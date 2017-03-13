import { Catalog } from './Catalog'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { CatalogService } from "../service/catalog.service";

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class SwissDrgCatalog extends Catalog {
    
    constructor(service: CatalogService) {
        super(service);
        this.name = "SwissDRG";
        this.codeRegex = "^[A-Z]{1}[0-9]{2,4}$";
        this.service.init([ "drgs", "adrgs"], [ "drgs", "adrgs", "partition", "mdc" ], "drgs");
    }
}