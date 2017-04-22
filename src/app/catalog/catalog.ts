import {CatalogElement} from '../model/catalog.element';
import {ICatalogService} from '../service/i.catalog.service';
import {ILoggerService} from '../service/logging/i.logger.service';
import {CatalogConfiguration} from './catalog.configuration';
import {Injectable} from '@angular/core';
import {Settings} from '../settings';

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {

  /**Cache for the versions*/
  protected versions: { [language: string]: string[] };

  /**
   * Constructor for class Catalog. Initializes the versions.
   *
   * @param service the service to access the catalog data (interface to search.eonum api)
   * @param name - The name of the catalog.
   * @param codeRegex - The regex which is used to identify element codes within this catalog.
   * @param elements - elements within a catalog
   */
  public constructor(private service: ICatalogService,
                     private logger: ILoggerService,
                     public name: string,
                     protected config: CatalogConfiguration) {
    this.versions = {};
  }

  /**
   * Searches elements within the catalog.
   * @param version the version of the catalog to use
   * @param query the query to search for
   */
  public async search(version: string, query: string): Promise<CatalogElement[]> {
    this.initService();
    return this.service.search(version, query);
  }

  /**
   * Get a specific element from the catalog
   * @param type the type of the {@link CatalogElement} to load
   * @param code the code of the {@link CatalogElement} to load
   */
  public async getByCode(type: string, code: string, version: string, language?: string): Promise<CatalogElement> {
    this.initService();
    return this.service.getByCode(version, type, code.replace(' ', '_'), language);
  }

  private initService(): void {
    this.service.init(this.config);
  }

  public getName(): string {
    return this.name;
  }


  /**
   * Sends an analytic notification to eonum
   *
   */
  public sendAnalytics(type: string, code: string, query: string, version?: string): void {
    this.service.sendAnalytics(version, type, code, query);
  }

  /**
   * Return the versions for the given language, loaded trough the {@link CatalogService}
   *
   * @param lang must be one of {@link Settings.languages }
   * @returns {Promise<string[]>  }
   */
  private async loadVersions(lang: string): Promise<string[]> {

    this.initService();
    return this.service.getVersions(lang);
  }


  /**
   *
   * @param lang lang must be one of {@link Settings.LANGUAGES }
   * @param [version] if absent, return true if any version exists.
   * @returns {Promise<boolean>}
   */
  public async hasVersion(lang: string, version?: string): Promise<boolean> {
    const versions = await this.getVersions(lang);
    const exists = (!version && versions.length > 0) || versions.indexOf(version) > -1;
    return Promise.resolve(exists);
  }

  /**
   * Return the stored versions for the given language.
   * Load and store them first if necessary,
   *
   * @param lang must be one of {@link Settings.languages }
   * @returns {Promise<string[]>}
   */
  public async getVersions(lang: string): Promise<string[]> {

    if (!this.versions[lang]) {
      this.versions[lang] = (await this.loadVersions(lang)).reverse();
    }
    return Promise.resolve(this.versions[lang]);
  }


  /**
   * Return a list with all languages where the given version exists.
   * @param version
   * @returns {Promise<Array>} values from {@link Settings.LANGUAGES }
   */
  public async getLanguages(version: string): Promise<string[]> {
    const languages = [];

    for (const lang of Settings.LANGUAGES) {

      const exists = await this.hasVersion(lang, version);
      if (exists) {
        languages.push(lang);
      }
    }
    return Promise.resolve(languages);
  }
}
