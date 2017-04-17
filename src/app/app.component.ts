import { Component, Inject } from '@angular/core';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ILoggerService } from "./service/i.logger.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'medCodeSearch';

  // TODO get from language guard or define constants for both.
  public languages = ['de', 'fr', 'it', 'en'];

  constructor(public translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    private router: Router) {

    translate.addLangs(this.languages);
  }

  setLanguage(language: string): void {
    this.router.navigate(
      [language].concat(this.catalogResolver.getActiveRouteParams())
    ).catch(e => this.logger.log(e));
  }
}
