import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Settings } from '../settings';

/**
 * This service gets called before app initialization, and loads the versions from the
 * assets folder. And provides lookup functions for the versions.
 */
@Injectable()
export class CatalogVersionService {

  private versions;

  constructor(private http: Http) {
  }

  public loadVersions(): Promise<any> {
    return this.http.get('assets/versions.json').toPromise().then(versions => {
      this.versions = versions.json();
    });
  }

  /**
   * Return all languages, where the given catalog and version exists.
   *
   * @param {string} catalog must be one of {@link Settings.CATALOGS}
   * @param {string} version
   * @returns {string[]} some of {@link Settings.LANGUAGES}
   */
  public getLanguages(catalog: string, version: string): string[] {
    const languages = [];

    for (const lang of Settings.LANGUAGES) {

      const exists = this.versionExists(lang, catalog, version);
      if (exists) {
        languages.push(lang);
      }
    }
    return languages;
  }

  /**
   *
   * @param lang must be one of {@link Settings.LANGUAGES }
   * @param catalog must be one of {@link Settings.CATALOGS }
   * @param [version] if absent, return true if any version exists.
   * @returns {Promise<boolean>}
   */
  public versionExists(lang: string, catalog: string, version?: string): boolean {
    const versions = this.getVersions(lang, catalog);
    return (!version && versions.length !== 0) || (versions.indexOf(version) > -1);
  }

  /**
   * Return the versions of the given language and catalog.
   *
   * @param lang must be one of {@link Settings.LANGUAGES }
   * @param catalog must be one of {@link Settings.CATALOGS }
   * @returns {string[]}
   */
  public getVersions(language: string, catalog: string): string[] {
    return this.versions[language][catalog];
  }
}
