import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import { Catalog } from "../../catalog/catalog";
import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";
import { ICDCatalog } from "../../catalog/icd.catalog";
import { CHOPCatalog } from "../../catalog/chop.catalog";

@Component({
  selector: 'app-catalogue',
  templateUrl: 'catalog.component.html',
  styleUrls: ['catalog.component.css'],
  providers: [ SwissDrgCatalog, CHOPCatalog, ICDCatalog ]
})

/**
 * Wrapper for text search, result display, and later the navigation in a
 * given catalog (and version).
 */
export class CatalogComponent implements OnInit {

  public catalog: Catalog;
  public version: string;


  constructor(private route: ActivatedRoute,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog) {
  }

  /**
   * Subscribe to route parameters to update
   * catalog and version on change.
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let catalog = params['catalog'];
        this.version = params['version'];

        this.catalogSelect(catalog);

    });

  }

  catalogSelect(catalog: String) {
      switch (catalog) {
          case 'swissdrg':
              this.catalog = this.swissDrgCatalog;
              break;
          case 'chop':
              this.catalog = this.chopCatalog;
              break;
          case 'icd':
              this.catalog = this.icdCatalog;
              break;
          default:
              console.log('Catalog not yet implemented: ' + catalog)
      }
  }

}
