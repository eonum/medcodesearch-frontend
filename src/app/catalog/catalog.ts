import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { ICatalogService } from "../service/i.catalog.service";
import {Observable} from 'rxjs';

/**
 * Class representing a catalog containing medical
 * information. Allows searching and navigating
 * within a catalog.
 */
@Injectable()
export abstract class Catalog {

    /**Cache for the versions*/
    protected versions: string[];

    /**To know the active version after language redirects*/
    protected activeVersion:string;

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
                       protected elements: any[], ) { // TODO name properly
      this.loadVersions();
    }

    /**
     * Searches elements within the catalog.
     * @param version the version of the catalog to use
     * @param query the query to search for
     */
    public async search(version: string, query: string): Promise<CatalogElement[]> {
        if (this.isCode(query)) {
            const singleResult = await this.getByCode(version, query);
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
    public loadVersions(): Observable<string[]> {
        this.initService();
        let versions = this.service.getVersions();
        versions.subscribe(
          data => {
            this.versions = data;
            this.activeVersion = data[0];
          },
          error => console.log(error)
        );
        return versions;
      }


    private initService() {
        this.service.init(this.elements[0], this.elements[1], this.elements[2]);
    }
}
