import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ActivatedRouteStub} from '../../../router-stub';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [RouterModule, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
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
