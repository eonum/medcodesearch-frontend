import {Catalog} from '../../../catalog/catalog';
import {CatalogElement} from '../../../model/catalog.element';
import {ILoggerService} from '../../../service/logging/i.logger.service';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogSearchService} from '../../../service/routing/catalog-search.service';

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent implements OnInit{

  @Input() public catalog: Catalog = null;
  public searchResults: CatalogElement[];

  public selectedCode: string;

  public constructor(private route: ActivatedRoute,
                     private router: Router,
                     @Inject('ILoggerService') private logger: ILoggerService,
                     private searchService: CatalogSearchService) {
  }

  /**
   * Subscribe to route parameter determine if the details view should be displayed
   */
  public ngOnInit(): void {

    this.searchService.subscribe(
      (results: CatalogElement[]) => this.searchResults = results
    );
  }

  public openCode(type: string, code: string): void {
    this.selectedCode = code; // mark for template

    this.sendAnalytics(type, code);
    this.redirectToCode(type, code);
  }

  private sendAnalytics(type: string, code: string): void {
    const query = this.route.snapshot.queryParams['query'];

    if (query) {
      this.catalog.sendAnalytics(type, code, query);
    }
  }


  private redirectToCode(type: string, code: string): void {

    this.router.navigate( [type, code], {
        queryParamsHandling: 'merge',
        relativeTo: this.route
      }
    ).catch(error => this.logger.error(error));
  }

}
