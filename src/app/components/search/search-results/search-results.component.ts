import { Catalog } from '../../../catalog/catalog';
import { CatalogElement } from '../../../model/catalog.element';
import { ILoggerService } from '../../../service/logging/i.logger.service';
import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component to display the search results.
 * Receives the `searchResults` as input from the {@link MainComponent}.
 */
@Component({
  selector: 'app-search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],
})


export class SearchResultsComponent {

  @Input() public catalog: Catalog = null;
  @Input() public searchResults: CatalogElement[];

  public selectedCode: string;

  public constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService) {
  }

  public openCode(type: string, code: string): void {
    this.selectedCode = code;

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
    const language = this.route.snapshot.params['language'];
    this.router.navigate(
      [language, this.catalog.getDomain(), this.catalog.getActiveVersion(), type, code], {
        queryParamsHandling: 'merge'
      }
    ).catch(error => this.handleError(error.message));
  }

  private handleError(error: any): void {
    this.logger.log(error);
  }
}
