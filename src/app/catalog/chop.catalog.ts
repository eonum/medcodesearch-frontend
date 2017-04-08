import { Catalog } from './catalog'
import { Inject, Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";

/**
 * Concrete implementation of catalog class for the CHOP catalog.
 */
@Injectable()
export class CHOPCatalog extends Catalog {

  constructor( @Inject("ICatalogService") service: ICatalogService) {
    super(service, "CHOP", { searchableTypes: ['chops'], retrievableTypes: ['chops', 'chop_chapters'], versionParam: 'chops', rootElementType: 'chop_chapters' });
  }
}
