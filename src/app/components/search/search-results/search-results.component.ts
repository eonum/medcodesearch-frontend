
import {combineLatest as observableCombineLatest,  Observable } from 'rxjs';
import { CatalogElement } from '../../../model/catalog.element';
import { ILoggerService } from '../../../service/logging/i.logger.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogSearchService, SearchRequest } from '../../../service/routing/catalog-search.service';
import { MobileService } from '../../../service/mobile.service';
import {variable} from '@angular/compiler/src/output/output_ast';


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
  public tempResults: CatalogElement[];
  public selectedCode: string;

  public constructor(private route: ActivatedRoute,
                     private router: Router,
                     @Inject('ILoggerService') private logger: ILoggerService,
                     private searchService: CatalogSearchService,
                     private mobileService: MobileService) {
  }

  /**
   * Subscribe to route parameter determine if the details view should be displayed
   */
  public ngOnInit(): void {

    this.searchService.subscribe(
      (results: CatalogElement[]) => this.searchResults = results
    );

    observableCombineLatest(
      this.route.params, this.route.queryParams,
      (params, queryParams) => Object.assign({}, params, queryParams) as SearchRequest
    ).subscribe(request => {
      if (request.query) {
        this.searchService.search(request);
      }
    });

  }

  /**
   * Handle click on a {@link CatalogElement}
   * @param type
   * @param code
   */
  public openCode(type: string, code: string): void {
    this.selectedCode = code;
    this.sendAnalytics(type, code);
    this.redirectToCode(type, code);
  }

	/**
	* Sends an analytics message to the eonum server
	* @param type the type of the CatalogElement that was being clicked on
	* @param code the code of the CatalogElement that was being clicked on
	*/
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

    this.mobileService.focus('details');

  }

}
