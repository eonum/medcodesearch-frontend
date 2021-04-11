import { ILoggerService } from '../logging/i.logger.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Settings } from '../../settings';
import { catalogConfigurations } from '../../catalog/catalog.configuration';
import { CatalogVersionService } from '../catalog-version.service';


export interface CatalogDisplayInfo {
  catalog: string;
  displayVersions: string[];
  languageVersions: string[];
  displayVersion: string;
}

/**
 * This service acts as resolver catalog - version - language related lookups.
 * It resolves {@link CatalogDisplayInformation}'s for the SearchFormComponent,
 * and handles redirects to a default catalog version from the route :language/:catalog/.
 *
 * @see {@link AppRoutingModule},
 * {@link https://angular.io/docs/ts/latest/guide/router.html#resolve-guard}
 *
 */
@Injectable()
export class CatalogResolver implements Resolve<CatalogDisplayInfo[]> {

  public activeVersions: { [language: string]: { [catalog: string]: string } } = {};

  constructor(private router: Router,
              private versionService: CatalogVersionService,
              @Inject('ILoggerService') private logger: ILoggerService) {

    Settings.LANGUAGES.forEach((lang: string) => {
      this.activeVersions[lang] = {};
    });

  }

  /**
   * Collect and return an array of {@CatalogDisplayInfo}, that the {@link SearchFormComponent}
   * uses to populate the drop-down's with the catalog versions.
   *
   * @param lang must be one of {@link Settings.LANGUAGES }
   * @returns {CatalogDisplayInfo[]}
   */
  private getDisplayInfos(lang: string): CatalogDisplayInfo[] {

    const displayInfos = [];

    for (const catalog of Settings.CATALOGS) {

      const displayVersions = this.versionService.getVersions(Settings.DEFAULT_LANGUAGE, catalog);
      const languageVersions = this.versionService.getVersions(lang, catalog);
      const displayVersion = this.getActiveVersion(lang, catalog);

      displayInfos.push(
        {
          catalog: catalog,
          displayVersions: displayVersions,
          languageVersions: languageVersions,
          displayVersion: displayVersion,
        } as CatalogDisplayInfo
      );
    }

    return displayInfos;
  }

  /**
   * Return the `activeVersion` for given params.
   * If it is not set, load the versions and set it first.
   *
   * @param lang must be one of {@link Settings.LANGUAGES}
   * @param catalog must be one of {@link Settings.CATALOGS}
   * @returns {string|null}
   */
  private getActiveVersion(lang: string, catalog: string): string {

    if (!this.activeVersions[lang][catalog]) {
      const versions = this.versionService.getVersions(lang, catalog);
      this.activeVersions[lang][catalog] = versions.length > 0 ? versions[0] : null;
    }
    return this.activeVersions[lang][catalog];
  }

  /**
   * Navigate to the active version of given  `catalog` and `language`.
   * If the catalog has no versions in the given language, redirect to start.
   *
   * @param language must be one of {@link Settings.LANGUAGES }
   * @param catalog must be one of {@link Settings.CATALOGS}
   */
  public navigateToActiveVersion(language: string, catalog: string): void {

    const version = this.getActiveVersion(language, catalog);

    if (version) {
      this.navigateToRoot(language, catalog, version);
    } else {
      this.router.navigate([language], { queryParamsHandling: 'merge' });
    }

  }

  /**
   * Navigate to the root element of the catalog without verifying if the version or catalog exist in the language.
   * @param language must be one of {@link Settings.LANGUAGES}
   * @param catalog must be one of {@link Settings.CATALOGS} that exists in the language
   * @param version must exist in the catalog and version
   */
  private navigateToRoot(language: string, catalog: string, version: string): void {
    const root = this.getRootElement(catalog, version);
    const params = [language, catalog, version, root.type, root.code];

    this.router.navigate(params, { queryParamsHandling: 'merge' });
  }

  /**
   * Resolve from the `:language, :catalog` and `:version` Params of the route the {@link CatalogDisplayInfo}'s for the
   * {@link SearchFormComponent}. Validate the `:version` and perform redirects if necessary.
   *
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<CatalogDisplayInfo[]> {

    const { language, version, catalog } = route.params;

    if (!version || !this.versionService.versionExists(language, catalog, version)) {
      this.navigateToActiveVersion(language, catalog);
      return null;
    }

    // set version active for all available languages
    this.versionService.getLanguages(catalog, version).forEach(
      (lang: string) => this.activeVersions[lang][catalog] = version
    );

    return Promise.resolve(this.getDisplayInfos(language));
  }

  /**
   * @param catalog must be one of {@link catalogConfigurations} keys.
   * @param version must be a valid version for the given catalog and current language.
   *
   * @returns {{type, code: string}}
   */
  public getRootElement(catalog: string, version: string): { type, code: string } {
    const root = catalogConfigurations[catalog].rootElement;

    /* The code of the root element is the same as the current
     version for ICD and CHOP.
     For SwissDRG, the code of the root element is 'ALL'.
     This code is configured in the CatalogConfiguration
     of SwissDRG.*/
    return { type: root.type, code: root.code || version };
  }

}
