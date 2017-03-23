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
import {Catalog} from '../../catalog/catalog';
import {ICatalogService} from '../../service/i.catalog.service';
import Spy = jasmine.Spy;
import { async } from "@angular/core/testing";
import { SwissDrgCatalog } from "./swissdrg.catalog";
import * as TypeMoq from "typemoq";
import { ICatalogService } from "../service/i.catalog.service";
import { CatalogElement } from "../model/catalog.element";


describe('SearchMainComponent', () => {

  let component: SearchMainComponent;
  let fixture: ComponentFixture<SearchMainComponent>;
  let route: ActivatedRouteStub;
  let catalogService: ICatalogService;
  let catalog: Catalog;
  let swissDrgCatalog: SwissDrgCatalog;
  let query:string;
  let mock : TypeMoq.IMock<SwissDrgCatalog>

  let searchResults: CatalogElement[] = [
    { code: "Content 1", text: "Description content 1", url: "/url/to/content1",
      highlight: {text:['content'],relevantCodes:[]}},
    { code: "Content 2", text: "Description content 2", url: "/url/to/content2" ,
      highlight: {text:['2'],relevantCodes:[]}},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchMainComponent,
        SearchFormComponent,
        SearchResultsComponent
      ],
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
    route = fixture.debugElement.injector.get(ActivatedRoute);
    swissDrgCatalog = new SwissDrgCatalog(catalogService);
    mock = TypeMoq.Mock.ofType<SwissDrgCatalog>();
    mock.setup(x => x.getActiveVersion()).returns(() => 'V4.0');

    mock.setup(x => x.search(TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => Promise.resolve(searchResults));

    //catalog = swissDrgCatalog;
    //spy = spyOn(swissDrgCatalog, 'search');

    query = "Search query";

    route.setCatalog(mock.object);
    route.setTestParams({'query': query});
    fixture.detectChanges();
  });

  it('should create', () => {
    mock.setup(x => x.search('V4.0', query)).returns(() => Promise.resolve(searchResults));
    expect(component).toBeTruthy();
  });

  it('should store the catalog', async(() => {
    expect(component.catalog).toBe(mock.object);
  }));

  it('should store the query', () => {
    expect(component.query).toBe(query);
  });

  it('should call the catalogs search function with the query', async(() => {
    route.setCatalog(mock.object);
    route.setTestParams({'query': query});
    fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      fixture.detectChanges();
      expect(component.searchResults).toBe(searchResults);

    });
   // expect(spy.calls.any()).toBe(true, 'Catalogs search function called');
  }));
});
