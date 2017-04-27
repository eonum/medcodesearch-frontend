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

}
