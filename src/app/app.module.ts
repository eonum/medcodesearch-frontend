import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {CatalogService} from './service/catalog.service';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {ResultsComponent} from './components/results/results.component';
import {DropdownModule, CollapseModule} from 'ng2-bootstrap';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {SwissDrgCatalog} from './catalog/swissdrg.catalog';
import {CHOPCatalog} from './catalog/chop.catalog';
import {ICDCatalog} from './catalog/icd.catalog';
import { SearchMainComponent } from './components/search-main/search-main.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
    declarations: [
        AppComponent,
        SearchFormComponent,
        ResultsComponent,
        SearchMainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        DropdownModule.forRoot(),
        CollapseModule.forRoot()
    ],
    providers: [
      {provide: 'ICatalogService', useClass: CatalogService},
      SwissDrgCatalog, CHOPCatalog, ICDCatalog, CatalogResolver
      ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
