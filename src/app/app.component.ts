import { Component } from '@angular/core';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageGuard} from './service/routing/language-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'medCodeSearch';

  constructor( translate: TranslateService, private router: CatalogResolver) {
  }

}
