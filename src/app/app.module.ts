import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CatalogService} from './service/catalog.service';
import { DevLoggerService } from "./service/dev.logger.service";
import {SearchFormComponent} from './components/search/search-form/search-form.component';
import {SearchResultsComponent} from './components/search/search-results/search-results.component';
import {BsDropdownModule, CollapseModule, ModalModule, TooltipModule, PopoverModule} from 'ng2-bootstrap';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {SwissDrgCatalog} from './catalog/swissdrg.catalog';
import {CHOPCatalog} from './catalog/chop.catalog';
import {ICDCatalog} from './catalog/icd.catalog';
import {MainComponent} from './components/main/main.component';
import {DetailComponent} from './components/details/detail/detail.component';
import {DetailSwissDrgComponent} from './components/details/detail-swiss-drg/detail-swiss-drg.component';
import {DetailChopComponent} from './components/details/detail-chop/detail-chop.component';
import {DetailIcdComponent} from './components/details/detail-icd/detail-icd.component';
import { RememberElementComponent } from './components/remember-element/remember-element.component';

import {ConvertCodePipe} from './pipes/convert-code.pipe';
import { CorrectVersionPipe } from './pipes/correct-version.pipe';
import { RememberElementService } from "./service/remember.element.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
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
    { provide: 'ILoggerService', useClass: DevLoggerService },
    RememberElementService,
    SwissDrgCatalog,
    CHOPCatalog, 
    ICDCatalog, 
    CatalogResolver
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
