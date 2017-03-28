import {Injectable} from '@angular/core';
import {CatalogElement} from '../model/catalog.element';
import {ICatalogService} from '../service/i.catalog.service';
import {environment} from '../../environments/environment';

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
                     protected name: string,
                     protected codeRegex: string,
                     protected elements: any[],) { // TODO name properly

  }

  /**
   * Searches elements within the catalog.
   * @param version the version of the catalog to use
   * @param query the query to search for
   */
  public async search(version: string, query: string): Promise<CatalogElement[]> {

    if (this.isCode(query)) {
      const singleResult             = await this.getByCode(version, query);
      const result: CatalogElement[] = [];
      if (singleResult != null) {
        result.push(singleResult);
      }
      return Promise.resolve(result);
    } else {
      return await this.getBySearch(version, query);
    }
  }

  /**
   * Check whether the query is a code or a normal
   * search string.
   *
   * @param query the query to search for within the catalog
   */
  private isCode(query: string): boolean {
    const regex = new RegExp(this.codeRegex);
    return regex.test(query);
  }

  protected async getBySearch(version: string, query: string): Promise<CatalogElement[]> {
    this.initService();
    return this.service.search(version, query);
  }

  protected async getByCode(version: string, code: string): Promise<CatalogElement> {
    this.initService();
    return this.service.getByCode(version, code);
  }

  /**
   * Get and save the versions this catalog can have.
   */
  public getVersions(): Promise<string[]> {
    if (this.versions) return Promise.resolve(this.versions);

    this.initService();
    let versions = this.service.getVersions();
    versions.then( data => {
        this.versions      = data.reverse();
        this.activeVersion = data[0];
      },
      error => console.log(error)
    );

    return versions;
  }


  private initService() {
    this.service.init(this.elements[0], this.elements[1], this.elements[2]);
  }

  /**
   * Update the active version if it is a valid option.
   * If the versions are not yet loaded, load them first.
   *
   * @param version
   * @returns {boolean} True if the active version was updated.
   */
  public async activateVersion(version: string): Promise<boolean> {

    if (!this.versions) {
      // load versions and then run again
      return this.getVersions().then(() => this.activateVersion(version))
    }

    if (this.versions.indexOf(version) > -1) {
      // valid version
      this.activeVersion = version;
      return Promise.resolve(true);
    } else {
      console.log('Version does not exists: ' + version);
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
}
