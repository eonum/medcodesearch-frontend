import {Injectable} from "@angular/core";
import {Router, ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

/**
 * This Service uses the authentication guard functionality
 * to apply the translation to all routes that start with a
 * language tag.
 *
 * @see app.routing.module.ts
 */
@Injectable()
export class LanguageGuard implements CanActivate {

  private DEFAULT_LANGUAGE = 'de';
  private languages = ['de', 'fr', 'it', 'en'];

  constructor(private translate: TranslateService, private router: Router) {
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
  }

  /**
   * This function is a hook for the authentication,
   * i.e. it is called always before the Route gets activated.
   * In this case it applies the translation and says yes.
   *
   * @param route
   * @returns {boolean} - always True
   */
  canActivate(route: ActivatedRouteSnapshot) {
    let language = route.params['language'];
    this.setLanguage(language);
    return true;
  }

  /**
   * Apply translation or navigate to DEFAULT_LANGUAGE.
   * @param language
   */
  private setLanguage(language: string): void {
    if (this.languages.indexOf(language) > -1) {
      this.translate.use(language)
    } else {
      this.router.navigate([this.DEFAULT_LANGUAGE]);
    }
  }

}
