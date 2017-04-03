import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CatalogElement} from '../../../model/catalog.element';
import {Catalog} from '../../../catalog/catalog';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent implements OnInit{
  // selected values (resolved in main component from route)
  searchResults: CatalogElement[];
  catalog: Catalog;
  query: string;

  public constructor(private route: ActivatedRoute, private router: Router) {}


  public openCode(type, code) {
    this.router.navigate([this.catalog.getDomain(), this.catalog.getActiveVersion(), type, code, {query: this.query}],
                          { relativeTo: this.route.parent }).catch(error => console.log(error));
  }

  /**
   * Subscribe to route data from {@link CatalogResolver} and to
   * the route parameters; update each time the search results,
   * when one of those values changes.
   */
  public ngOnInit() {

    console.log('Search Results on init.')
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
    ).subscribe(query => {
      this.updateResults(query);
    });
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
