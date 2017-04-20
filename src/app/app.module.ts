import { DefaultCatalogElementCache } from './caching/default.catalog.element.cache';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CHOPCatalog } from './catalog/chop.catalog';
import { ICDCatalog } from './catalog/icd.catalog';
import { SwissDrgCatalog } from './catalog/swissdrg.catalog';
import { DetailChopComponent } from './components/details/detail-chop/detail-chop.component';
import { DetailIcdComponent } from './components/details/detail-icd/detail-icd.component';
import { DetailSwissDrgComponent } from './components/details/detail-swiss-drg/detail-swiss-drg.component';
import { DetailComponent } from './components/details/detail/detail.component';
import { MainComponent } from './components/main/main.component';
import { RememberElementComponent } from './components/remember-element/remember-element.component';
import { SearchFormComponent } from './components/search/search-form/search-form.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ConvertCodePipe } from './pipes/convert-code.pipe';
import { CorrectVersionPipe } from './pipes/correct-version.pipe';
import { CatalogService } from './service/catalog.service';
import { ConsoleLoggerService } from './service/logging/console.logger.service';
import { RememberElementService } from './service/remember.element.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule, CollapseModule, ModalModule, PopoverModule, TooltipModule } from 'ng2-bootstrap';
import { CatalogElementResolver } from './service/routing/catalog-element-resolver.service';
import { CatalogSearchService } from './service/routing/catalog-search.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    MainComponent,
    DetailComponent,
    DetailSwissDrgComponent,
    DetailChopComponent,
    DetailIcdComponent,
    ConvertCodePipe,
    CorrectVersionPipe,
    RememberElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [
    ConvertCodePipe
  ],
  providers: [
    { provide: 'ICatalogService', useClass: CatalogService },
    { provide: 'ILoggerService', useClass: ConsoleLoggerService },
    { provide: 'ICatalogElementCache', useClass: DefaultCatalogElementCache },
    RememberElementService,
    SwissDrgCatalog,
    CHOPCatalog,
    ICDCatalog,
    CatalogResolver,
    CatalogSearchService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
