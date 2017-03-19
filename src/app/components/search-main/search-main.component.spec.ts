import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainComponent } from './search-main.component';
import {SearchFormComponent} from '../search-form/search-form.component';
import {SearchResultsComponent} from '../search-results/search-results.component';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRouteStub, RouterStub} from '../../router-stub';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogServiceMock} from '../../service/catalog.service.mock';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';

describe('SearchMainComponent', () => {
  let component: SearchMainComponent;
  let fixture: ComponentFixture<SearchMainComponent>;

  let catalogService: ICatalogService;
  let catalog: Catalog;
  let query:string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMainComponent, SearchFormComponent, SearchResultsComponent ],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        {provide: 'ICatalogService', useClass: CatalogServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainComponent);
    component = fixture.componentInstance;

    catalogService = fixture.debugElement.injector.get('ICatalogService');

    catalog = new SwissDrgCatalog(catalogService)
    component.catalog = catalog;
    component.query = 'Search query';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
