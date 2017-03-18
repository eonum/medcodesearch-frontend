import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {LanguageGuard} from './service/routing/language-guard.service';
import {CatalogResolver} from './service/routing/catalog-resolver.service';

const routes: Routes = [
  {
    path: ':language',
    canActivate: [LanguageGuard],
    children: [
      {
        path: ':catalog/:version',
        component: SearchFormComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: ':catalog/:version/:query',
        component: SearchFormComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: '',
        redirectTo: 'swissdrg/V6.0',
        pathMatch: 'full'
      }
    ]
  },
  {path: '', redirectTo: '/de/swissdrg/V6.0', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LanguageGuard, CatalogResolver]
})

export class AppRoutingModule {
}
