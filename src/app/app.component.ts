import { ILoggerService } from './service/logging/i.logger.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'medCodeSearch';

  // TODO get from language guard or define constants for both.
  public languages = ['de', 'fr', 'it', 'en'];

  constructor(public translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    private router: Router) {
    translate.addLangs(this.languages);
  }

  public ngOnInit(): void { }

  public setLanguage(language: string): void {
    this.router.navigate(
      [language].concat(this.catalogResolver.getActiveRouteParams())
    ).catch(e => this.logger.log(e));
  }
}
