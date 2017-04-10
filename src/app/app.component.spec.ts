import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.module';
import {Http, HttpModule} from '@angular/http';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {CHOPCatalog} from './catalog/chop.catalog';
import {ICDCatalog} from './catalog/icd.catalog';
import {SwissDrgCatalog} from './catalog/swissdrg.catalog';
import {CatalogServiceMock} from './service/catalog.service.mock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        { provide: 'ICatalogService', useClass: CatalogServiceMock },
        SwissDrgCatalog, CHOPCatalog, ICDCatalog, CatalogResolver]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'medCodeSearch'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('medCodeSearch');
  }));

  it('should render title with an id', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#title').textContent).toContain('medCodeSearch');

  }));
});
