import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import { Catalog } from "../../catalog/catalog";
import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";

@Component({
  selector: 'app-catalogue',
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.css'],
  providers: [ SwissDrgCatalog ]
})

/**
 * Wrapper for text search, result display, and later the navigation in a
 * given catalog (and version).
 */
export class CatalogComponent implements OnInit {

  public catalog: Catalog;
  public version: string;

  constructor(private route: ActivatedRoute,
              private swissDrgCatalog: SwissDrgCatalog) { }

  /**
   * Subscribe to route parameters to update
   * catalog and version on change.
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let catalog = params['catalogue'];

      if(catalog=="drgs") {
          this.catalog = this.swissDrgCatalog;
          this.version = params['version'];
        } else {
        console.log('Catalog not yet implemented: ' + catalog)
        }
      }
    );

  }

}
