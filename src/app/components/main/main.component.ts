import { Catalog } from '../../catalog/catalog';
import { CatalogElement } from '../../model/catalog.element';
import { ILoggerService } from '../../service/logging/i.logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CatalogSearchService } from '../../service/routing/catalog-search.service';
import { catalogConfigurations } from '../../catalog/catalog.configuration';

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
  public selectedElement: CatalogElement;

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService,
    private searchService: CatalogSearchService) {
  }

  /**
   * Subscribe to the DetailComponents route params to check,
   * if a redirect to the root element is necessary.
   */
  public ngOnInit(): void {

    if (!this.route.snapshot.params['version']) {
      // redirect from CatalogResolver to a version.
      return;
    }
    this.route.queryParams.subscribe((params: Params) => this.query = params['query']);

    this.route.params.subscribe((params: Params) => {

      if (!this.route.firstChild) {
        const catalog = this.route.snapshot.params['catalog'];
        const version = this.route.snapshot.params['version'];

        // TODO use name as param :catalog
        let config;
        for (const name in catalogConfigurations) {
          if (name.toLowerCase() === catalog) {
            config = catalogConfigurations[name];
          }
        }

        const rootElement = config.rootElement;

        this.router.navigate(
          [rootElement.type, rootElement.code || version], {
            relativeTo: this.route,
            queryParamsHandling: 'merge'
          });
      }
    });

  }


}
