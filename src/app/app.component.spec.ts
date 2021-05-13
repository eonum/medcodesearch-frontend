import { FavoriteElementServiceMock } from './service/favorites/favorite.service.mock';
import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.module';
import { CHOPCatalog } from './catalog/chop.catalog';
import { ICDCatalog } from './catalog/icd.catalog';
import { SwissDrgCatalog } from './catalog/swissdrg.catalog';
import { TARMEDCatalog } from './catalog/tarmed.catalog';
import { FavoriteElementComponent } from './components/favorite-element/favorite-element.component';
import { CatalogServiceMock } from './service/catalog.service.mock';
import { NullLoggerService } from './service/logging/null.logger.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { CatalogVersionService } from './service/catalog-version.service';
import { GoogleAnalyticsEventsService } from "./service/google-analytics-events.service";
import { KlV1Catalog } from './catalog/klv1.catalog';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        PopoverModule.forRoot(),
        TooltipModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        FavoriteElementComponent
      ],
      providers: [
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        { provide: 'ILoggerService', useClass: NullLoggerService },
        { provide: 'IFavoriteService', useClass: FavoriteElementServiceMock },
        GoogleAnalyticsEventsService,
        SwissDrgCatalog,
        CHOPCatalog,
        ICDCatalog,
        TARMEDCatalog,
        KlV1Catalog,
        CatalogResolver,
        CatalogVersionService,
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'medCodeSearch'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('medCodeSearch');
  // }));

  it('should render title with an id', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#title').innerHTML).toContain('<img');

  }));
});
