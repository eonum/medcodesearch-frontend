import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CatalogElement} from '../../../model/catalog.element';
import {Catalog} from '../../../catalog/catalog';

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent {
  // selected values (resolved in main component from route)
  @Input() searchResults: CatalogElement[];
  @Input() catalog: Catalog;
  @Input() query: string;

  public constructor(private route: ActivatedRoute, private router: Router) {}

  public openCode(type, code) {
    this.router.navigate([this.catalog.getDomain(), this.catalog.getActiveVersion(), type, code, {query: this.query}],
                          { relativeTo: this.route.parent }).catch(error => console.log(error));
  }
}
