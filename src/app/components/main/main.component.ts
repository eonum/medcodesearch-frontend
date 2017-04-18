import {Catalog} from '../../catalog/catalog';
import {CatalogElement} from '../../model/catalog.element';
import {ILoggerService} from '../../service/logging/i.logger.service';
import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogSearchService} from '../../service/routing/catalog-search.service';

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
  public searchResults: CatalogElement[] = [];

  private code: string;
  private type: string;
  private language: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService,
              private searchService: CatalogSearchService) {
  }

  /**
   * Subscribe to route parameter determine if the details view should be displayed
   */
  public ngOnInit(): void {
    this.logger.log('[MainComponent] on init.');

    this.searchService.subscribe((results: CatalogElement[]) =>
      this.searchResults = results);

    this.route.params.subscribe(
      params => {
        this.code = params['code'];
        this.type = params['type'];

        this.language = params['language'];
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
        this.selectedElement = data.catalogElement;
        this.updateView();
      }
    );
  }

  private updateView(): void {
    if (this.catalog) {
      this.updateSearchResultsView();
      if (!this.code) {
        // Navaigate to root element
        this.router.navigate(this.catalog.getRootElementParams(), {
          relativeTo: this.route,
          queryParamsHandling: 'merge'
        });
      }
    }
  }


  /**
   * If a search parameter is provided, the search
   * results will be displayed.
   * Otherwise no search results will be displayed.
   */
  private updateSearchResultsView(): void {
    if (this.query) {
      this.searchService.search(
        this.language, this.catalog.getActiveVersion(), this.catalog.getDomain(), this.query);
    } else {
      this.searchResults = null;
    }


  }

}
