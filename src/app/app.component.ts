import { ILoggerService } from './service/logging/i.logger.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {

  public languages = Settings.LANGUAGES;

  constructor(public translate: TranslateService,
              @Inject('ILoggerService') private logger: ILoggerService,
              private catalogResolver: CatalogResolver,
              private router: Router,
              private route: ActivatedRoute) {
    translate.addLangs(this.languages);
  }



  /**
   * Navigate to the root element of the current routes catalog with the given language, and
   * preserve the query params.
   *
   * @param lang must be one of {@link Settings.LANGUAGES}
   */
  public setLanguage(lang: string): void {
    const catalog = this.route.firstChild.firstChild.snapshot.params['catalog'];
    this.catalogResolver.navigateToActiveVersion(lang, catalog);
  }

  /**
   * Navigate to the root element of the current routes catalog.
   */
  public toRoot(): void {

    const { language, catalog, version } = this.route.firstChild.firstChild.snapshot.params;
    const root = this.catalogResolver.getRootElement(catalog, version);
    const params = [language, catalog, version, root.type, root.code];

    this.router.navigate(params).catch(e => this.logger.log(e));

  }
}
