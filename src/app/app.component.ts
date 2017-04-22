import {RememberedElement} from './model/remembered.element';
import {ILoggerService} from './service/logging/i.logger.service';
import {RememberElementService} from './service/remember.element.service';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Settings} from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'medCodeSearch';

  @ViewChild('tooltipElementAdded') public tooltipElementAdded;

  public languages = Settings.LANGUAGES;

  public countRememberedElements = 0;

  constructor(public translate: TranslateService,
              @Inject('ILoggerService') private logger: ILoggerService,
              private router: Router,
              private route: ActivatedRoute,
              private rememberService: RememberElementService) {
    translate.addLangs(this.languages);
  }

  public ngOnInit(): void {
    this.rememberService.getRememberedElements().subscribe((elements: RememberedElement[]) => {
      const oldNumberOfElements = this.countRememberedElements;
      this.countRememberedElements = elements.length;
      if (oldNumberOfElements < elements.length) {
        this.tooltipElementAdded.show();
        setTimeout(() => {
          this.tooltipElementAdded.hide();
        }, 2000);
      }
    });
  }

  public setLanguage(language: string): void {
    const {catalog, version} = this.route.firstChild.firstChild.snapshot.params;
    this.router.navigate(
      [language, catalog, version]
    ).catch(e => this.logger.log(e));
  }
}
