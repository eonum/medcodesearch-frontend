import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {Observable} from 'rxjs';
import {Catalog} from './catalog/catalog';

/**
 * Replacement for the angular Router in tests.
 */
export class RouterStub {
  navigate(commands: string[], extras?: NavigationExtras) {
    return {
      'url': commands.join('/'),
      'extras': extras
    }
  }
}

/**
 * Replacement for the angular ActivatedRoute in tests.
 */
@Injectable()
export class ActivatedRouteStub {
// Test parameters
  private testParams: {} = {};
  private testData: {} = {};
  // ActivatedRoute.params and data are Observable
  private paramsSubject = new BehaviorSubject(this.testParams);
          dataSubject = new BehaviorSubject(this.testData);
          params  = this.paramsSubject.asObservable();
          data = this.dataSubject.asObservable();



  public getTestParams() {
    return this.testParams;
  }

  public setTestParams(params: {}) {
    this.testParams = params;
    this.paramsSubject.next(params);
  }

  public getTestData(){
    return this.testData;
  }

  public setTestData(data: {}) {
    this.testData = data;
    this.dataSubject.next(data);
  }

  public setCatalog(catalog: Catalog){
    this.setTestData({catalog: catalog});
  }

  public navigateToCatalog(catalogDomain:string, version:string, query?:string){
    let params = {
      'catalog': catalogDomain,
      'version': version,
    }
    if(query) params['query'] = query;
    this.setTestParams(params);
  }
}
