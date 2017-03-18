import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import {ResultsComponent} from "../results/results.component";
import {TranslateModule} from '@ngx-translate/core';
import {CatalogService} from '../../service/catalog.service';
import {CatalogServiceMock} from '../../service/catalog.service.mock';
import {ActivatedRoute} from '@angular/router';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule ],
      declarations: [ SearchFormComponent, ResultsComponent ],
      providers: [
        {provide: 'ICatalogService', useClass: CatalogServiceMock}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
