import { Component, OnInit } from '@angular/core';
import {Catalog} from '../../catalog/catalog';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-main',
  templateUrl: 'search-main.component.html',
  styleUrls: ['search-main.component.css']
})
export class SearchMainComponent implements OnInit {

  /**The active catalog, resolved from the activated route*/
  public catalog: Catalog;

  constructor(private route: ActivatedRoute,) { }

  /**
   * Subscribe to route data from {@link CatalogResolver}.
   */
  ngOnInit() {
    this.route.data.subscribe((
      data:{catalog:Catalog}) => {
        this.catalog = data.catalog;
      } )
  }

}
