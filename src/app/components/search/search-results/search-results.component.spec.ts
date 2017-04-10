import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchResultsComponent} from './search-results.component';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../router-stub';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [RouterModule, TranslateModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
