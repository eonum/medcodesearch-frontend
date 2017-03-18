import { Catalog } from './catalog'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class SwissDrgCatalog extends Catalog {

    constructor(@Inject("ICatalogService") service: ICatalogService) {
        super(service, "SwissDRG", "^[A-Za-z]\\d{1,2}[A-Za-z]{0,1}$",
          [[ "drgs", "adrgs"], [ "drgs", "adrgs", "partition", "mdc" ], "drgs"] );
    }
}
