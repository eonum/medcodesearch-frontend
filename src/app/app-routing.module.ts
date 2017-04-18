import { MainComponent } from './components/main/main.component';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { LanguageGuard } from './service/routing/language-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogElementResolver} from './service/routing/catalog-element-resolver.service';
import {DetailComponent} from './components/details/detail/detail.component';

const routes: Routes = [
  {
    path: ':language',
    canActivate: [LanguageGuard],
    children: [
      {
        path: ':catalog',
        component: MainComponent,
        resolve: {catalog: CatalogResolver}
      },
      {
        path: ':catalog/:version',
        component: MainComponent,
        resolve: {
          catalog: CatalogResolver
        },
        children: [
          {
            path: ':type/:code',
            component: DetailComponent,
            resolve: {
              catalogElement: CatalogElementResolver
            }
          },
        ]
      },

      {
        path: '',
        redirectTo: 'icd',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [LanguageGuard], // does redirect to browser language
    redirectTo: '',
  },
  { path: '**', redirectTo: '' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LanguageGuard, CatalogResolver, CatalogElementResolver]
})


export class AppRoutingModule {
}
