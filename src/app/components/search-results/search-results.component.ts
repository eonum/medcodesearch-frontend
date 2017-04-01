import { Component, Input } from '@angular/core';
import { CatalogElement } from '../../model/catalog.element';

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

  public constructor() { }
}
