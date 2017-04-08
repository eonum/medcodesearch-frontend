import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalog } from '../../catalog/catalog';
import { environment } from '../../../environments/environment';
import { CatalogElement } from "../../model/catalog.element";
import { Observable } from "rxjs/Observable";

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
  styleUrls: ['main.component.css'],

})

export class MainComponent implements OnInit {

  public query = '';
  public catalog: Catalog;

  public selectedElement: CatalogElement;
  public searchResults: CatalogElement[];

  private code: string;
  private type: string;

  constructor(private route: ActivatedRoute, private router: Router) {
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
        this.code = params['code'];
        this.type = params['type'];
        this.updateView();
      }
    );

    this.route.queryParams.subscribe(
      params => {
        this.query = params['query'];
        this.updateView();
      }
    );

    this.route.data.subscribe(
      data => {
        this.catalog = data.catalog;
        this.updateView();
      }
    );
  }

  private updateView(): void {
    if (this.catalog){
      this.updateDetailView();
      this.updateSearchResultsView();
    }
  }

  private updateDetailView(): void {
    if (this.code && this.type){
        this.catalog.getByCode(this.type, this.code)
          .then(element => {
            this.selectedElement = element;
          })
          .catch(error => {
            this.handleError(error);
          });
    }
    else if (!this.query) {
      this.catalog.getRootElement()
        .then(element => {
          this.selectedElement = element;
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  }

  private updateSearchResultsView(): void {
    if (this.query){
        this.catalog.search(this.catalog.getActiveVersion(), this.query)
          .then(results => {
            this.searchResults = results;
          })
          .catch(error => {
            this.handleError(error);
          });
    }
    else {
      this.searchResults = null;
    }
  }

  private handleError(error): void {
    if (environment.dev) {
      console.log(error);
    }
  }
}
