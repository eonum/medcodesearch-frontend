import { MobileService } from '../../service/mobile.service';
import { CHOPCatalog } from '../../catalog/chop.catalog';
import { ICDCatalog } from '../../catalog/icd.catalog';
import { SwissDrgCatalog } from '../../catalog/swissdrg.catalog';
import { TARMEDCatalog } from '../../catalog/tarmed.catalog';
import { CatalogElement } from '../../model/catalog.element';
import { ConvertCodePipe } from '../../pipes/convert-code.pipe';
import { CorrectVersionPipe } from '../../pipes/correct-version.pipe';
import { ActivatedRouteStub, RouterStub } from '../../router-stub';
import { CatalogServiceMock } from '../../service/catalog.service.mock';
import { NullLoggerService } from '../../service/logging/null.logger.service';
import { DetailChopComponent } from '../details/detail-chop/detail-chop.component';
import { DetailIcdComponent } from '../details/detail-icd/detail-icd.component';
import { DetailSwissDrgComponent } from '../details/detail-swiss-drg/detail-swiss-drg.component';
import { DetailComponent } from '../details/detail/detail.component';
import { SearchFormComponent } from '../search/search-form/search-form.component';
import { SearchResultsComponent } from '../search/search-results/search-results.component';
import { MainComponent } from './main.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { CatalogSearchService } from '../../service/routing/catalog-search.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CatalogResolver } from '../../service/routing/catalog-resolver.service';
import { CatalogVersionService } from '../../service/catalog-version.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailTarmedComponent } from '../details/detail-tarmed/detail-tarmed.component';
import { DetailKlv1Component } from '../details/detail-klv1/detail-klv1.component';
import { KlV1Catalog } from '../../catalog/klv1.catalog';
import {RegCatalog} from '../../catalog/reg.catalog';
import {CorrectCatalogPipe} from '../../pipes/correct-catalog.pipe';
import {ConvertTextPipe} from '../../pipes/convert-text.pipe';

describe('MainComponent', () => {

  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let router;
  let route;

  /*Test data*/

  const query = 'Some search query';
  const catalog = 'SwissDRG';
  const version = 'V4.0';


  const searchResults: CatalogElement[] = [
    {
      code: 'Content 1', text: 'Description content 1', url: '/url/to/content1',
      highlight: { text: ['content'], relevantCodes: [] }, type: 'drg'
    },
    {
      code: 'Content 2', text: 'Description content 2', url: '/url/to/content2',
      highlight: { text: ['2'], relevantCodes: [] }, type: 'drg'
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        SearchFormComponent,
        SearchResultsComponent,
        DetailComponent,
        DetailSwissDrgComponent,
        DetailChopComponent,
        DetailIcdComponent,
        DetailTarmedComponent,
        DetailKlv1Component,
        ConvertCodePipe,
        CorrectVersionPipe,
        CorrectCatalogPipe,
        ConvertTextPipe,
      ],
      imports: [
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        ReactiveFormsModule,
        TooltipModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog, TARMEDCatalog, KlV1Catalog, RegCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        CatalogSearchService,
        MobileService,
        CatalogResolver,
        CatalogVersionService,
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    // Set up the activated route stub
    route = fixture.debugElement.injector.get(ActivatedRoute);
    router = fixture.debugElement.injector.get(Router);


  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display SearchResultComponent when a query is given.', () => {
    route.setTestParams({ 'catalog': 'CATALOG', 'version': 'VERSION' });
    route.setQuery(query);
    fixture.detectChanges();

    const searchResultComponent = fixture.debugElement.query(By.css('app-search-results'));
    expect(searchResultComponent).toBeTruthy();
  });


  it('should NOT display SearchResultComponent when NO query is given.', () => {
    route.setTestParams({ 'catalog': 'CATALOG', 'version': 'VERSION' });

    fixture.detectChanges();
    expect(component.query).toBeFalsy();
  });


  it('should navigate to the catalogs root element when no catalog element is selected.', () => {
    route.setTestParams({ 'catalog': catalog, 'version': 'VERSION' });

    fixture.detectChanges();
    expect(router.lastNavigation).toBeTruthy();
    expect(router.lastNavigation.url).toBe('mdcs/ALL');
    expect(router.lastNavigation.extras.queryParamsHandling).toBe('merge');
  });


  it('should NOT redirect when an element is selected.', () => {
    route.setTestParams({ 'catalog': catalog, 'version': 'VERSION' });

    const child = new ActivatedRouteStub();
    child.setTestParams({ 'type': 'ATYPE', 'code': 'ACODE' });
    route.firstChild = child;

    fixture.detectChanges();

    expect(router.lastNavigation).toBeFalsy();
  });

});
