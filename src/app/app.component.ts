import { ILoggerService } from './service/logging/i.logger.service';
import { CatalogResolver } from './service/routing/catalog-resolver.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'medCodeSearch';

  public languages = Settings.LANGUAGES;

  constructor(public translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    private router: Router,
    private route: ActivatedRoute) {
    translate.addLangs(this.languages);
  }

  public ngOnInit(): void { }

  public setLanguage(lang: string): void {
    const {language, catalog, version} = this.route.firstChild.firstChild.snapshot.params;

    if (lang !== language) {
      this.router.navigate(
        [lang, catalog, version]
      ).catch(e => this.logger.log(e));
    }
  }
}
