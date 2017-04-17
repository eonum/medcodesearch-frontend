import {ILoggerService} from './service/logging/i.logger.service';
import {RememberElementService} from './service/remember.element.service';
import {CatalogResolver} from './service/routing/catalog-resolver.service';
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CatalogSearchService} from './service/routing/catalog-search.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'medCodeSearch';

  // TODO get from language guard or define constants for both.
  public languages = ['de', 'fr', 'it', 'en'];

  public countRememberedElements = 0;

  constructor(public translate: TranslateService,
              @Inject('ILoggerService') private logger: ILoggerService,
              private catalogResolver: CatalogResolver,
              private router: Router,
              private rememberService: RememberElementService) {
    translate.addLangs(this.languages);
  }

  public ngOnInit(): void {
    this.rememberService.subscribe(() => {
      this.setRememberedElementsCount();
    });

    this.setRememberedElementsCount();
  }

  private setRememberedElementsCount(): void {
    this.countRememberedElements = this.rememberService.count();
  }

  public setLanguage(language: string): void {
    this.router.navigate(
      [language].concat(this.catalogResolver.getActiveRouteParams())
    ).catch(e => this.logger.log(e));
  }
}
