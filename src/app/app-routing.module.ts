import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueComponent} from "./components/catalogue/catalogue.component";
import {LanguageComponent} from "./components/language/language.component";
import {CatalogSelectComponent} from "./components/catalog-select/catalog-select.component";


const routes: Routes = [
  { path: ':lang', component: LanguageComponent ,
    children: [
      { path: '', component: CatalogSelectComponent,
        children: [
          { path: ':catalogue/:version', component: CatalogueComponent },
        ]},
    ]
  },
  { path: '', redirectTo: '/de', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
