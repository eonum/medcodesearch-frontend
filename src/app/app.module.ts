import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppRoutingModule} from './app-routing.module';

import {CatalogComponent} from './components/catalog/catalog.component';
import {LanguageComponent} from './components/language/language.component';
import {SearchComponent} from './components/search/search.component';
import {AppComponent} from './app.component';
import {CatalogSelectComponent} from './components/catalog-select/catalog-select.component';
import {CatalogService} from './service/catalog.service';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {ResultsComponent} from './components/results/results.component';
import {DropdownModule, CollapseModule} from 'ng2-bootstrap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent,
        LanguageComponent,
        SearchComponent,
        CatalogSelectComponent,
        SearchFormComponent,
        ResultsComponent
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
    providers: [{provide: 'ICatalogService', useClass: CatalogService}],
    bootstrap: [AppComponent]
})

export class AppModule {
}
