import {ILoggerService} from '../../service/logging/i.logger.service';
import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {catalogConfigurations} from '../../catalog/catalog.configuration';
import {CatalogResolver} from '../../service/routing/catalog-resolver.service';

/**
 * Container for the {@link SearchFormComponent},{@link SearchResultsComponent}
 * and {@link DetailComponent}.
 * The Component controls the layout of the children. And if it is initialized
 * on the route :catalog/:version, it redirects to the root element for given catalog and version.
 */
@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],

})

export class MainComponent implements OnInit {

  public query;

  constructor(private route: ActivatedRoute,
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService,
              private catalogResolver: CatalogResolver) {
  }

  /**
   * Subscribe to route parameters.
   */
  public ngOnInit(): void {

    if (!this.route.snapshot.params['version']) {
      /* CatalogResolver is redirecting to a version,
       the Component will be initialized a second time.*/
      return;
    }

    // Subscribe to the search query, to now if SearchResult component must be displayed.
    this.route.queryParams.subscribe((params: Params) => this.query = params['query']);

    // Subscribe to route params, to check if a catalog element is selected.
    this.route.params.subscribe((params: Params) => {
        if (!this.route.firstChild) {
          const root = this.catalogResolver.getRootElement(
            this.route.snapshot.params['catalog'],
            this.route.snapshot.params['version']);

          this.navigateToElement(root.type, root.code);
        }

      }
    );
  }

  /**
   * Navigate to `:type/:code` .
   * @param type
   * @param code
   */
  private navigateToElement(type: string, code: string): void {

    this.router.navigate([type, code], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }

}
