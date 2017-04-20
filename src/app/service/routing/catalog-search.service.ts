import { Catalog } from '../../catalog/catalog';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { ILoggerService } from '../logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogElement } from '../../model/catalog.element';
import { BehaviorSubject, Subject } from 'rxjs';

export class SearchRequest {
  public catalog: string;
  public version: string;
  public language: string;
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
    this.catalogs[swissDrgCatalog.getDomain()] = swissDrgCatalog;
    this.catalogs[chopCatalog.getDomain()] = chopCatalog;
    this.catalogs[icdCatalog.getDomain()] = icdCatalog;

    this.searchResults = new BehaviorSubject(null); // fires always latest value on new subscription

    this.requests = new Subject();

    /*Perform search when a new (distinct) search request is fired and
    * use switch map to push always only the newest result to the search results.*/
    this.requests.asObservable()
      .distinctUntilChanged(this.requestsEqual)
      .switchMap((request: SearchRequest) =>
        this.catalogs[request.catalog].search(request.version, request.query)
      )
      .subscribe((results: CatalogElement[]) => this.searchResults.next(results));
  }

  /**
   * Subscribe with the given function to the search Results.
   * @param f
   */
  public subscribe(f: (_: CatalogElement[]) => void): void {
    this.searchResults.asObservable().subscribe(f);
  }

  public search(language: string, version: string, catalog: string, query: string) {
    this.requests.next({ language, version, catalog, query } as SearchRequest);
  }

  public sendAnalytics(searchRequest: SearchRequest, type: string, code: string) {
    const catalog = this.catalogs[searchRequest.catalog].sendAnalytics(
      type, code, searchRequest.query, searchRequest.version);
  }
}
