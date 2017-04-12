import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogElement} from '../../../model/catalog.element';
import {Catalog} from '../../../catalog/catalog';
import {environment} from '../../../../environments/environment';


/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent implements OnChanges {


  @Input() catalog: Catalog = null;
  @Input() query = '';

  selectedElement: CatalogElement;
  searchResults: CatalogElement[];

  public constructor(private route: ActivatedRoute,
                     private router: Router) {
  }

  public openCode(result) {

    this.selectedElement = result;

    if (this.query) {
      this.catalog.sendAnalytics(this.selectedElement.url, this.query);
    }


    this.router.navigate(
      [result.type, result.code], {
        relativeTo: this.route,    // :catalog/:version/
        queryParamsHandling: 'merge'
      }
    ).catch(error => this.handleError(error.message));
  }

  /**
   * Life Cycle Hook that gets called whenever the Input values (from template or outer component) change.
   *
   * Perform the search and assign the results, or reset the
   * search results when no `query` or `catalog` is given.
   *
   */
  ngOnChanges() {

    if (!this.catalog || !this.query) {
      // reset results
      this.searchResults = null;
    } else {
      // do search
      this.catalog.search(this.catalog.getActiveVersion(), this.query || '')
        .then(results => this.searchResults = results)
        .catch(error => this.handleError(error));
    }
  }


  private handleError(error): void {
    if (environment.dev) {
      console.log(error);
    }
  }
}
