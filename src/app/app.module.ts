import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import { AppRoutingModule } from './app-routing.module';

import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { LanguageComponent } from './components/language/language.component';
import { SearchComponent } from './components/search/search.component';
import {AppComponent} from "./app.component";
import { CatalogSelectComponent } from './components/catalog-select/catalog-select.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/");
}


@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    LanguageComponent,
    SearchComponent,
    CatalogSelectComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
