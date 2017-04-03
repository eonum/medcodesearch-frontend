import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../catalog/catalog';
import { ActivatedRoute, Params } from '@angular/router';
import { CatalogElement } from '../../model/catalog.element';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Container for the {@link SearchFormComponent} and {@link SearchResultsComponent}.
 * The component is assigned to the route `<catalog>/<version>/` and takes an
 * optional `query` parameter.
 *
 * A catalog is resolved by the {@link CatalogResolver} and then passed as input
 * to the {@link SearchFormComponent}. Each time the `query` or `catalog` in the
 * Routers params or data changes, the `searchResults` that are bound as Input
 * to the {@link SearchResultsComponent} are updated with new search results.
 */
@Component({
  selector: 'app-search-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent implements OnInit {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */
  public catalog: Catalog;

  /**
   * The search query from the route.
   * Serves as input for the search-form component.
   * */
  public query: string;

  /**
   * The search results, updated after the route changed.
   * Serves as input for the search-results component.
   */
  public searchResults: CatalogElement[];

  constructor(private route: ActivatedRoute, ) { }

  /**
   * Subscribe to route data from {@link CatalogResolver} and to
   * the route parameters; update each time the search results,
   * when one of those values changes.
   */
  ngOnInit() {

    /* Zip route data and params to get one observable that fires always (the
    result of the projection function), when one of the two values changed. */
    Observable.zip(
      this.route.data,
      this.route.params,
      (data: { catalog: Catalog }, params: Params): string => {
        this.catalog = data.catalog;
        this.query = params['query'] || '';
        return this.query;
      }
    ).subscribe(query => { this.updateResults(query); })
  }

  /**
   * Perform the search and assign the results, or reset the
   * search results when no `query` or `catalog` is given.
   * @param query
   */
  private updateResults(query: string) {
    // reset results
    if (!this.catalog || !this.query) {
      this.searchResults = null;
      return;
    }

    // perform search
    this.catalog.search(this.catalog.getActiveVersion(), query)
      .then(results => {
        this.searchResults = results;
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private handleError(error): void {
    if (environment.dev) {
      console.log(error);
    }
  }
}
