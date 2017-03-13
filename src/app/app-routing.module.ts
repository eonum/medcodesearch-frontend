import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogComponent} from "./components/catalog/catalog.component";
import {LanguageComponent} from "./components/language/language.component";
import {CatalogSelectComponent} from "./components/catalog-select/catalog-select.component";


const routes: Routes = [
  { path: ':language', component: LanguageComponent ,
    children: [
      { path: ':catalogue/:version', component: CatalogComponent },
      { path: '', redirectTo: 'drgs/V6.0', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/de/drgs/V6.0', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
