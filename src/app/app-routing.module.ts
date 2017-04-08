import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageGuard } from './service/routing/language-guard.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { MainComponent } from './components/main/main.component';
import { DetailContainerComponent } from "./components/details/detail-container/detail-container.component";

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
        },
        children: [

          {
            path: ':type/:code',
            component: DetailContainerComponent
          }
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
  providers: [LanguageGuard, CatalogResolver]
})


export class AppRoutingModule {
}
