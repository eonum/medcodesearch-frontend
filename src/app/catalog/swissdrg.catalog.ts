import { Catalog } from './catalog';
import { Inject, Injectable } from '@angular/core';
import { ICatalogService } from '../service/i.catalog.service';

/**
 * Concrete implementation of catalog class for the SwissDRG catalog.
 */
@Injectable()
export class SwissDrgCatalog extends Catalog {

  constructor( @Inject("ICatalogService") service: ICatalogService) {
    super(service, "SwissDRG",
      { searchableTypes: ["drgs"], retrievableTypes: ["drgs", "adrgs", "partition", "mdc"], versionParam: "drgs" });
  }
}
