import { Injectable } from '@angular/core';
import { CatalogElement } from '../model/catalog.element';
import { ICatalogService } from '../service/i.catalog.service';
import { environment } from '../../environments/environment';
import { CatalogConfiguration } from "./catalog.configuration";

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {

  /**Cache for the versions*/
  protected versions_lang: string[];

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
    public name: string,
    protected config: CatalogConfiguration) {
    this.versions_lang = [];
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
  public async getByCode(type: string, code: string): Promise<CatalogElement> {
    this.initService();
    return this.service.getByCode(this.activeVersion, type, code.replace(' ', '_'));
  }

  /**
   * Get and save the versions this catalog can have.
   */
  public getVersions(): Promise<string[]> {
    if (this.versions_lang[this.service.getLocale()])
    {
      return Promise.resolve(this.versions_lang[this.service.getLocale()]);
    }

    this.initService();
    let languages: string[] = this.service.getLangs();
    let germanVersions: Promise<string[]>;

    for (let lang of languages) {
      const versions = this.service.getVersions(lang);
      versions.then(data => {
        this.versions_lang[lang] = data.reverse();
        if (lang === "de") {
          this.activeVersion = data[0];
        }
      })
      .catch(error => {
        console.log(error)
      });

      if (lang == "de") {
        germanVersions = versions
      };

    }
    return germanVersions;
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
  public async activateVersion(version: string): Promise<boolean> {

    if (!this.versions_lang[this.service.getLocale()]) {
      // load versions and then run again
      return this.getVersions().then(() => this.activateVersion(version))
    }

    if (this.versions_lang[this.service.getLocale()].indexOf(version) > -1) {
      console.log("valid version " + this.service.getLocale());
      this.activeVersion = version;
      return Promise.resolve(true);

    } else {
      console.log("invalid version " + this.service.getLocale());
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
    if (this.versions_lang[this.service.getLocale()]) {
      return this.versions_lang[this.service.getLocale()].indexOf(version) > -1;
    }
    return false;
  }

  public getVersionLanguages(version: string): string[] {
    const languages: string[] = this.service.getLangs();
    const validLangs: string[] = [];
    for (let lang of languages) {
      if (this.versions_lang[lang].indexOf(version) > -1) {
        validLangs.push(lang);
      }

    }
    return validLangs;
  }
}
