import { ActivatedRouteStub, RouterStub } from '../../../router-stub';
import { NullLoggerService } from '../../../service/logging/null.logger.service';
import { SearchResultsComponent } from './search-results.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogSearchService } from '../../../service/routing/catalog-search.service';
import { SwissDrgCatalog } from '../../../catalog/swissdrg.catalog';
import { CHOPCatalog } from '../../../catalog/chop.catalog';
import { ICDCatalog } from '../../../catalog/icd.catalog';
import { CatalogServiceMock } from '../../../service/catalog.service.mock';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [RouterModule, TranslateModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        CatalogSearchService, SwissDrgCatalog, CHOPCatalog, ICDCatalog,
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
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
