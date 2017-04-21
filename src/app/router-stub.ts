import { Catalog } from './catalog/catalog';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Replacement for the angular Router in tests.
 */
export class RouterStub {

  public url;
  public extras;

  public navigate(commands: string[], extras?: NavigationExtras): { 'url': string, 'extras': NavigationExtras } {
    this.url = commands.join('/');
    this.extras = extras;
    return {
      'url': commands.join('/'),
      'extras': extras
    };
  }
}

/**
 * Replacement for the angular ActivatedRoute in tests.
 */
@Injectable()
export class ActivatedRouteStub {

  /*Set up stub for observable field 'params'*/
  private testParams: {} = {};
  private paramsSubject = new BehaviorSubject(this.testParams);
  private params = this.paramsSubject.asObservable();

  /*Set up stub for observable field 'data'*/
  private testData: {} = {};
  private dataSubject = new BehaviorSubject(this.testData);
  private data = this.dataSubject.asObservable();

  /*Set up stub for observable field 'queryParams'*/
  private testQueryParams: {} = {};
  private queryParamsSubject = new BehaviorSubject(this.testQueryParams);
  private queryParams = this.queryParamsSubject.asObservable();

  public snapshot = {
    params: {},
    queryParams: {}
  };

  /*Set the given params as next value in the 'params'-observable*/
  public setTestParams(params: {}): void {
    this.testParams = params;
    this.snapshot.params = params;
    this.paramsSubject.next(params);

  }

  /*Set the given params as next value in the 'params'-observable*/
  public setTestQueryParams(queryParams: {}): void {
    this.testQueryParams = queryParams;
    this.snapshot.queryParams = queryParams;
    this.queryParamsSubject.next(queryParams);
  }

  /*Set the given data as next value in the 'data'-observable*/
  public setTestData(data: {}): void {
    this.testData = data;
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
