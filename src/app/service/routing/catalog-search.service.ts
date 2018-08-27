
import {switchMap, distinctUntilChanged} from 'rxjs/operators';
import { Catalog } from '../../catalog/catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { ILoggerService } from '../logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogElement } from '../../model/catalog.element';
import { BehaviorSubject ,  Subject } from 'rxjs';




export class SearchRequest {
  public catalog: string;
  public version: string;
  public query: string;
}

@Injectable()
export class CatalogSearchService {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: { [domain: string]: Catalog };

  private searchResults: BehaviorSubject<CatalogElement[]>;
  private requests: Subject<SearchRequest>;

  private requestsEqual(a: SearchRequest, b: SearchRequest): boolean {
    return Object.keys(a).every((key: string) => a[key] === b[key]);
  }

  /**
   * Constructor for class CatalogResolver.
   *
   * @param router
   * @param swissDrgCatalog
   * @param chopCatalog
   * @param icdCatalog
   */
  constructor(private route: ActivatedRoute,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog,
              @Inject('ILoggerService') private logger: ILoggerService) {

    this.catalogs = {};
    this.catalogs[swissDrgCatalog.getName()] = swissDrgCatalog;
    this.catalogs[chopCatalog.getName()] = chopCatalog;
    this.catalogs[icdCatalog.getName()] = icdCatalog;

    this.searchResults = new BehaviorSubject(null); // fires always latest value on new subscription

    this.requests = new Subject();

    /*Perform search when a new (distinct) search request is fired, and
     * use switch map to push always only the newest result to the search results.*/
    this.requests.asObservable().pipe(
      distinctUntilChanged(this.requestsEqual),
      switchMap((request: SearchRequest) => this.doSearch(request)),)
      .subscribe(
        (results: CatalogElement[]) => this.searchResults.next(results),
        error => this.logger.error('[CatalogSearchService]', error)
      );
  }

  private doSearch(searchRequest: SearchRequest): Promise<CatalogElement[]> {
    this.logger.log('[SearchService] search:', searchRequest);

    this.searchResults.next(null); // remove displayed search results
    const catalog = this.catalogs[searchRequest.catalog];
    return catalog.search(searchRequest.version, searchRequest.query);
  }

  /**
   * Subscribe with the given function to the search Results.
   * @param f
   */
  public subscribe(f: (_: CatalogElement[]) => void): void {
    this.searchResults.asObservable().subscribe(f);
  }

  public search(searchRequest: SearchRequest): void {
    if (searchRequest && searchRequest.catalog) {
      this.requests.next(searchRequest);
    } else {
      this.logger.error('No catalog in search request', searchRequest);
    }
  }

  public sendAnalytics(searchRequest: SearchRequest, type: string, code: string): void {
    const catalog = this.catalogs[searchRequest.catalog].sendAnalytics(
      type, code, searchRequest.query, searchRequest.version);
  }
}
