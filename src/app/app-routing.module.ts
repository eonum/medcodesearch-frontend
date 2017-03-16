import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SearchFormComponent} from "./components/search-form/search-form.component";
import {LanguageGuard} from "./language-guard.service";

const routes: Routes = [
  {
    path: ':language',
    canActivate:[LanguageGuard],
    children: [
      {path: ':catalog/:version', component: SearchFormComponent},
      {path: ':catalog/:version/:query', component: SearchFormComponent}, // CatalogComponent
      {path: '', redirectTo: 'swissdrg/V6.0', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: '/de/swissdrg/V6.0', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LanguageGuard]
})

export class AppRoutingModule {
}
