import { Catalog } from '../../catalog/catalog';
import { CatalogElement } from '../../model/catalog.element';
import { ILoggerService } from '../../service/logging/i.logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Container for the {@link SearchFormComponent},{@link SearchResultsComponent}
 * and {@link DetailComponent}.
 * A catalog is resolved by the {@link CatalogResolver} and then passed as input
 * to the {@link SearchFormComponent}. Each time the `query` or `catalog` in the
 * Routers params or data changes, the `searchResults` that are bound as Input
 * to the {@link SearchResultsComponent} are updated with new search results.
 * If a code is selected, the respective {@link CatalogElement} is loaded and
 * displayed by the {@link DetailComponent}.
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService) {
  }
  /**
   * Subscribe to route parameter determine if the details view should be displayed
   */
  ngOnInit() {
    this.logger.log('>> MainComponent on init.');

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
    if (this.catalog) {
      this.updateDetailView();
      this.updateSearchResultsView();
    }
  }

  /**
   * Load an element of which the details will be displayed.
   * If a code is provided in the url by the user, the according
   * element will be displayed.
   * Otherwise the root element of the current catalog will be
   * displayed.
   */
  private updateDetailView(): void {
    if (this.code && this.type) {
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

  /**
   * If a search parameter is provided, the search
   * results will be displayed.
   * Otherwise no search results will be displayed.
   */
  private updateSearchResultsView(): void {
    if (this.query) {
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
    this.logger.log(error);
  }
}
