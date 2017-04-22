import {Catalog} from '../../catalog/catalog';
import {CHOPCatalog} from '../../catalog/chop.catalog';
import {ICDCatalog} from '../../catalog/icd.catalog';
import {SwissDrgCatalog} from '../../catalog/swissdrg.catalog';
import {ILoggerService} from '../logging/i.logger.service';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Settings} from '../../settings';


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
 **
 * @see {@link AppRoutingModule},
 * {@link https://angular.io/docs/ts/latest/guide/router.html#resolve-guard}
 *
 */
@Injectable()
export class CatalogResolver implements Resolve<CatalogDisplayInfo[]> {

  /**Domain to catalog map for all available catalogs.*/
  private catalogs: { [domain: string]: Catalog };

  public activeVersions: { [language: string]: { [catalog: string]: string } } = {};


  constructor(private router: Router,
              private swissDrgCatalog: SwissDrgCatalog,
              private chopCatalog: CHOPCatalog,
              private icdCatalog: ICDCatalog,
              @Inject('ILoggerService') private logger: ILoggerService) {

    this.catalogs = {};
    this.catalogs[icdCatalog.getName()] = icdCatalog;
    this.catalogs[chopCatalog.getName()] = chopCatalog;
    this.catalogs[swissDrgCatalog.getName()] = swissDrgCatalog;

    Settings.LANGUAGES.forEach((lang: string) => {
      this.activeVersions[lang] = {};
    });

  }


  /**
   * Return the versions for the given `catalog` and `language` and set the corresponding `activeVersion`
   * if it is not set yet (may be null if no versions exist),
   *
   * @see {@link Catalog.getVersions}
   *
   * @param lang
   * @param catalog
   * @returns {Promise<string[]>}
   */
  private async getVersions(lang: string, catalog: string): Promise<string[]> {

    const versions = await this.catalogs[catalog].getVersions(lang);

    if (!this.activeVersions[lang][catalog]) {
      this.activeVersions[lang][catalog] = versions.length > 0 ? versions[0] : null;
    }
    return versions;
  }


  /**
   * Return the versions that should be displayed as selection for the given catalog.
   *
   * @param {string} catalog must be one of {@link Settings.CATALOG}
   * @returns {Promise<string[]>}
   */
  private getDisplayVersions(catalog: string): Promise<string[]> {
    return this.getVersions(Settings.DEFAULT_LANGUAGE, catalog);
  }

  /**
   * Collect and return an array of {@CatalogDisplayInfo}, that the {@link SearchFormComponent} can use
   * to display the catalog-version-selectors.
   *
   * @param lang must be one of {@link Settings.LANGUAGES }
   * @returns {Promise<Array>}
   */
  private async getDisplayInfos(lang: string): Promise<CatalogDisplayInfo[]> {

    const displayInfos = [];

    for (const catalog of Settings.CATALOGS) {

      const displayVersions = await this.getDisplayVersions(catalog);
      const languageVersions = await this.getVersions(lang, catalog);

      // TODO display another version on the Button, when none exist for the language ?
      const displayVersion = await this.getActiveVersion(lang, catalog);

      displayInfos.push(
        {
          catalog: catalog,
          displayVersions: displayVersions,
          languageVersions: languageVersions,
          displayVersion: displayVersion,
        } as CatalogDisplayInfo
      );
    }

    return Promise.resolve(displayInfos);
  }

  /**
   * Check if the `version` exists for `catalog` and `language`. If it is valid, return the {@ CatalogDisplayInfo}'s for
   * the given params. Else redirect to the active version.
   *
   * @param language must be one of {@link Settings.LANGUAGES }
   * @param version
   * @param catalog must be one of {@link Settings.CATALOG}
   * @returns {Promise<CatalogDisplayInfo[]>}
   */
  private async resolveDisplayInfos(language: string, version: string, catalog: string): Promise<CatalogDisplayInfo[]> {
    const valid = await this.versionExists(language, catalog, version);
    if (!valid) {
    } else {
      this.activeVersions[language][catalog] = version;
      // TODO maybe also update the active versions for other languages when they are available
    }
    // TODO check behaviour for invalid versions
    return valid ? this.getDisplayInfos(language) : this.navigateToActiveVersion(language, catalog);
  }

  /**
   * Return the `activeVersion` for given params.
   * If it is not set, load the versions and set it first.
   *
   * @param language must be one of {@link Settings.LANGUAGES}
   * @param catalog must be one of {@link Settings.CATALOG}
   * @returns {Promise<string>} value can be null.
   */
  private async getActiveVersion(language: string, catalog: string): Promise<string> {

    if (!this.activeVersions[language][catalog]) {
      await this.getVersions(language, catalog);
    }

    return Promise.resolve(this.activeVersions[language][catalog]);
  }


  /**
   * Navigate to the active version of given  `catalog` and `language`.
   * If the catalog has no versions in the given language, redirect to start.
   *
   * @param language must be one of {@link Settings.LANGUAGES }
   * @param catalog must be one of {@link Settings.CATALOG}
   */
  private async navigateToActiveVersion(language: string, catalog: string): Promise<CatalogDisplayInfo[]> {

    const version = await this.getActiveVersion(language, catalog);

    const params = version ? [language, catalog, version] : [language];

    this.router.navigate(params, {
      queryParamsHandling: 'merge'
    });

    return null;
  }

  /**
   * Resolve from the `:language, :catalog` and `:version` Params of the route the {@link CatalogDisplayInfo}'s for the
   * {@link SearchFormComponent}. Validate the `:version` and perform redirects if necessary.
   *
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<CatalogDisplayInfo[]> {

    const {language, version, catalog} = route.params;

    if (!version) {
      return this.navigateToActiveVersion(language, catalog).catch(e => this.logger.error(e));
    } else {
      return this.resolveDisplayInfos(language, version, catalog);
    }
  }


  /**
   * @param {string} catalog must be one of {@link Settings.CATALOG}
   * @param {string} version
   * @returns {string[]} some of {@link Settings.LANGUAGES}
   */
  public getLanguages(catalog: string, version: string): Promise<string[]> {
    return this.catalogs[catalog].getLanguages(version);
  }

  /**
   * @see {@link Catalog.hasVersion}
   *
   * @param lang must be one of {@link Settings.LANGUAGES }
   * @param catalog must be one of {@link Settings.CATALOGS }
   * @param [version] if absent, return true if any version exists.
   * @returns {Promise<boolean>}
   */
  public versionExists(lang: string, catalog: string, version?: string): Promise<boolean> {
    return this.catalogs[catalog].hasVersion(lang, version);
  }

}
