import { Catalog } from './catalog/catalog';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

/**
 * Replacement for the angular Router in tests.
 */
export class RouterStub {

  public url;
  public extras;

  public lastNavigation: { 'url': string, 'extras': NavigationExtras };
  public navigate(commands: string[], extras?: NavigationExtras): { 'url': string, 'extras': NavigationExtras } {
    this.url = commands.join('/');
    this.extras = extras;
    this.lastNavigation = {
      'url': commands.join('/'),
      'extras': extras
    };
    return this.lastNavigation;

  }
}

/**
 * Replacement for the angular ActivatedRoute in tests.
 */
@Injectable()
export class ActivatedRouteStub {

  public snapshot = {
    params: {},
    queryParams: {},
    data: {}
  };

  private paramsSubject = new BehaviorSubject(this.snapshot.params);
  private params = this.paramsSubject.asObservable();


  private dataSubject = new BehaviorSubject(this.snapshot.data);
  private data = this.dataSubject.asObservable();

  private queryParamsSubject = new BehaviorSubject(this.snapshot.queryParams);
  private queryParams = this.queryParamsSubject.asObservable();

  public firstChild: ActivatedRouteStub;

  /*Set the given params as next value in the 'params'-observable*/
  public setTestParams(params: {}): void {
    this.snapshot.params = params;
    this.paramsSubject.next(params);

  }

  /*Set the given params as next value in the 'params'-observable*/
  public setTestQueryParams(queryParams: {}): void {
    this.snapshot.queryParams = queryParams;
    this.queryParamsSubject.next(queryParams);
  }

  /*Set the given data as next value in the 'data'-observable*/
  public setTestData(data: {}): void {
    this.snapshot.data = data;
    this.dataSubject.next(data);
  }

  /*Set the catalog as next value in the 'data'-observable*/
  public setCatalog(catalog: Catalog): void {
    this.setTestData({ catalog: catalog, version: 'SOME_VERSION' });
  }


  public navigateToCatalog(catalogDomain: string, version: string, query?: string): void {
    const params = {
      'catalog': catalogDomain,
      'version': version,
    };
    const queryParams = query ? { 'query': query } : {};
    this.setTestParams(params);
    this.setTestQueryParams(query);
  }

  public setQuery(query: string): void {
    this.setTestQueryParams({ 'query': query });
  }
}
