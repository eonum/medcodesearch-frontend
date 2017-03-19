import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {Observable} from 'rxjs';

export class RouterStub {
  navigate(commands: string[], extras?: NavigationExtras) {
    return {
      'url': commands.join('/'),
      'extras': extras
    }
  }
}


@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private paramsSubject = new BehaviorSubject(this.testParams);
          params  = this.paramsSubject.asObservable();
          data = Observable.of();

  // TODO adjust for ES5
  // Test parameters
  private _testParams: {};
  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return {params: this.testParams};
  }
}
