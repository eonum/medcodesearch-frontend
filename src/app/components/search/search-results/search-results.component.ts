import {Catalog} from '../../../catalog/catalog';
import {CatalogElement} from '../../../model/catalog.element';
import {ILoggerService} from '../../../service/logging/i.logger.service';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogSearchService, SearchRequest} from '../../../service/routing/catalog-search.service';
import {Observable} from 'rxjs';

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent implements OnInit {

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
    console.log('SearchResultComponent')
    this.searchService.subscribe(
      (results: CatalogElement[]) => this.searchResults = results
    );

    this.route.queryParams.subscribe(val => console.log(val))

    console.log(this.route)
    Observable.combineLatest(
      this.route.params, this.route.queryParams,
      (params, queryParams) => Object.assign({}, params, queryParams) as SearchRequest
    ).subscribe(request => this.searchService.search(request));

  }

  public openCode(type: string, code: string): void {
    this.selectedCode = code; // mark for template

    this.sendAnalytics(type, code);
    this.redirectToCode(type, code);
  }

  private sendAnalytics(type: string, code: string): void {

    const searchRequest: SearchRequest = Object.assign({},
      this.route.snapshot.params,
      this.route.snapshot.queryParams) as SearchRequest;

    this.searchService.sendAnalytics(searchRequest, type, code);
  }


  private redirectToCode(type: string, code: string): void {

    this.router.navigate([type, code], {
        queryParamsHandling: 'merge',
        relativeTo: this.route
      }
    ).catch(error => this.logger.error(error));
  }

}
