import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Catalog} from '../../catalog/catalog';
import {environment} from '../../../environments/environment';

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
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent implements OnInit {

  public showDetails = false;
  public query = '';
  public catalog: Catalog;

  constructor(private route: ActivatedRoute) {
  }

  /**
   * Subscribe to route parameter determine if the details view should be displayed
   */
  ngOnInit() {
    if (environment.dev) {
      console.log('>> MainComponent on init.');
    }

    this.route.params.subscribe(
      params => {
        this.showDetails = params['code'] !== null;
      }
    );

    this.route.queryParams.subscribe(
      params => this.query = params['query']
    );

    this.route.data.subscribe(
      data => this.catalog = data.catalog
    );

  }

  public showResults(): boolean {
    return true;
  }

}
