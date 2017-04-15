import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Catalog } from './catalog/catalog';

/**
 * Replacement for the angular Router in tests.
 */
export class RouterStub {

  public url;
  public extras;

  navigate(commands: string[], extras?: NavigationExtras) {
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
  paramsSubject = new BehaviorSubject(this.testParams);
  params = this.paramsSubject.asObservable();

  /*Set up stub for observable field 'data'*/
  private testData: {} = {};
  dataSubject = new BehaviorSubject(this.testData);
  data = this.dataSubject.asObservable();

  /*Set up stub for observable field 'queryParams'*/
  private testQueryParams: {} = {};
  queryParamsSubject = new BehaviorSubject(this.testQueryParams);
  queryParams = this.queryParamsSubject.asObservable();

  /*Set the given params as next value in the 'params'-observable*/
  public setTestParams(params: {}) {
    this.testParams = params;
    this.paramsSubject.next(params);

  }

  /*Set the given params as next value in the 'params'-observable*/
  public setTestQueryParams(queryParams: {}) {
    this.testQueryParams = queryParams;
    this.queryParamsSubject.next(queryParams);
  }

  /*Set the given data as next value in the 'data'-observable*/
  public setTestData(data: {}) {
    this.testData = data;
    this.dataSubject.next(data);
  }

  /*Set the catalog as next value in the 'data'-observable*/
  public setCatalog(catalog: Catalog) {
    this.setTestData({ catalog: catalog });
  }


  public navigateToCatalog(catalogDomain: string, version: string, query?: string) {
    const params = {
      'catalog': catalogDomain,
      'version': version,
    };
    const queryParams = query ? { 'query': query } : {};
    this.setTestParams(params);
    this.setTestQueryParams(query);
  }

  setQuery(query: string) {
    this.setTestQueryParams({ 'query': query });
  }
}
