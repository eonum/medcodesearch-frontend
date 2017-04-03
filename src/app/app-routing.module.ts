import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LanguageGuard} from './service/routing/language-guard.service';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {
    path: ':language',
    canActivate: [LanguageGuard],
    children: [
      {
        path: ':catalog',
        component: MainComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: ':catalog/:version',
        component: MainComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: ':catalog/:version/:type/:code',
        component: MainComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: '',
        redirectTo: 'icd',
        pathMatch: 'full'
      }
    ]
  },
  {path: '', canActivate: [LanguageGuard], redirectTo: '', pathMatch: 'full'},  // redirect to browser language
  {path: '**', redirectTo: ''}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LanguageGuard, CatalogResolver]
})


export class AppRoutingModule {
}
