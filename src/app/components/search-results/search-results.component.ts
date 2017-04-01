import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { CatalogService } from '../../service/catalog.service';
import { CatalogElement } from '../../model/catalog.element';
import { Catalog } from '../../catalog/catalog';
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link SearchMainComponent}.
 */
@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent {
  @Input() searchResults: CatalogElement[];

  public catalog: Catalog;

  public constructor(private router: Router, private route: ActivatedRoute) {

  }

  public showDetail(result: any): void {
    let params = [result.code];

    this.router.navigate(params, { relativeTo: this.route })
      .catch(error => {
        console.log(error)
      });
  }
}
