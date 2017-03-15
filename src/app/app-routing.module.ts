import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogComponent} from "./components/catalog/catalog.component";
import {LanguageComponent} from "./components/language/language.component";
import {CatalogSelectComponent} from "./components/catalog-select/catalog-select.component";
import {SearchFormComponent} from './components/search-form/search-form.component';
import {ResultsComponent} from './components/results/results.component';


const routes: Routes = [
  { path: ':language', component: LanguageComponent ,
    children: [
      { path: ':catalog/:version', component: SearchFormComponent }, // CatalogComponent
      { path: ':catalog/:version/:query', component: SearchFormComponent }, // CatalogComponent
      { path: '', redirectTo: 'swissdrg/V6.0', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/de/swissdrg/V6.0', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
