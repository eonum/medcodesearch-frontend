import {Component, OnInit, Input} from '@angular/core';
import {SwissDrgService} from "../../service/SwissDrgService";
import {SwissDrgCatalog} from "../../catalog/SwissDrgCatalog";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'catalog-select',
  templateUrl: 'catalog-select.component.html',
  styleUrls: ['catalog-select.component.css'],
  providers: [ SwissDrgCatalog, {provide: "SwissDrgService", useClass: SwissDrgService } ]
})

/**
 * Allow user to select a catalog and version.
 * Navigate with /<catalog.name>/<version>/ to
 * CatalogComponent
 */
export class CatalogSelectComponent implements OnInit {

  public drgVersions: string[];

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  /**
   * Set catalog versions.
   */
  ngOnInit() {
    // TODO get async and store with swissDrgCatalog
    this.drgVersions = ["V1.0","V2.0","V3.0","V4.0","V5.0","V6.0"]
  }

  /**
   * Navigate to <name>/<version>/
   * @param {string} name
   * @param {string} version
   */
  public gotoCatalog(name: string, version: string):void {
    this.router.navigate([name ,version], { relativeTo: this.route })
  }
}
