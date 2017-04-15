import { ILoggerService } from './service/i.logger.service';
import { RememberElementService } from './service/remember.element.service';
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
  title = 'medCodeSearch';

  // TODO get from language guard or define constants for both.
  public languages = ['de', 'fr', 'it', 'en'];

  public countRememberedElements: number = 0;

  constructor(public translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    private catalogResolver: CatalogResolver,
    private router: Router,
    private rememberService: RememberElementService) {
    translate.addLangs(this.languages);
  }

  public ngOnInit(): void {
    this.rememberService.subscribe(() => {
      this.getRememberedElementsCount();
    });

    this.getRememberedElementsCount();
  }

  private getRememberedElementsCount() {
    this.countRememberedElements = this.rememberService.count();
  }

  setLanguage(language: string): void {
    this.router.navigate(
      [language].concat(this.catalogResolver.getActiveRouteParams())
    ).catch(e => this.logger.log(e));
  }
}
