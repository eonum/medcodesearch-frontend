import {Component, OnInit} from '@angular/core';
import {Catalog} from '../../catalog/catalog';
import {ActivatedRoute, Params} from '@angular/router';
import {CatalogElement} from '../../model/catalog.element';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
/**
 * Container for the {@link SearchFormComponent} and {@link SearchResultsComponent}.
 * The component is assigned to the route `<catalog>/<version>/` and takes an
 * optional `query` parameter.
 *
 * The catalog is resolved by the {@link CatalogResolver} and then passed as input
 * to the {@link SearchFormComponent}. Each time the `query` or `catalog` changes,
 * the `searchResults` for the {@link SearchResultsComponent} are updated accordingly.
 */
@Component({
  selector: 'app-search-main',
  templateUrl: 'search-main.component.html',
  styleUrls: ['search-main.component.css']
})

export class SearchMainComponent implements OnInit {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form.
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

  constructor(private route: ActivatedRoute,) { }

  /**
   * Subscribe to route data from {@link CatalogResolver} and to
   * the route parameters; update each time the search results,
   * when one of those values changes.
   */
  ngOnInit() {

    /* Zip route data and params to get one observable that fires always, when
    one of the two values changed. */
    Observable.zip(
      this.route.data,
      this.route.params,
      (data: {catalog: Catalog}, params: Params): string => {
        //project to search query and assign values
        this.catalog = data.catalog;
        this.query   = params['query'] || '';
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
