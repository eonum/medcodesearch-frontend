import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from '../service/i.catalog.service';
import { ILoggerService } from '../service/logging/i.logger.service';
import { CatalogConfiguration } from './catalog.configuration';
import { Injectable } from '@angular/core';

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {

  /**Cache for the versions*/
  protected versions: string[];

  /**To access the selected catalog globally*/
  protected activeVersion: string;

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
    this.versions = [];
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
  public async getByCode(type: string, code: string, version?: string, language?: string): Promise<CatalogElement> {
    this.initService();
    return this.service.getByCode( version || this.activeVersion, type, code.replace(' ', '_'), language);
  }

  /**
   * Get and save the versions this catalog can have.
   */
  public async getVersions(): Promise<string[]> {

    this.initService();
    const languages: string[] = this.service.getLangs();
    let germanVersions: string[];

    for (const lang of languages) {
      const _versions = await this.getOrLoadVersions(lang);
      this.versions[lang] = _versions;
      if (lang === 'de') {
        this.activeVersion = _versions[0];
        germanVersions = _versions;
      }
    }

    return Promise.resolve(germanVersions);
  }

  public getRootElement(): Promise<CatalogElement> {
    const rootElementType: string = this.getRootElementType();
    const rootElementCode: string = this.getRootElementCode();

    return this.getByCode(rootElementType, rootElementCode);
  }

  /**
   * Return the type and code of the root element in an array that can be used as route params.
   *
   * @returns {[string,string]}
   */
  public getRootElementParams(): string[] {
    return [this.getRootElementType(), this.getRootElementCode()];
  }

  public getRootElementType(): string {
    return this.config.rootElement.type;
  }

  protected getRootElementCode(): string {
    return this.activeVersion;
  }

  private initService(): void {
    this.service.init(this.config);
  }

  /**
   * Update the active version if it is a valid option.
   * If the versions are not yet loaded, load them first.
   *
   * @param version
   * @returns {boolean} True if the active version was updated.
   */
  public async activateVersion(version: string, lang?: string): Promise<boolean> {

    lang = lang || this.service.getLocale();

    if (!this.versions[lang]) {
      // load versions and then run again
      return this.loadVersions(lang).then(() => this.activateVersion(version));
    }

    if (this.versions[lang].indexOf(version) > -1) {
      this.logger.log('valid version ' + this.service.getLocale());
      this.activeVersion = version;
      return Promise.resolve(true);

    } else {
      this.logger.log('invalid version ' + this.service.getLocale());
      return Promise.resolve(false);
    }
  }

  public getActiveVersion(): string {
    return this.activeVersion;
  }

  public getName(): string {
    return this.name;
  }

  public getDomain(): string {
    return this.name.toLowerCase();
  }

  public hasVersionInCurrentLanguage(version: string): boolean {
    if (this.versions[this.service.getLocale()]) {
      return this.versions[this.service.getLocale()].indexOf(version) > -1;
    }
    return false;
  }

  public async getOrLoadVersions(lang: string): Promise<string[]> {
    if (this.versions[lang]) {
      return Promise.resolve(this.versions[lang]);
    } else {
      return this.loadVersions(lang);
    }
  }

  public getVersionLanguages(version: string): string[] {
    const languages: string[] = this.service.getLangs();
    const validLangs: string[] = [];
    for (const lang of languages) {
      if (this.versions[lang].indexOf(version) > -1) {
        validLangs.push(lang);
      }

    }
    return validLangs;
  }

  /**
   * Sends an analytic notification to eonum
   *
   */
  public sendAnalytics(type: string, code: string, query: string, version?: string): void {
    this.service.sendAnalytics(version || this.activeVersion, type, code, query);
  }

  private async loadVersions(lang: string): Promise<string[]> {

    this.initService();
    const versions = await this.service.getVersions(lang);
    if (!versions) {
      this.logger.error(`[Catalog] could not load versions from API. Catalog: ${this.name}, language: ${lang}`);
      return null;
    }
    this.versions[lang] = versions.reverse();
    return this.versions[lang];
  }
}
