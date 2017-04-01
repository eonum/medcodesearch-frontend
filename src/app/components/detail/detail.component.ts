import { Component, OnInit } from '@angular/core';
import { Catalog } from "../../catalog/catalog";
import { ActivatedRoute, Params } from "@angular/router";
import { CatalogElement } from "../../model/catalog.element";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */
  public catalog: Catalog;

  public selectedElement: CatalogElement;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    Observable.zip(
      this.route.params,
      this.route.data,
      (params: Params, data : { catalog: Catalog }) : string => {
        this.catalog = data.catalog;
        let code = params['code'];
        return code;
      }).subscribe(code => {      
        this.catalog.getByCode(code).then(element => {
          this.selectedElement = element;
        });
    });
  }

}
