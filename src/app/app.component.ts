import { ILoggerService } from './service/logging/i.logger.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './settings';
import { GoogleAnalyticsEventsService } from './service/google-analytics-events.service'

declare var window: any;
declare var ga: any;

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
              public googleAnalyticsEventsService: GoogleAnalyticsEventsService,
              private route: ActivatedRoute) {
                  router.events.distinctUntilChanged((previous: any, current: any) => {
                      if(current instanceof NavigationEnd) {
                        return previous.url === current.url;
                      }
                    return true;
                  }).subscribe((x: any) => {
                      console.log('router.change', x);
                      ga('send', 'pageview', x.url);
                  });
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
    window.localStorage.setItem('eonumLanguage', lang);
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
