import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {Catalog} from "../../catalog/Catalog";
import {SwissDrgCatalog} from "../../catalog/SwissDrgCatalog";
import {SwissDrgService} from "../../service/SwissDrgService";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  providers: [ SwissDrgCatalog, {provide: "SwissDrgService", useClass: SwissDrgService } ]
})


export class CatalogueComponent implements OnInit {

  public catalog: Catalog;
  public version: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private swissDrgCatalog: SwissDrgCatalog) { }

  /**
   * Subscribe to route parameters to update
   * catalog and version on change.
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let catalogue = params['catalogue'];

      if(catalogue=="drgs") {
          this.catalog = this.swissDrgCatalog;
          this.version = params['version'];
        } else {
        console.log('Catalog not yet implemented: ' + catalogue)
        }
      }
    );

  }

}
