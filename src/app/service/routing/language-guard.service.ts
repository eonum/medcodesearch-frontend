import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ILoggerService } from "../i.logger.service";

/**
 * This is an authentication guard that grants always access,
 * but sets the translation according to the `language` parameter in the path.
 *
 *  @see {@link AppRoutingModule},
 *  {@link https://angular.io/docs/ts/latest/guide/router.html#guard-admin-feature}
 */

@Injectable()
export class LanguageGuard implements CanActivate {

  private DEFAULT_LANGUAGE = 'de';
  private languages = ['de', 'fr', 'it', 'en'];

  constructor(private translate: TranslateService,
    private router: Router,
    @Inject('ILoggerService') private logger: ILoggerService) {
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
  }

  /**
   * This function is a hook for the authentication, i.e. it is called always before the Route gets activated.
   *
   * In this case it applies the translation and grants access if an existing
   * language is present in the root. Otherwise it redirects to the browser (or default) language.
   *
   * @param {ActivatedRouteSnapshot} route - contains route params up to the point where this guard gets activated.
   * @returns {boolean} - True, if a valid language parameter is in the route.   */
  canActivate(route: ActivatedRouteSnapshot) {

    let language = route.params['language'];

    // set language and return if it exists
    if (language && this.languages.indexOf(language) > -1) {
      this.setLanguage(language);
      return true;
    }

    // get browser language or default
    language = this.matchingLanguage(navigator.language) || this.DEFAULT_LANGUAGE;

    // redirect
    this.router.navigate([language]).catch(error => this.logger.log(error));
    return false;
  }

  /**
   * Return a available language tag, that is contained in the given language. Or undefined.
   *
   * E.g. en_US => en, DE => de, foo => undefined.
   *
   * @param {string} language
   * @returns {undefined|string}
   */
  private matchingLanguage(language: string): string {
    language = language.toLowerCase();
    return this.languages.filter(lang => language.search(lang) > -1).shift();
  }

  /**
   * Apply translation or navigate to DEFAULT_LANGUAGE if the language
   * does not exist.
   *
   * @param language
   */
  private setLanguage(language: string): void {
    if (this.languages.indexOf(language) > -1) {
      this.translate.use(language);
    } else {
      this.router.navigate([this.DEFAULT_LANGUAGE]);
    }
  }
}

