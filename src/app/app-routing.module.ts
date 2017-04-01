import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageGuard } from './service/routing/language-guard.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { SearchMainComponent } from './components/search-main/search-main.component';
import { DetailComponent } from "./components/detail/detail.component";

const routes: Routes = [
  {
    path: ':language',
    canActivate: [LanguageGuard],
    children: [
      {
        path: ':catalog',
        component: SearchMainComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: ':catalog/:version',
        component: SearchMainComponent,
        resolve: {
          catalog: CatalogResolver
        }
      },
      {
        path: ':catalog/:version/:code',
        component: DetailComponent,
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
  { path: '', redirectTo: 'de', pathMatch: 'full' },
  { path: '**', redirectTo: 'de' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LanguageGuard, CatalogResolver]
})


export class AppRoutingModule {
}
