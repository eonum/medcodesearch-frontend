import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogElement} from '../../../model/catalog.element';
import {Catalog} from '../../../catalog/catalog';
import {environment} from '../../../../environments/environment';


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

  @Input() catalog: Catalog = null;
  @Input() searchResults: CatalogElement[];

  selectedCode: string;


  public constructor(private route: ActivatedRoute,
                     private router: Router) {
  }

  public openCode(type, code) {
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

  private handleError(error): void {
    if (environment.dev) {
      console.log(error);
    }
  }
}
