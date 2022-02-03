import { SessionFavoritePersister } from './service/favorites/persisters/session.favorite.persister';
import { SortHelper } from './helper/sort.helper';
import { DefaultCatalogElementCache } from './caching/default.catalog.element.cache';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CHOPCatalog } from './catalog/chop.catalog';
import { ICDCatalog } from './catalog/icd.catalog';
import { SwissDrgCatalog } from './catalog/swissdrg.catalog';
import { TARMEDCatalog } from './catalog/tarmed.catalog';
import { DetailChopComponent } from './components/details/detail-chop/detail-chop.component';
import { DetailIcdComponent } from './components/details/detail-icd/detail-icd.component';
import { DetailSwissDrgComponent } from './components/details/detail-swiss-drg/detail-swiss-drg.component';
import { DetailTarmedComponent } from './components/details/detail-tarmed/detail-tarmed.component';
import { DetailComponent } from './components/details/detail/detail.component';
import { MainComponent } from './components/main/main.component';
import { FavoriteElementComponent } from './components/favorite-element/favorite-element.component';
import { SearchFormComponent } from './components/search/search-form/search-form.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ConvertCodePipe } from './pipes/convert-code.pipe';
import { CorrectVersionPipe } from './pipes/correct-version.pipe';
import { CatalogService } from './service/catalog.service';
import { ConsoleLoggerService } from './service/logging/console.logger.service';
import { FavoriteElementService } from './service/favorites/favorite.element.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule, CollapseModule, ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { CatalogSearchService } from './service/routing/catalog-search.service';
import { MobileService } from './service/mobile.service';
import { CatalogVersionService } from './service/catalog-version.service';
import { GoogleAnalyticsEventsService } from './service/google-analytics-events.service';
import { DetailKlv1Component } from './components/details/detail-klv1/detail-klv1.component';
import { RegCatalog } from './catalog/reg.catalog';
import { ConvertTextPipe } from './pipes/convert-text.pipe';
import { CorrectCatalogPipe } from './pipes/correct-catalog.pipe';

/**
 * Factory function to initialize the TranslateModule.
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/**
 * Factory function for the {@link CatalogVersionService}. Gets called on app initialization,
 * and loads the versions.
 *
 * @param service {CatalogVersionService}
 * @returns {()=>Promise<any>}
 */
export function VersionLoaderFactory(service: CatalogVersionService): () => Promise<any> {
  return () => service.loadVersions();
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
    DetailTarmedComponent,
    DetailKlv1Component,
    ConvertCodePipe,
    CorrectVersionPipe,
    ConvertTextPipe,
    CorrectCatalogPipe,
    FavoriteElementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [
    ConvertCodePipe,
    CorrectCatalogPipe,
    ConvertTextPipe,
  ],
  providers: [
    { provide: 'ICatalogService', useClass: CatalogService },
    { provide: 'ILoggerService', useClass: ConsoleLoggerService },
    { provide: 'ICatalogElementCache', useClass: DefaultCatalogElementCache },
    { provide: 'IFavoriteService', useClass: FavoriteElementService },
    { provide: 'IFavoritePersister', useClass: SessionFavoritePersister },
    SwissDrgCatalog,
    CHOPCatalog,
    ICDCatalog,
    TARMEDCatalog,
    RegCatalog,
    CatalogResolver,
    CatalogSearchService,
    MobileService,
    SortHelper,
    CatalogVersionService,
    GoogleAnalyticsEventsService,
    {
      provide: APP_INITIALIZER,
      useFactory: VersionLoaderFactory,
      deps: [CatalogVersionService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
