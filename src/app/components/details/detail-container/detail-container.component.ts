import { Component, OnInit } from '@angular/core';
import { Catalog } from "../../../catalog/catalog";
import { CatalogElement } from "../../../model/catalog.element";
import { Observable } from "rxjs/Observable";
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.css']
})
export class DetailContainerComponent implements OnInit {

   /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */
  public catalog: Catalog;

  /**
   * The current element for which the details are displayed
   */
  public selectedElement: CatalogElement;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (environment.dev) {
      console.log('>> DetailContainerComponent on init.');
    }

    /* Merge the route params type and code with the
     catalog in the route data into one single observable
     stream.
     */
    Observable.merge(
      this.route.parent.data,
      this.route.params,
    ).subscribe(
      params => {
        this.catalog = params['catalog'] || this.catalog;
        this.updateView(params['type'], params['code']);
      }
      );
  }

  /**
   * Load all data which shall be displayed
   * @param type the type of the element to display
   * @param code the code of the element to display
   */
  private updateView(type: string, code: string) {
    this.catalog.getByCode(type, code).then(element => {
      this.selectedElement = element;
    }).catch(error => console.log(error));
  }
}
