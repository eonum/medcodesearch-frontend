import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import { SwissDrgCatalog } from "../../catalog/swissdrg.catalog";
import { CatalogService } from "../../service/catalog.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'catalog-select',
  templateUrl: 'catalog-select.component.html',
  styleUrls: ['catalog-select.component.css'],
  providers: [ SwissDrgCatalog, CatalogService ]
})

/**
 * Allow user to select a catalog and version.
 * Navigate with /<catalog.name>/<version>/ to
 * CatalogComponent.
 */
export class CatalogSelectComponent implements OnInit {

  public drgVersions: string[];

  constructor(private router: Router,
              private translate: TranslateService) { }

  /**
   * Set catalog versions.
   */
  ngOnInit() {
    // TODO - get versions from the catalog services
    this.drgVersions = ["V1.0","V2.0","V3.0","V4.0","V5.0","V6.0"]
  }

  /**
   * Navigate to /:language/:catalog/:version
   * @param {string} name
   * @param {string} version
   */
  public gotoCatalog(name: string, version: string):void {
    this.router.navigate([this.translate.currentLang, name ,version])
  }
}
