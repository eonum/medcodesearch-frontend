import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  template: `<router-outlet></router-outlet>`,
})

/**
 * Applies the translation to all routes.
 */
export class LanguageComponent implements OnInit {

  languages = ['de', 'fr', 'it', 'en'];

  /**
   * @param {Router} router - to change language
   * @param {ActivateRoute} route - to observe lang param from route
   * @param {TranslateService} translate - to set translation
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {

    translate.setDefaultLang('de');
  }

  /**
   * Subscribe to route parameters.
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let lang = params['lang'];

      if (this.languages.indexOf(lang) > -1) {
          this.translate.use(lang)
        } else {
          // Redirect to german
          this.router.navigate(['', 'de']);
        }
      }
    );
  }
}
