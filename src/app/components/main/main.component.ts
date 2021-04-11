import { ILoggerService } from '../../service/logging/i.logger.service';
import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CatalogResolver } from '../../service/routing/catalog-resolver.service';
import { MobileService } from '../../service/mobile.service';

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
  public mobile;
  public catalog;

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    public mobileService: MobileService) {

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

    // Subscribe to route params, to know which catalog is being displayed
    this.route.params.subscribe((params: Params) => this.catalog = params['catalog']);

    // Subscribe to the search query, to know if SearchResult component must be displayed.
    this.route.queryParams.subscribe((params: Params) => this.query = params['query']);
    this.mobileService.setQuery(this.query);
    // Subscribe to route params, to check  if childroute :type/:code exists.
    this.route.params.subscribe((params: Params) => {

      if (!this.route.firstChild) {
        const { catalog, version } = this.route.snapshot.params;
        const root = this.catalogResolver.getRootElement(catalog, version);
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

  @HostListener('window:resize', ['$event'])
  private onResize(event: any): void {
    this.mobileService.resizeWindow(event.target.innerWidth);
    this.mobile = this.mobileService.getMobile();
  }

}
