import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogueComponent} from "./components/catalogue/catalogue.component";
import {AppComponent} from "./app.component";
import {LanguageComponent} from "./components/language/language.component";

const routes: Routes = [
  { path: ':lang', component: LanguageComponent ,
    children: [
      { path: '', component: CatalogueComponent },
    ]
  },
  { path: '**', redirectTo: '/de', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
