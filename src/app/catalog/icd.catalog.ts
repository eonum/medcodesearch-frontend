import { Catalog } from './catalog'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";

/**
 * Concrete implementation of catalog class for the ICD catalog.
 */
@Injectable()
export class ICDCatalog extends Catalog {

    constructor(@Inject("ICatalogService") service: ICatalogService) {
        super(service, "ICD", "^\\w[\\d\\.]$",
          [['icds'], ['icds', 'icd_groups', 'icd_chapters'], 'icds'] );
    }
}
